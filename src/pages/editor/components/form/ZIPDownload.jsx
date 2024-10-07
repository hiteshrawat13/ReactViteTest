import React, { useContext, useState } from 'react'
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import { StepperContext } from '../stepper/StepperContext';
import { useSelector } from 'react-redux';

const ZIPDownload = ({publishHelper,filesRef}) => {
    
     
    const {data} = useSelector(state => state.campaignData)
    
    const zip = new JSZip(); // instance of JSZip
    const handleZip = async (e) => {
        e.preventDefault();
       
        console.log("======================",data);

       
        const templatefiles = await publishHelper.getPageFiles({state:data})
        
        templatefiles.forEach((file) => {
            zip.file(file.name, file.data);
        })

       



        for (const [key, value] of Object.entries(filesRef)) {
           
      
            if (filesRef[key].files[0]) {

              zip.file(`${data[  filesRef[key].dataset.name  ]}`, filesRef[key].files[0] );
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