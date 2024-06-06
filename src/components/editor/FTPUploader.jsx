import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import axios from 'axios'
import JSZip from 'jszip'
import { saveAs } from 'file-saver';
import { socket } from '../../socket'
import Config from '../../Config';
import Cookies from 'js-cookie';


const FTPUploader = forwardRef(({ publishHelper }, ref) => {

  const userName = Cookies.get('user_id');

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [uploadProgress, setUploadProgress] = useState("");
  const [uploading, setUploading] = useState(false);
  const [sessionId, setSessionId] = useState(Math.random().toString(36).substr(2, 9))
  const [socketId, setSocketId] = useState(null)
  const [filesToUpload, setFilesToUpload] = useState([])

  const [onSocketProgress, setOnSocketProgress] = useState(null)
  const [uploadedLinks, setUploadedLinks] = useState([])

  useImperativeHandle(ref, () => ({
    handleUpdateFiles
  }));

  function onConnect(e) {
    console.log("onConnected", e);
    setIsConnected(true);
  }

  function onDisconnect(e) {
    console.log("onDisconnected", e);
    setIsConnected(false);
  }

  function onFooEvent(value) {
    console.log("ON FOO", value);
    setFooEvents(previous => [...previous, value]);
    setSocketId(value.id)
  }

  function onUploadProgress(value) {
    console.log(value);
    if (value.name == "UPLOAD_COMPLETE") {
      setUploading(false)
      return;
    }

    if (value.name == "UPLOAD_PROGRESS") {
      setUploadProgress(value.progress)
      return;
    }
    setOnSocketProgress(value)
  }




  const handleUpdateFiles = async () => {
    console.log("isConnected", isConnected);

    let uploadFiles = []
    if (document.querySelector("[name='LOGO_FILE']").files[0]) {
      uploadFiles.push({
        type: "logo",
        name: document.querySelector("[name='LOGO_NAME']").value,
        file: document.querySelector("[name='LOGO_FILE']").files[0],
        progress: 0
      })
    }

    if (document.querySelector("[name='THUMBNAIL_FILE']").files[0]) {
      uploadFiles.push({
        type: "file",
        name: document.querySelector("[name='THUMBNAIL_NAME']").value,
        file: document.querySelector("[name='THUMBNAIL_FILE']").files[0],
        progress: 0
      })
    }

    if (document.querySelector("[name='PDF_FILE']").files[0]) {
      uploadFiles.push({
        type: "file",
        name: document.querySelector("[name='PDF']").value,
        file: document.querySelector("[name='PDF_FILE']").files[0],
        progress: 0
      })
    }

    if (document.querySelector("[name='MP4_FILE']").files[0]) {
      uploadFiles.push({
        type: "file",
        name: document.querySelector("[name='MP4']").value,
        file: document.querySelector("[name='MP4_FILE']").files[0],
        progress: 0
      })
    }

    const templatefiles = await publishHelper.current.getFiles()
    templatefiles.forEach((file) => {
      uploadFiles.push({
        type: "templateFile",
        name: file.name,
        data: file.data,
        progress: 0
      })
    })

    setFilesToUpload(uploadFiles)
  }





  useEffect(() => {
    if (isConnected == false) {
      socket.connect();
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('foo', onFooEvent);
      socket.on("uploadProgress", (value) => onUploadProgress(value))
      socket.emit('connectInit', sessionId);

    }

    return () => {
      console.log("disconnected");
      socket?.disconnect();
    }

  }, [])

  useEffect(() => {

    console.log("IN useEffect filestoupload:", filesToUpload);

  }, [filesToUpload])

  useEffect(() => {

    // console.log("IN on progress filesupload:",filesToUpload);

    if (onSocketProgress == null) return;
    // 1. Find the todo with the provided id
    const currentTodoIndex = filesToUpload.findIndex((file) => file.name === onSocketProgress.name);

    // 2. Mark the todo as complete
    if (currentTodoIndex != -1) {
      const updatedTodo = { ...filesToUpload[currentTodoIndex], progress: onSocketProgress.progress };
      // 3. Update the todo list with the updated todo
      setFilesToUpload((previous) => [
        ...previous.slice(0, currentTodoIndex),
        updatedTodo,
        ...previous.slice(currentTodoIndex + 1)])
    } else {
      console.log("NOTFOUND", currentTodoIndex, filesToUpload, onSocketProgress.name);
    }

  }, [onSocketProgress])


  const handleUpload = async (e) => {
    e.preventDefault()



    if (publishHelper.current.LINK_NAME.trim().length == 0) {
      alert("Please fill link name")
      return;
    }

    setUploading(true)
    handleUpdateFiles()





    try {
      var bodyFormData = new FormData();

      bodyFormData.append('sessionId', sessionId);
      bodyFormData.append('socketId', socketId);
      bodyFormData.append('ftpConfigName', publishHelper.current.FTP_CONFIG_NAME);

      let tempdata={
        campid: document.querySelector("[name='CAMP_ID']").value,
        campname:document.querySelector("[name='CAMP_NAME']").value,
        category:'CS',
        clientcode:document.querySelector("[name='CLIENT_CODE']").value,
        country:document.querySelector("[name='REGION']").value,
        editedby:userName,
        linktitle:document.querySelector("[name='EDM_TITLE']").value,
        link:document.querySelector("[name='LINK_NAME']").value + '-edm.html',
        linkcreatedby:userName,
        language:document.querySelector("[name='LANGUAGE']").value,
      }

      bodyFormData.append('campdata',JSON.stringify(tempdata));

      
      let templateFiles = []
      filesToUpload.forEach(file => {
        if (file.type === "logo") {
          bodyFormData.append('files[]', file.file, file.name);
          bodyFormData.append('logoFile', file.name);
        } else if (file.type === "file") {
          bodyFormData.append('files[]', file.file, file.name);
        } else if (file.type === "templateFile") {
          templateFiles.push(file)
        }
      })

      bodyFormData.append(`templateFiles`, JSON.stringify(templateFiles));

      axios({
        method: "post",
        url: Config.API_BASE_URL+`/upload_file/${publishHelper.current.FTP_CONFIG_NAME}/${socketId}`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response, "Complete");



          response.data.forEach((file) => {
            const currentTodoIndex = filesToUpload.findIndex((file1) => file1.name === file.name);

            // 2. Mark the todo as complete
            if (currentTodoIndex != -1) {
              const updatedTodo = { ...filesToUpload[currentTodoIndex], progress: file.status };
              // 3. Update the todo list with the updated todo
              setFilesToUpload((previous) => [
                ...previous.slice(0, currentTodoIndex),
                updatedTodo,
                ...previous.slice(currentTodoIndex + 1)])
            } else {
              console.log("NOTFOUND", currentTodoIndex, filesToUpload, file.name);
            }
          })


          setUploadedLinks([...uploadedLinks,{
            title: document.querySelector("[name='EDM_TITLE']").value,
            links:`${publishHelper.current.BASE_URL}${document.querySelector("[name='LINK_NAME']").value}-edm.html`,
          }])

          setUploading(false)
        })
        .catch(function (err) {
          console.log(err, "ERROR");
          alert(err.response.data.message)
          setUploading(false)
        });





    } catch (error) {
      console.log(error);
      setUploading(false)
    }


  }

  const handlePreview= async(e)=>{
    e.preventDefault()
    publishHelper.current.generateZip(JSZip,saveAs)
  }

  return (
    <>
      <span> [ server : {(isConnected) ? <span style={{color:'green'}}>Connected</span> : <span style={{color:'red'}}>Not Connected</span>} ]  </span>

  
        <div className='uploadListDiv'>
          
        <h4>File Upload List</h4>

          {filesToUpload.map((file, i) => {
            return <div className="fileToUpload" key={i}>
              <div className='fileName'>{file.name} </div> <div className='fileProgress'>{file.progress}</div>
            </div>
          })}

{(uploading == true) ? 
<button id='uploadFilesBtn' style={{background:'white',color:'#5a93f6'}}>Uploading... {uploadProgress}</button> 
  : <button onClick={handleUpload} id='uploadFilesBtn'>Upload Files</button>}

<button onClick={handlePreview} id='downloadZipBtn'>Download ZIP</button>
        </div>
      

        <div className='linksTableAfterUpload'>
        <h4>Links Table</h4>

<table border="1" cellPadding="5">
<thead>
      <tr>
      <th>Asset Name</th>
      <th>Link</th>
      </tr>
    </thead>

  <tbody>
   {
    uploadedLinks.length <=0 ?
    <tr className='linksTableInner'>
      <td>No Data Found</td>
      <td><a href='' >No Data Found</a></td>
    </tr>

    :

    uploadedLinks.map((val, i) => {
      return  <tr className='linksTableInner' key={i}>
      <td>{val.title}</td>
      <td><a href={val.links}  target='_BLANK'>{val.links}</a></td>
    </tr>
    })

   }
    
  </tbody>
</table>

</div>
    

    </>

  )
})

export default FTPUploader