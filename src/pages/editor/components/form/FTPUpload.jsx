import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { StepperContext } from '../stepper/StepperContext'
import useSocket from '../useSocket'
import axios from 'axios'
import Config from '../../../../Config'
import Modal from 'react-responsive-modal'
import { useAuth } from '../../../../Auth'

const FTPUpload = ({publishHelper,filesRef}) => {
  
  const [isFTPUploadModalOpened,setFTPUploadModalOpened] =useState(false)
  const campaignDataState = useSelector(state => state.campaignData)
  const { logoFileRef, thumbnailFileRef, pdfFileRef, mp4FileRef } = useContext(StepperContext)
  const [filesToUpload, setFilesToUpload] = useState([])
  const [uploading, setUploading] = useState(false);

  const [firstPageName, setFirstPageName] = useState(null)

  const { socketConnected, socketId, socketSessionId,socketUploadProgress } = useSocket()

  const [FTPProgress,setFTPProgress]=useState("")


  const {userName}=useAuth();

   

  const handleGetFiles = async () => {
    let uploadFiles = []

    for (const [key, value] of Object.entries(filesRef)) {
       

      if (filesRef[key].files[0]) {
        uploadFiles.push({
          type: filesRef[key].dataset.tag,
          name: campaignDataState.data[filesRef[key].dataset.name],
          file: filesRef[key].files[0],
          progress: 0
        })
      }

    }
    

    const templatefiles = await publishHelper.getPageFiles({ state: campaignDataState.data })
    templatefiles.forEach((file) => {
      uploadFiles.push({
        type: "templateFile",
        name: file.name,
        data: file.data,
        progress: 0
      })
    })

    setFirstPageName(templatefiles[0].name)
    setFilesToUpload(uploadFiles)

  }


  const getTempData=()=>{
    return {
      campid: campaignDataState.data["CAMP_ID"],
      campname: campaignDataState.data["CAMP_NAME"],
      category: 'CS',
      clientcode: campaignDataState.data["CLIENT_CODE"],
      country: campaignDataState.data["REGION"],
      editedby: userName,
      linktitle: campaignDataState.data["EDM_TITLE"],
      link: campaignDataState.data["BASE_URL"] + firstPageName,
      linkcreatedby: userName,
      language: campaignDataState.data["LANGUAGE"],
      json_data: JSON.stringify(campaignDataState.data),
      link_type:campaignDataState.data["LINK_TYPE"]
    }
  }

  const handleSaveLink=()=>{
    let bodyFormData = new FormData();
    let tempdata = getTempData()

    bodyFormData.append('campdata', JSON.stringify(tempdata));

    axios({
      method: "post",
      url: Config.API_BASE_URL + `/link/save`,
      data: bodyFormData,
      headers: { "Content-Type": "application/json" }, 
    })
      .then(function (response) {
        //handle success
        console.log(response, "Complete");

        alert("Complete")
 
      })
      .catch(function (err) {
        console.log(err, "ERROR");
        alert(err.response.data.message)
         
      });


  }


  const handleUploadFiles = () => {
    let bodyFormData = new FormData();
    bodyFormData.append('sessionId', socketSessionId);
    bodyFormData.append('socketId', socketId);
    bodyFormData.append('ftpConfigName', campaignDataState.data["FTP_CONFIG_NAME"]);
    let tempdata = getTempData()
    bodyFormData.append('campdata', JSON.stringify(tempdata));

    let templateFiles = []
    filesToUpload.forEach(file => {
      if (file.type === "logo") {
        bodyFormData.append('logoFile', file.name);//order important here  first logoFile then files[]
        bodyFormData.append('files[]', file.file, file.name);
      } else if (file.type === "file") {
        bodyFormData.append('files[]', file.file, file.name);
      } else if (file.type === "templateFile") {
        templateFiles.push(file)
      }
    })

    bodyFormData.append(`templateFiles`, JSON.stringify(templateFiles));

    startUpload(bodyFormData)

    

    console.log(filesToUpload);

  }


  

  
  const startUpload = (bodyFormData) => {
    try {



      filesToUpload.forEach(item=>{

        // 1. Find the todo with the provided id
        const currentTodoIndex = filesToUpload.findIndex((file) => file.name === item.name);
 
        // 2. Mark the todo as complete
        if (currentTodoIndex != -1) {
          const updatedTodo = { ...filesToUpload[currentTodoIndex], progress: ".." };
          // 3. Update the todo list with the updated todo
          setFilesToUpload((previous) => [
            ...previous.slice(0, currentTodoIndex),
            updatedTodo,
            ...previous.slice(currentTodoIndex + 1)])
          }
    
           })


      setUploading(true)
      setFTPProgress("Uploading..")
      axios({
        method: "post",
        url: Config.API_BASE_URL + `/upload_file/${campaignDataState.data["FTP_CONFIG_NAME"]}/${socketId}`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response, "Complete");



          // response.data.forEach((file) => {
          //   const currentTodoIndex = filesToUpload.findIndex((file1) => file1.name === file.name);

          //   // 2. Mark the todo as complete
          //   if (currentTodoIndex != -1) {
          //     const updatedTodo = { ...filesToUpload[currentTodoIndex], progress: file.status };
          //     // 3. Update the todo list with the updated todo
          //     setFilesToUpload((previous) => [
          //       ...previous.slice(0, currentTodoIndex),
          //       updatedTodo,
          //       ...previous.slice(currentTodoIndex + 1)])
          //   } else {
          //     console.log("NOTFOUND", currentTodoIndex, filesToUpload, file.name);
          //   }
          // })


          // setUploadedLinks([...uploadedLinks, {
          //   title: document.querySelector("[name='EDM_TITLE']").value,
          //   links: `${publishHelper.current.BASE_URL}${document.querySelector("[name='LINK_NAME']").value}-edm.html`,
          // }])

           




          response.data.forEach(item=>{

       // 1. Find the todo with the provided id
       const currentTodoIndex = filesToUpload.findIndex((file) => file.name === item.name);

       // 2. Mark the todo as complete
       if (currentTodoIndex != -1) {
         const updatedTodo = { ...filesToUpload[currentTodoIndex], progress: item.status };
         // 3. Update the todo list with the updated todo
         setFilesToUpload((previous) => [
           ...previous.slice(0, currentTodoIndex),
           updatedTodo,
           ...previous.slice(currentTodoIndex + 1)])
         }
   
          })

          setFTPProgress("Upload Completed.")
      
     



          setUploading(false)
        })
        .catch(function (err) {
          console.log(err, "ERROR");
          alert(err.response.data.message)
          setUploading(false)
          setFTPProgress(err.message)
        });





    } catch (error) {
      console.log(error);
      setUploading(false)
    }
  }


  useEffect(() => {
    handleGetFiles()
  }, [publishHelper.current])



  useEffect(() => {



    // console.log("IN on progress filesupload:",filesToUpload);

    if (socketUploadProgress == null) return;


    (socketUploadProgress.name=="UPLOAD_PROGRESS") && setFTPProgress(socketUploadProgress.progress)

    // 1. Find the todo with the provided id
    const currentTodoIndex = filesToUpload.findIndex((file) => file.name === socketUploadProgress.name);

    // 2. Mark the todo as complete
    if (currentTodoIndex != -1) {
      const updatedTodo = { ...filesToUpload[currentTodoIndex], progress: socketUploadProgress.progress };
      // 3. Update the todo list with the updated todo
      setFilesToUpload((previous) => [
        ...previous.slice(0, currentTodoIndex),
        updatedTodo,
        ...previous.slice(currentTodoIndex + 1)])

     

    } else {
      console.log("NOTFOUND", currentTodoIndex, filesToUpload, socketUploadProgress.name);
    }

  }, [socketUploadProgress])




  return (
    < >


{/* <div>Display File List</div>
      <div>Upload Button</div> */}
      {/* {(socketConnected) ? <b style={{color:"green"}}>Upload Server Connected</b> : <b style={{color:"red"}}>Upload Server Disconnected</b>} */}
      <br /><br />
      {filesToUpload.map((file, i) => {
        return <div className="fileToUpload" key={i}>
          <div className='fileName'>{file.name} </div>
           <div className='fileProgress'>{file.progress}</div>
        </div>
      })} 



<button className='greenBtn' onClick={ ()=>setFTPUploadModalOpened(true) }>Upload Files</button>
<Modal
center
open={isFTPUploadModalOpened}
onClose={()=>setFTPUploadModalOpened(false)}>
   
      
      <div style={{width:"400px"}}>

      <div> {(socketConnected) ? <b style={{color:"green"}}>Upload Server Connected</b> : <b style={{color:"red"}}>Upload Server Disconnected</b>}</div>
     <br />
      {filesToUpload.map((file, i) => {
        return <div className="fileToUpload" key={i}>
          <div className='fileName'>{file.name} </div> <div className='fileProgress'>{file.progress}</div>
        </div>
      })}

      <div>{JSON.stringify(FTPProgress)}</div>

      <button className='greenBtn' onClick={(e) => { e.preventDefault(); handleUploadFiles() }}>Upload to Server</button>


      </div>
      
  </Modal> 



   

      <button className='greenBtn' onClick={(e) => { e.preventDefault(); handleSaveLink() }}>Save Link</button>
    </ >
  )
}

export default FTPUpload