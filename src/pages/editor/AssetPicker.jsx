import React, { useRef, useState } from 'react'


import './AssetPicker.scss'

import { FaFilePdf } from "react-icons/fa";
import { BsFiletypeMp4 } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { PiFrameCornersThin } from "react-icons/pi";

import axios from 'axios'


const AssetPicker = () => {

    const [selected,setSelected]=useState("")

    const pdfRef=useRef()

    const progressRef=useRef()

    const handleSelect=(e)=>{
        console.log(e.target.value);
        setSelected(e.target.value)
    }


    const handleUpload= async (e)=>{
      e.preventDefault()

      alert("OO")
      


      try {
       
       axios.post('https://itbusinessplus.net/template/raj/test/LBUpload.php', {
          firstName: 'Fred',
          lastName: 'Flintstone',
          orders: [1, 2, 3],
          file: pdfRef.current.files[0] || null
          }, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function( progressEvent ) {
              //console.log(progressEvent);
              const { total, loaded } = progressEvent;
              const totalSizeInMB = total / 1000000;
              const loadedSizeInMB = loaded / 1000000;
              const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
              //setUploadPercentage(uploadPercentage.toFixed(2));
              progressRef.current.value=uploadPercentage.toFixed(2)
              // progressRef.current.value = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
            }
          }
        ).then(data=>{
          console.log(data,"Complete");
        }).catch(err=>{
          console.log(err,"ERROR");
        })

      
      } catch (error) {
        console.log(error);
      }

   

    }
  return (
    <div className='AssetPicker'>
        
        <div className='switches'>

        
       
        <label className='form-control'>
        <FaFilePdf /> PDF
        <input type="radio"  name="ASSET_FORMAT" defaultValue="PDF" onChange={handleSelect}/>
        <span className="checkmark"></span>
        </label>
            

        <label className='form-control'>
        <BsFiletypeMp4 /> MP4
        <input type="radio"  name="ASSET_FORMAT" defaultValue="MP4" onChange={handleSelect}/>
        <span className="checkmark"></span>
        </label>

        <label className='form-control'>
        <IoIosLink /> Client Link
        <input type="radio"  name="ASSET_FORMAT" defaultValue="Client Link" onChange={handleSelect}/>
        <span className="checkmark"></span>
        </label>

        <label className='form-control'>
        <PiFrameCornersThin /> Iframe
        <input type="radio"  name="ASSET_FORMAT" defaultValue="IFrame" onChange={handleSelect}/>
        <span className="checkmark"></span>
        </label>


        </div>


{
    (selected=="PDF") && <label>
    <span>Asset PDF</span>
    <input type="text" name="PDF"/><br/>
    <input type="file" name="PDF_FILE" ref={pdfRef} />
    <progress  ref={progressRef} max="100" defaultValue={0} value="0"></progress>
    <button onClick={handleUpload}>Upload</button>
  </label>
}

{
    (selected=="MP4") &&   <label>
    <span>MP4</span>
    <input type="text" name="MP4"/><br/>
    <input type="file" name="MP4_FILE" />
    <button >Upload</button>
  </label>
}
    
{
    (selected=="Client Link") &&      <label>
    <span>Client Link</span>
    <input type="text" name="CLIENT_LINK" />
  </label>
}
  
{
    (selected=="IFrame") &&   <label>
    <span>Iframe Html</span>
    <input type="text" name="IFRAME" />
  </label>
}
 

    <input type="hidden" name="TEST123" value={1121212} />
       

     
    </div>
  )
}

export default AssetPicker