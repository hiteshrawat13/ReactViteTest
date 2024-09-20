import React, { useContext, useState } from 'react'
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import { StepperContext } from '../stepper/StepperContext';
import { useSelector } from 'react-redux';

const ZIPDownload = () => {
    const Stepper = useContext(StepperContext)
    const { logoFileRef, thumbnailFileRef, pdfFileRef, mp4FileRef, publishHelper } = useContext(StepperContext)
    const {data} = useSelector(state => state.campaignData)
    
    const zip = new JSZip(); // instance of JSZip
    const handleZip = async (e) => {
        e.preventDefault();
       
        console.log("======================",data);

       
        const templatefiles = await publishHelper.getPageFiles({state:data})
        
        templatefiles.forEach((file) => {
            zip.file(file.name, file.data);
        })

       
        if(logoFileRef?.current?.files[0]){
            zip.file(`${data["LOGO_NAME"]}`, logoFileRef?.current?.files[0] );
        }else{
            console.log("Logo file not attached.");
        }

       
        if(thumbnailFileRef?.current?.files[0]){
            zip.file(`${data["THUMBNAIL_NAME"]}`, thumbnailFileRef?.current?.files[0]  );
        }else{
            console.log("Thumbnail file not attached.");
            
        }


        if(data["ASSET_FORMAT"]=="PDF" ){
            try{
                zip.file(`${data['PDF_NAME']}`, pdfFileRef?.current?.files[0] );
            }catch(error){
                console.log(error);
            }
           
        }else if(data["ASSET_FORMAT"]=="MP4"){
            try{
                zip.file(`${data['MP4_NAME']}`, mp4FileRef?.current?.files[0] );
            }catch(error){
                console.log(error);
            }
        }

        zip.generateAsync({ type: "blob" }).then( (blob) =>{ // 1) generate the zip file
            saveAs(blob, `${data['LINK_NAME']}.zip`);                          // 2) trigger the download
        }, (err)=> {
            alert(err)
        });

    }

    return (
        
        <div className='form-group'>
            <button onClick={handleZip} className='btn-primary'>Download Zip</button>

            <button onClick={(e)=>{
        e.preventDefault();
        localStorage.setItem("data",JSON.stringify(data) );
      
        alert("State Saved")
        }}    >Save State to Local Storage</button>
        </div>
    )
}

export default ZIPDownload