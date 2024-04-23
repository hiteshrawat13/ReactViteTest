import React, { useRef, useState } from 'react'


import './AssetPicker.scss'

import { FaFilePdf } from "react-icons/fa";
import { BsFiletypeMp4 } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { PiFrameCornersThin } from "react-icons/pi";

import axios from 'axios'
import { useEffect } from 'react';

import { socket } from '../../socket';






const AssetPicker = () => {

  const [sessionId, setSessionId] = useState( Math.random().toString(36).substr(2, 9))

 
    const [selected,setSelected]=useState("")

    const pdfRef=useRef()

    const progressRef=useRef()



    

    const handleSelect=(e)=>{
        console.log(e.target.value);
        setSelected(e.target.value)
    }

    const handleDrop = (event,target_name) => {
      event.preventDefault();
      const droppedFiles = event.dataTransfer.files;
      if (droppedFiles.length > 0) {
        //const newFiles = Array.from(droppedFiles);
       // console.log(newFiles);
        //setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        document.querySelector(`[name="${target_name}"]`).files=droppedFiles
        const eq =  new Event('change', { bubbles: true });
  
        document.querySelector(`[name="${target_name}"]`).dispatchEvent(eq);
      }
    };


    const handleUpload= async (e)=>{
      e.preventDefault()

      alert("OO")
      function onConnect() {
            setIsConnected(true);
          }
      
          function onDisconnect() {
            setIsConnected(false);
          }
      
          function onFooEvent(value) {
            setFooEvents(previous => [...previous, value]);
          }
    
          function onUploadProgress(value) {
              setUploadProgress(value)
          }
      
      socket.connect();
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('foo', onFooEvent);
      socket.on("uploadProgress",onUploadProgress)
      socket.emit('connectInit', sessionId);

      try {
        var bodyFormData = new FormData();
        bodyFormData.append('sessionId',sessionId);
        bodyFormData.append('file:',pdfRef.current.files[0] || null);
      
        axios.post('http://localhost:8888/upload_file', {
       //axios.post('https://itbusinessplus.net/template/raj/test/LBUpload.php', {
          firstName: 'Fred',
          lastName: 'Flintstone',
          sessionId:sessionId,
          orders: [1, 2, 3],
        
          fileSize: pdfRef.current.files[0].size || null,
         file: pdfRef.current.files[0] || null
          }, {
          
            headers: {
              'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}`
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

   
    const handleCancel= async (e)=>{
      e.preventDefault()
     
      socket?.emit('terminate',"WWWW");
      alert("TERMINATED")
    }


    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const [uploadProgress, setUploadProgress] = useState("");
    // useEffect(() => {
    //   function onConnect() {
    //     setIsConnected(true);
    //   }
  
    //   function onDisconnect() {
    //     setIsConnected(false);
    //   }
  
    //   function onFooEvent(value) {
    //     setFooEvents(previous => [...previous, value]);
    //   }

    //   function onUploadProgress(value) {
    //       setUploadProgress(value)
    //   }
      
    //   socket.connect();
    //   socket.on('connect', onConnect);
    //   socket.on('disconnect', onDisconnect);
    //   socket.on('foo', onFooEvent);
    //   socket.on("uploadProgress",onUploadProgress)
    //   socket.emit('connectInit', sessionId);
  
    //   return () => {
    //     socket.disconnect();
    //     socket.off('connect', onConnect);
    //     socket.off('disconnect', onDisconnect);
    //     socket.off('foo', onFooEvent);
    //     socket.off("uploadProgress",onUploadProgress)
    //   };
    // }, []);


    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };
 
  return (
    <div className='AssetPicker'>
        
        <label>
      <span>Logo</span>
      <input type="text" name="LOGO_NAME" onChange={debounce((e)=>{
        console.log(e.target.value);
        try {
         
        
          axios.post('http://localhost:8888/check_url', {
            url:  "https://resource.itbusinesstoday.com/whitepapers/"+e.target.value,
            
            }, {
            
             
            }
          ).then(data=>{
            console.log(data,"Complete");
          }).catch(err=>{
            console.log(err,"ERROR");
          })
  
        
        } catch (error) {
          console.log(error);
        }

      },1000)}/><br/>
      <input type="file" name="LOGO_FILE" accept="image/png"
      
      onChange={(e)=>{
        e.preventDefault()
        console.log("EEE");
        var reader = new FileReader();
            reader.onload = function (e) {
               
                document.querySelector("#LOGO_PREVIEW").src=e.target.result
            }
        reader.readAsDataURL(e.target.files[0]);
        
      }}
      />
      <div  
        onClick={(e)=>{e.preventDefault();document.querySelector(`[name="LOGO_FILE"]`).click();}}
        onDrop={(e)=>handleDrop(e,"LOGO_FILE")}
        onDragOver={(event) => event.preventDefault()}>Drop Here</div>
        <img id='LOGO_PREVIEW' />
    </label>
    <label>
      <span>Thumbnail</span>
      <input type="text" name="THUMBNAIL_NAME" /><br/>
      <input type="file" name="THUMBNAIL_FILE" accept="image/png" 
        onChange={(e)=>{
          e.preventDefault()
          alert("OnChange")
          console.log("EEE");
          var reader = new FileReader();
          reader.onload = function (e) {
            document.querySelector("#THUMBNAIL_PREVIEW").src=e.target.result
          }
          reader.readAsDataURL(e.target.files[0]);
          
        }}
      />

      <div  
        onClick={(e)=>{e.preventDefault();document.querySelector(`[name="THUMBNAIL_FILE"]`).click();}}
        onDrop={(e)=>handleDrop(e,"THUMBNAIL_FILE")}
        onDragOver={(event) => event.preventDefault()}>Drop Here</div>
        <img id='THUMBNAIL_PREVIEW' />
    </label>



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
    <button onClick={handleCancel}>Cancel</button>
    <br>
    
    </br>
isConnected:{isConnected}
    <br>
    
    </br>
    <div>{uploadProgress} </div>
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