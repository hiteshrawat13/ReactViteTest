import React ,{forwardRef,useEffect,useImperativeHandle,useState} from 'react'

import axios from 'axios'

import { socket } from '../../socket'

const FTPUploader = forwardRef(({publishHelper},ref) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [uploadProgress, setUploadProgress] = useState("");
  const [uploading, setUploading] = useState(false);
  const [sessionId, setSessionId] = useState(Math.random().toString(36).substr(2, 9))
  const [filesToUpload, setFilesToUpload] = useState([])


  useImperativeHandle(ref, () => ({
    handleUpdateFiles
  }));







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
    console.log(value);
    if (value.name == "UPLOAD_COMPLETE") {
      setUploading(false)
      return;
    }

    if (value.name == "UPLOAD_PROGRESS") {
      setUploadProgress(value.progress)
      return;
    }

   

   // console.log("IN on progress filesupload:",filesToUpload);

    // 1. Find the todo with the provided id
    const currentTodoIndex = filesToUpload.findIndex((file) => file.name === value.name);

    // 2. Mark the todo as complete
    if (currentTodoIndex != -1) {
      const updatedTodo = { ...filesToUpload[currentTodoIndex], progress: value.progress };
      // 3. Update the todo list with the updated todo
      setFilesToUpload((previous) => [
        ...previous.slice(0, currentTodoIndex),
        updatedTodo,
        ...previous.slice(currentTodoIndex + 1)])
    } else {
      console.log("NOTFOUND", currentTodoIndex, filesToUpload, value.name);
    }

  }




  const handleUpdateFiles=async ()=>{
    console.log("isConnected",isConnected);

    alert("handleUpdateFiles")
    let uploadFiles=[]
        if( document.querySelector("[name='LOGO_FILE']").files[0]){
          uploadFiles.push({
            type:"file",
            name:document.querySelector("[name='LOGO_NAME']").value,
            file:document.querySelector("[name='LOGO_FILE']").files[0],
            progress:0
          })
        }

        if( document.querySelector("[name='THUMBNAIL_FILE']").files[0]){
          uploadFiles.push({
            type:"file",
            name:document.querySelector("[name='THUMBNAIL_NAME']").value,
            file:document.querySelector("[name='THUMBNAIL_FILE']").files[0],
            progress:0
          })
        }

        if( document.querySelector("[name='PDF_FILE']").files[0]){
          uploadFiles.push({
            type:"file",
            name:document.querySelector("[name='PDF']").value,
            file:document.querySelector("[name='PDF_FILE']").files[0],
            progress:0
          })
        }

        if( document.querySelector("[name='MP4_FILE']").files[0]){
          uploadFiles.push({
            type:"file",
            name:document.querySelector("[name='MP4']").value,
            file:document.querySelector("[name='MP4_FILE']").files[0],
            progress:0
          })
        }

        const templatefiles=await publishHelper.current.getFiles()
        templatefiles.forEach((file)=>{
          uploadFiles.push({
            type:"templateFile",
            name:file.name,
            data:file.data,
            progress:0
          })
        })

        setFilesToUpload(uploadFiles)
  }


  


  useEffect(()=>{


    


    if(isConnected==false){
      socket.connect();
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('foo', onFooEvent);
      socket.on("uploadProgress", (value)=>onUploadProgress(value))
      socket.emit('connectInit', sessionId);
    }
    
  },[])

  useEffect(()=>{

    console.log("IN useEffect filestoupload:",filesToUpload);

  },[filesToUpload])


  const handleUpload = async (e) => {
    e.preventDefault()
    if (publishHelper.current.tgif.LINK_NAME.trim().length == 0) {
      alert("Please fill link name")
      return;
    }

    setUploading(true)

   

    

    try {
      var bodyFormData = new FormData();

      bodyFormData.append('sessionId', sessionId);
      bodyFormData.append('ftpConfigName', publishHelper.current.FTP_CONFIG_NAME);

      let templateFiles = []
      filesToUpload.forEach(file => {
        if (file.type === "file") {
          bodyFormData.append('files[]', file.file, file.name);
        } else if (file.type === "templateFile") {
          templateFiles.push(file)
        }
      })

      bodyFormData.append(`templateFiles`, JSON.stringify(templateFiles));

      axios({
        method: "post",
        url: "http://localhost:8888/upload_file",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response, "Complete");



          response.data.forEach((file)=>{
            const currentTodoIndex = filesToUpload.findIndex((file) => file.name === file.name);

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
          


          
          setUploading(false)
        })
        .catch(function (err) {
          //handle error
          console.log(err, "ERROR");
          setUploading(false)
        });





    } catch (error) {
      console.log(error);
      setUploading(false)
    }


  }



  return (
    <>
      <div>FTPUploader</div>


      <div>
        {filesToUpload.map((file, i) => {
          return <div className="fileToUpload" key={i}>
            <div className='fileName'>{file.name} </div> <div className='fileProgress'>{file.progress}</div>
          </div>
        })}
      </div>



      {(uploading == true) ? <div>Uploading {uploadProgress}</div> : <button onClick={handleUpload}>Upload Files</button>}

    </>

  )
})

export default FTPUploader