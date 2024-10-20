import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { StepperContext } from '../stepper/StepperContext'
import { useFormContext } from 'react-hook-form'
import TextBox from './TextBox'

const ImageInput = ({label="Image Input",name=null,fileRef=null,tag=null,onFileChange=null,onTextChange=null,...rest}) =>  {

    if(name==null)return <>Please provide name attribute for file input.</>
    if(fileRef==null)return <>Please provide fileRef attribute for file input.</>
    if(tag==null)return <>Please provide tag attribute for file input.</>
    const campaignDataState = useSelector(state => state.campaignData)
    const imagePreviewRef=useRef()

    const [selectedImageFileName, setSelectedImageFileName] = useState(fileRef.files[0]?.name || null)
    const { register, formState: { errors } ,setValue} = useFormContext()
    const handleDropZoneClick = () => {
        fileRef.click()
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

        setValue(name,campaignDataState.data[name])
        setImagePreview()
        
        if (fileRef)
            fileRef.addEventListener("change", onImageFileChange);
            fileRef.setAttribute("data-tag", tag);
            fileRef.setAttribute("data-name", name);
        return function cleanup() {
            fileRef.removeEventListener("change", onImageFileChange);
        };

    }, [fileRef])
    return (
        <div style={{display:"flex"}}>

            

            <div>


                
                <TextBox label={label} name={name} required={true} onChange={onTextChange} {...rest}/>
                {/* <input type="text" {...register("THUMBNAIL_NAME", { required: true })} placeholder='Search Logo Here' />
                {errors["THUMBNAIL_NAME"] && <p>Thumbnail file name is required</p>} */}
                    <div className="drop-zone" 
                        onClick={handleDropZoneClick}
                        onDrop={handleDropZoneDrop}
                        onDragOver={(event) => event.preventDefault()}
                    >
                        Drop Image here or click to select an Image file.<br />
                        <div className='selected-file-name'>{selectedImageFileName}</div>
                    </div>
            </div>

            <div className='file-preview'>
                <p>Preview</p>
                <img ref={imagePreviewRef} />
            </div>
          
        </div>
    )
}

export default ImageInput