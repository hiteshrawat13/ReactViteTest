import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { StepperContext } from '../stepper/StepperContext'

const FTPUpload = () => {
    const campaignDataState = useSelector(state => state.campaignData)
    const {logoFileRef,thumbnailFileRef,pdfFileRef,mp4FileRef} = useContext(StepperContext)
    const [filesToUpload, setFilesToUpload] = useState([])
    const handleGetFiles=async ()=>{
      let uploadFiles = []
    if (logoFileRef.current.files[0]) {
      uploadFiles.push({
        type: "logo",
        name: campaignDataState.data['LOGO_NAME'],
        file: logoFileRef.current.files[0],
        progress: 0
      })
    }

    if (thumbnailFileRef.current.files[0]) {
      uploadFiles.push({
        type: "file",
        name: campaignDataState.data['THUMBNAIL_NAME'],
        file: thumbnailFileRef.current.files[0],
        progress: 0
      })
    }

    if (pdfFileRef.current.files[0]) {
      uploadFiles.push({
        type: "file",
        name: campaignDataState.data['PDF'],
        file: pdfFileRef.current.files[0],
        progress: 0
      })
    }

    if (mp4FileRef.current.files[0]) {
      uploadFiles.push({
        type: "file",
        name: campaignDataState.data['MP4'],
        file: mp4FileRef.current.files[0],
        progress: 0
      })
    }

    // const templatefiles = await publishHelper.current.getFiles()
    // templatefiles.forEach((file) => {
    //   uploadFiles.push({
    //     type: "templateFile",
    //     name: file.name,
    //     data: file.data,
    //     progress: 0
    //   })
    // })
    setFilesToUpload(uploadFiles)
    }

    useEffect(() => {
     handleGetFiles()
    }, [])
    
  return (
    <div>

      <div>Display File List</div>
      <div>Upload Button</div>
      
      {filesToUpload.map((file, i) => {
          return <div className="fileToUpload" key={i}>
            <div className='fileName'>{file.name} </div> <div className='fileProgress'>{file.progress}</div>
          </div>
        })}
    </div>
  )
}

export default FTPUpload