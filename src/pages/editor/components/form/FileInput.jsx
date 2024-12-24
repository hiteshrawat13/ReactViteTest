import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { StepperContext } from '../stepper/StepperContext'
import { useFormContext } from 'react-hook-form'
import TextBox from './TextBox'
import { EContext } from '../../EditorMain'
import ClipboardImagePaste from './ClipboardImagePaste'
import Modal from 'react-responsive-modal'

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

    const [showClipboardImagePasteModal,setShowClipboardImagePasteModal]=useState(false)

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
          
            fileRef.setAttribute("data-tag", tag);
            fileRef.setAttribute("data-name", name);
        }
              fileInputRefDummy?.current?.addEventListener("change", onImageFileChange);
        return function cleanup() {
             
           fileInputRefDummy?.current?.removeEventListener("change", onImageFileChange);
        };

    }, [])
    return (
        <div style={{display:"flex",gap:"6px"}}>

            

            <div style={{width:"100%"}}>


                
                <TextBox label={label} name={name} required={true} onChange={onTextChange}  readOnly={readOnlyText} {...rest}/>
                {/* <input type="text" {...register("THUMBNAIL_NAME", { required: true })} placeholder='Search Logo Here' />
                {errors["THUMBNAIL_NAME"] && <p>Thumbnail file name is required</p>} */}
                    

                    <div className='contextOptions' style={{display:"flex",gap:"6px"}}>
                    <button className="" onClick={(e)=>{e.preventDefault();setReadOnlyText(prev=>!prev)} } title="Edit Filename">✎</button>


<button onClick={async (e)=>{e.preventDefault();
setShowClipboardImagePasteModal(true)
}}  title="Paste copied image.">📋</button>

                    </div>
                 


     <Modal
        closeOnOverlayClick={false}
        center
        open={showClipboardImagePasteModal}
        onClose={() => setShowClipboardImagePasteModal(false)}>
        <div style={{ width: "700px" }}>
          <ClipboardImagePaste fileInputRefDummy={fileInputRefDummy}/>
          <button onClick={(e)=>{  
            e.preventDefault(); 
            setShowClipboardImagePasteModal(false)

            }  }>Set Image</button>
        </div>
      </Modal>





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