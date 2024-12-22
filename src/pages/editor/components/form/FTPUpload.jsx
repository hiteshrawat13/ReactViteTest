import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { StepperContext } from '../stepper/StepperContext'
import useSocket from '../useSocket'
import axios from 'axios'
import Config from '../../../../Config'
import Modal from 'react-responsive-modal'
import { useAuth } from '../../../../Auth'
import Cookies from 'js-cookie'
import CheckLink from '../CheckLink'

import { FileIcon, defaultStyles } from "react-file-icon";

const FTPUpload = ({ publishHelper, filesRef }) => {



  const [isFTPUploadModalOpened, setFTPUploadModalOpened] = useState(false)
  const campaignDataState = useSelector(state => state.campaignData)

  const [filesToUpload, setFilesToUpload] = useState([])
  const [uploading, setUploading] = useState(false);
  const [firstPageName, setFirstPageName] = useState(null)
  const { socketConnected, socketId, socketSessionId, socketUploadProgress } = useSocket()
  const [FTPProgress, setFTPProgress] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState([])
  const token = Cookies.get('access_token');
  const userName = Cookies.get('user_id');



  const getUploadedFilesList = async (link) => {
    try {
      const response = await axios.post(
        Config.API_BASE_URL + `/camplist/getLinkJsonData?link=${encodeURIComponent(link)}`
      );


      console.log(response.data);
      const jobject = JSON.parse(response.data.json_data)

      if (jobject.files) {
        setUploadedFiles((uploadedFiles) => [...new Set([...uploadedFiles, ...jobject.files])])
      }

    } catch (error) {
      //alert(error)
      console.log(error);
    }
  }




  const handleGetFiles = async () => {
    let uploadFiles = []

    for (const [key, value] of Object.entries(filesRef)) {


      console.log("--------------",filesRef[key]);
      
      if (filesRef[key] && filesRef[key].files[0] !=undefined) {
        //Speaker file
        if(filesRef[key].dataset.tag == "speaker"){

          try{
            const speaker=JSON.parse(campaignDataState.data["SPEAKERS"]).find(speaker=>speaker.id==filesRef[key].dataset.id)

            if(speaker && !speaker.speakerImage.startsWith("http")){
              console.log(speaker,"@@@@@@@@@@@@@@@@@@",filesRef[key]);
              uploadFiles.push({
                type: "file",
                name: speaker.speakerImage,
                file: filesRef[key].files[0],
                progress: 0,
                selected: true
              })
              
            }else{
              console.log( "@@@@@@@@@@@@@@@@@@---NO---",filesRef[key]);
            }
          }catch(error){
            console.log( "@@@@@@@@@@@@@@@@@@---ERROR Getting file inputs for speaker---",error);
          }

 

        }else{
          //Files 
          uploadFiles.push({
            type: filesRef[key].dataset.tag,
            name: campaignDataState.data[filesRef[key].dataset.name],
            file: filesRef[key].files[0],
            progress: 0,
            selected: true
          })
        }
    
      }

    }


    const templatefiles = await publishHelper.getPageFiles({ state: campaignDataState.data })
    templatefiles.forEach((file) => {
      uploadFiles.push({
        //type: "templateFile",
        type: "file",
        name: file.name,
        // data: file.data,Hitesh
        file:new Blob([file.data], {type: "text/plain"}),
        progress: 0,
        selected: true
      })
    })



  


    setFirstPageName(templatefiles[0].name)
    setFilesToUpload(uploadFiles)
    getUploadedFilesList(campaignDataState.data["BASE_URL"] + templatefiles[0].name)

  }


  const getTempData = () => {
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
      link_type: campaignDataState.data["LINK_TYPE"]
    }
  }

  const handleSaveLink = () => {
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
      if (file.selected == false)
        return;

      if (file.type === "logo") {
        bodyFormData.append('logoFile', file.name);//order important here  first logoFile then files[]
        bodyFormData.append('logoFolder', campaignDataState.data["LOGO_FOLDER"]);//order important here  first logoFile then files[]
        bodyFormData.append('files[]', file.file, "logo/" + file.name);
      } else if (file.type === "file") {
        bodyFormData.append('files[]', file.file, file.name);
      } else if (file.type === "templateFile") {
        templateFiles.push(file)
      }
    })

    // DUMMY FILE TO UPLOAD to prevent upload error add it to last.
   // bodyFormData.append('files[]', new Blob([], {type: "text/plain"}), "DUMMY");
    
    bodyFormData.append(`templateFiles`, JSON.stringify(templateFiles));
    startUpload(bodyFormData)
    console.log(filesToUpload);

  }



  const handleFileCheckbox = (e, i) => {
    //e?.preventDefault() Dont use e.prevent default on checkbox it will not update on single click
    e.stopPropagation()




    // 1. Find the todo with the provided id
    const currentTodoIndex = i;

    // 2. Mark the todo as complete
    if (currentTodoIndex != -1) {
      const updatedTodo = { ...filesToUpload[currentTodoIndex], selected: e.target.checked };
      // 3. Update the todo list with the updated todo
      setFilesToUpload((previous) => [
        ...previous.slice(0, currentTodoIndex),
        updatedTodo,
        ...previous.slice(currentTodoIndex + 1)])
    }
   // console.log(filesToUpload);
  }

  const handleFileCheckboxSelectAll= (e) => {
    //e?.preventDefault() Dont use e.prevent default on checkbox it will not update on single click
    e.stopPropagation()
 
      setFilesToUpload((previous) => [
        ...previous.map(prev=>{return {...prev,selected: e.target.checked} }) 
      ])
 
  
  }





  const startUpload = (bodyFormData) => {
    try {



      filesToUpload.forEach(item => {

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
        url: Config.API_BASE_URL + `/upload_file/${campaignDataState.data["FTP_CONFIG_NAME"]}/${socketSessionId}`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response, "Complete");

  
          response.data.forEach(item => {

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
          getUploadedFilesList(campaignDataState.data["BASE_URL"] + firstPageName)
        })
        .catch(function (err) {
          console.log(err, "ERROR");

          setUploading(false)
          setFTPProgress(err.message)
          getUploadedFilesList(campaignDataState.data["BASE_URL"] + firstPageName)
        });





    } catch (error) {
      console.log(error);
      setUploading(false)
      getUploadedFilesList(campaignDataState.data["BASE_URL"] + firstPageName)
    }
  }




  useEffect(() => {
    handleGetFiles()


  }, [publishHelper.current])





  useEffect(() => {



    // console.log("IN on progress filesupload:",filesToUpload);

    if (socketUploadProgress == null) return;


    (socketUploadProgress.name == "UPLOAD_PROGRESS") && setFTPProgress(socketUploadProgress.progress)

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
          <div className='fileName'>
          <span style={{display:"inline-block",width:"22px",height:"auto"}}>
                <FileIcon extension={file.name.split('.').pop()} {...defaultStyles[file.name.split('.').pop()]} />
                 
                  </span>
            {file.name} <CheckLink link={campaignDataState.data["BASE_URL"] + file.name} /></div>
          <div className='fileProgress'>{file.progress}</div>
          <div><input type="checkbox" onChange={(e) => handleFileCheckbox(e, i)} checked={file.selected} value={file.selected} /></div>
        </div>
      })}



      <button className='greenBtn' onClick={(e) => { e.preventDefault(); setFTPUploadModalOpened(true) }}>Upload Files</button>
      <Modal
        closeOnOverlayClick={false}
        center
        open={isFTPUploadModalOpened}
        onClose={() => setFTPUploadModalOpened(false)}>


        <div style={{ width: "600px" }}>

          <p style={{ fontSize: "13px" }}><strong>Important Message:</strong><br /><strong>Do NOT upload duplicate content!</strong> Before submitting any files (including links, abstract titles, logos, or thumbnails), <strong>immediately verify</strong> that they are unique. Uploading duplicates may cause critical errors, data conflicts, and severe system issues. Our system actively checks for duplicate entries, and <strong>repeated uploads could result in serious consequences</strong>. <strong>After uploading, you MUST check all content</strong> to ensure it has been correctly submitted and is free from duplication. <strong>Double-check your files and verify the content after upload</strong> to prevent unnecessary disruption and redundancy.<br /><br /></p>


          <div>Socket Id: {socketId}</div>
          <div> {(socketConnected) ? <b style={{ color: "green" }}>Upload Server Connected</b> : <b style={{ color: "red" }}>Upload Server Disconnected</b>}</div>
          <br />
          <table style={{ display: "table", width: "100%", borderCollapse: "collapse" }}>
              <tr className="fileToUpload"  style={{ display: "table-row", width: "100%", backgroundColor: 'transparent' }}>
              <td className='fileName' style={{ display: "table-cell", padding: "10px" }}>  </td>

                <td className='fileName' style={{ display: "table-cell", padding: "10px" }}>Filename </td>
                <td className='fileProgress' style={{ display: "table-cell", padding: "10px" }}>Progress</td>
                <td><input type="checkbox" style={{ display: "table-cell", padding: "10px" }} onChange={(e) => handleFileCheckboxSelectAll(e)} checked={filesToUpload.some(ftu=>ftu.selected==true)}  /></td>
              </tr>
            {filesToUpload.map((file, i) => {
              return <tr className="fileToUpload" key={i} style={{ display: "table-row", width: "100%", backgroundColor: `${file.selected == true ? '#209fcd' : 'transparent'}` }}>
                <td className='fileName' style={{ display: "table-cell", padding: "10px",width:"22px" }}> 
                <span style={{display:"inline-block",width:"22px",height:"auto"}}>
                <FileIcon extension={file.name.split('.').pop()} {...defaultStyles[file.name.split('.').pop()]} />
                 
                  </span>
                </td>
                <td className='fileName' style={{ display: "table-cell", padding: "10px" }}>
                 {file.name} 
                  
                  </td>
                <td className='fileProgress' style={{ display: "table-cell", padding: "10px",width:"100px" }}>{file.progress}</td>
                <td><input type="checkbox" style={{ display: "table-cell", padding: "10px" }} onChange={(e) => handleFileCheckbox(e, i)} checked={file.selected} value={file.selected} /></td>
              </tr>
            })}
          </table>
          <div>{JSON.stringify(FTPProgress)}</div>

          {(uploading) ? <div >Uploading</div> : <button className='greenBtn' onClick={(e) => { e.preventDefault(); handleUploadFiles() }}>Upload to Server</button>
          }

        </div>

      </Modal>





      <button className='greenBtn' onClick={(e) => { e.preventDefault(); handleSaveLink() }}>Save Link</button>

      <br />
      <h4>Uploaded files to server ({uploadedFiles.length}): </h4>
      <ul className='uploadedFileList'>
        {
          uploadedFiles.map((uploadedFile, i) => {
            return <li key={i}><a href={campaignDataState.data["BASE_URL"] + uploadedFile} target="_BLANK">{uploadedFile}</a></li>

          })
        }
      </ul>

      <br />
    </ >
  )
}

export default FTPUpload