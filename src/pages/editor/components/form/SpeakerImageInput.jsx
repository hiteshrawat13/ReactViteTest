import React, { useEffect, useRef, useState } from 'react'

const SpeakerImageInput = ({fileRef=null}) => {
    if(fileRef==null)return <>Please provide fileRef attribute for Speaker Image input.</>
    const imagePreviewRef=useRef()
    
    const [selectedImageFileName, setSelectedImageFileName] = useState(fileRef.files[0]?.name || null)

    const handleDropZoneClick = () => {
        fileRef.click()
    }
    const handleDropZoneDrop=(e)=>{
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
          fileRef.files=droppedFiles
            //setValue("THUMBNAIL_NAME",fileRef.files[0].name)
          
           
        }
    }


    const setImagePreview=(e)=>{

        if(fileRef.files[0]?.type.includes("image") ){
            imagePreviewRef.current.style.display="block"
        }else{
            imagePreviewRef.current.style.display="none"
        } 
        var reader = new FileReader();
        reader.onload = function (e) {
            imagePreviewRef.current.src=e.target.result
        }

        try {
           if(fileRef.files[0]) reader.readAsDataURL(fileRef.files[0]);
        } catch (error) {
            console.log(error);
            
        }
         
    }

    function onImageFileChange(e) {
        e?.preventDefault()
        // update the scroll position
        setSelectedImageFileName(fileRef.files[0].name || null)
        //setValue("THUMBNAIL_NAME",fileRef.files[0].name)
         setImagePreview()

      //  if(onFileChange)onFileChange(fileRef.files[0].name || null);
    }


    useEffect(() => {

       // setValue(name,campaignDataState.data[name])
        
        setImagePreview()
        
        if (fileRef)
            fileRef.addEventListener("change", onImageFileChange);
        const tag="file"
        fileRef.setAttribute("data-tag", tag);
        const name=fileRef.files[0]?.name || "null name"
        fileRef.setAttribute("data-name", name);
      
        return function cleanup() {
            fileRef.removeEventListener("change", onImageFileChange);
        };

    }, [fileRef])
  return (
    <div>
        
        <div className="drop-zone" 
                        onClick={handleDropZoneClick}
                        onDrop={handleDropZoneDrop}
                        onDragOver={(event) => event.preventDefault()} >

<div className='file-preview'>
                <img ref={imagePreviewRef} />
            </div>
                        Drop Image here or click to select an Image file.<br />
                        <div className='selected-file-name'>{selectedImageFileName}</div>
                    </div>
                  
    </div>
  )
}

export default SpeakerImageInput