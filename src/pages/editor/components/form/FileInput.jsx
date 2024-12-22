import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { StepperContext } from '../stepper/StepperContext'
import { useFormContext } from 'react-hook-form'
import TextBox from './TextBox'
import { EContext } from '../../EditorMain'

const ImageInput = ({label="Image Input",name=null,fileRef=null,tag=null,onFileChange=null,onTextChange=null,readOnly=null,...rest}) =>  {
 
    if(name==null)return <>Please provide name attribute for file input.</>
    if(fileRef==null)return <>Please provide fileRef attribute for file input.</>
    if(tag==null)return <>Please provide tag attribute for file input.</>
    const campaignDataState = useSelector(state => state.campaignData)
    const imagePreviewRef=useRef()

    const fileInputRefDummy=useRef()

    const [selectedImageFileName, setSelectedImageFileName] = useState(fileRef.files[0]?.name || null)
    const [readOnlyText,setReadOnlyText]=useState((readOnly==false)?false:true)
    const { register, formState: { errors } ,setValue} = useFormContext()
    const { setStateValue, getStateValue, watch, setFormValue, filesRef, campData } = useContext(EContext)

    const handleDropZoneClick = (e) => {
        e.preventDefault()
        fileInputRefDummy.current.click()
    }
    const handleDropZoneDrop=(e)=>{
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            fileRef.files=droppedFiles
            //setValue("THUMBNAIL_NAME",fileRef.files[0].name)
            onImageFileChange()
            setImagePreview()
        }
    }

    const handleFileChange = () => {
        const fileInput1 = fileInputRefDummy.current;
       
    
        if (fileInput1 && fileRef) {
          const files = fileInput1.files;
          if (files.length > 0) {
            // Create a DataTransfer object to hold the files
            const dataTransfer = new DataTransfer();
            for (let i = 0; i < files.length; i++) {
              dataTransfer.items.add(files[i]);
            }
    
            // Assign the cloned files to the second input
            fileRef.files = dataTransfer.files;
            alert(`Files copied: ${Array.from(dataTransfer.files).map((f) => f.name).join(", ")}`);
          }
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

        handleFileChange()
        // update the scroll position
        setSelectedImageFileName(fileRef.files[0]?.name || null)
        //setValue("THUMBNAIL_NAME",fileRef.files[0].name)
        setImagePreview()
     
        if(onFileChange)onFileChange(fileRef.files[0]?.name || null);
        
    }


    useEffect(()=>{

        if( [".png",".jpeg",".jpg"].includes(getStateValue(name))    ){
            console.log(getStateValue(name));
            
            imagePreviewRef.current.src= getStateValue("BASE_URL")+getStateValue(name)
        }
   
    },[campData])

    useEffect(() => {

        setValue(name,campaignDataState.data[name])
        
        setImagePreview()
        
        if (fileRef ){
           // fileInputRefDummy.current.addEventListener("change", onImageFileChange);
            fileRef.setAttribute("data-tag", tag);
            fileRef.setAttribute("data-name", name);
        }
            
        return function cleanup() {
             
           // fileInputRefDummy.current.removeEventListener("change", onImageFileChange);
        };

    }, [])
    return (
        <div style={{display:"flex",gap:"6px"}}>

            

            <div style={{width:"100%"}}>


                
                <TextBox label={label} name={name} required={true} onChange={onTextChange}  readOnly={readOnlyText} {...rest}/>
                {/* <input type="text" {...register("THUMBNAIL_NAME", { required: true })} placeholder='Search Logo Here' />
                {errors["THUMBNAIL_NAME"] && <p>Thumbnail file name is required</p>} */}
                    
                    <button onClick={(e)=>{e.preventDefault();setReadOnlyText(prev=>!prev)} }>Edit</button>


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



                    <button className="drop-zone" 
                        onClick={handleDropZoneClick}
                        onDrop={handleDropZoneDrop}
                        onDragOver={(event) => event.preventDefault()} >
                        
                        <div className='file-preview'>
                            <img ref={imagePreviewRef} />
                        </div>
                        Drop Image here or click to select an Image file.<br />
                        <div className='selected-file-name'>{selectedImageFileName}</div>
                    </button>

                    <input type="file" ref={fileInputRefDummy} onChange={onImageFileChange} style={{display:"none"}} />
            </div>

           
          
        </div>
    )
}

export default ImageInput