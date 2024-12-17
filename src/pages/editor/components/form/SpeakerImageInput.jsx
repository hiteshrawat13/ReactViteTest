import React, { useEffect, useRef, useState } from 'react'

const SpeakerImageInput = ({fileRef=null,onFileChange=null,index=-1}) => {
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
 if(onFileChange)onFileChange(fileRef.files[0].name || null);
    }


    useEffect(() => {

       // setValue(name,campaignDataState.data[name])
        
        setImagePreview()
        
        if (fileRef)
            fileRef.addEventListener("change", onImageFileChange);
        const tag="speaker"
        fileRef.setAttribute("data-tag", tag);
        const name=fileRef.files[0]?.name || "null name"
        fileRef.setAttribute("data-name", name);
       
      
        return function cleanup() {
            fileRef.removeEventListener("change", onImageFileChange);
        };

    }, [fileRef])
  return (
    <div>
        <button onClick={async (e)=>{e.preventDefault();

      // Check if the Clipboard API is available
      if (navigator.clipboard) {
        try {
          // Read clipboard items
          const clipboardItems = await navigator.clipboard.read();
          
          // Filter the clipboard items to find files
          const files = [];
          for (let item of clipboardItems) {
            // Check if the item is a file
            if (item.types.includes('image/png') || item.types.includes('image/jpeg') || item.types.includes('application/pdf')) {
              const file = await item.getType(item.types[0]); // Get the file as Blob
              files.push(file);
            }
          }

          // If there are files in the clipboard
          if (files.length > 0) {
            // Create a new DataTransfer object to simulate adding files to the file input
            const dataTransfer = new DataTransfer();
            files.forEach(file => {
              // Add the file to the DataTransfer object
              const filename=file.name || "speaker_"+Math.random().toString(36).slice(2, 7)+".png"
              const fileItem = new File([file], filename, { type: file.type });
              dataTransfer.items.add(fileItem);
            });

            // Set the files of the file input
            fileRef.files = dataTransfer.files;

            // Trigger the change event (if necessary, for further processing)
            fileRef.dispatchEvent(new Event('change'));

            
          } else {
            alert("No files found in the clipboard.");
          }
        } catch (error) {
          console.error('Error accessing clipboard', error);
          alert('Failed to access clipboard.');
        }
      } else {
        alert('Clipboard API is not supported in this browser.');
      }

        }}>Paste Image</button>
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