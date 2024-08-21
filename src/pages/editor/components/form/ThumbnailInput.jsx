import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { StepperContext } from '../stepper/StepperContext'
import { useFormContext } from 'react-hook-form'
import TextBox from './TextBox'

const ThumbnailPicker = () =>  {
    const campaignDataState = useSelector(state => state.campaignData)
    const thumbnailPreviewRef=useRef()
    const Stepper = useContext(StepperContext)
    const [selectedThumbnailFileName, setSelectedThumbnailFileName] = useState(Stepper.thumbnailFileRef?.current?.files[0]?.name || null)
    const { register, formState: { errors } ,setValue} = useFormContext()
    const handleDropZoneClick = () => {
        Stepper.thumbnailFileRef.current.click()
    }
    const handleDropZoneDrop=(e)=>{
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
        Stepper.thumbnailFileRef.current.files=droppedFiles
        //setValue("THUMBNAIL_NAME",Stepper.thumbnailFileRef.current.files[0].name)
        setThumbnailPreview()
        }
    }

    const setThumbnailPreview=(e)=>{
        var reader = new FileReader();
        reader.onload = function (e) {
            thumbnailPreviewRef.current.src=e.target.result
        }
        reader.readAsDataURL(Stepper.thumbnailFileRef.current.files[0]);
    }
    useEffect(() => {

        setValue("THUMBNAIL_NAME",campaignDataState.data["THUMBNAIL_NAME"])

        function onLogoFileChange(e) {
            e.preventDefault()
            // update the scroll position
            setSelectedThumbnailFileName(Stepper.thumbnailFileRef.current.files[0].name || null)
            //setValue("THUMBNAIL_NAME",Stepper.thumbnailFileRef.current.files[0].name)
            setThumbnailPreview()
        }
        if (Stepper.thumbnailFileRef && Stepper.thumbnailFileRef.current)
            Stepper.thumbnailFileRef.current.addEventListener("change", onLogoFileChange);
        return function cleanup() {
            Stepper.thumbnailFileRef?.current?.removeEventListener("change", onLogoFileChange);
        };

    }, [])
    return (
        <div style={{display:"flex"}}>

            <div className='file-preview'>
                <p>Logo Preview</p>
                <img id='THUMBNAIL_PREVIEW' ref={thumbnailPreviewRef} />
            </div>

            <div>


                
                <TextBox label="Thumbnail Name" name="THUMBNAIL_NAME" required={true} />
                {/* <input type="text" {...register("THUMBNAIL_NAME", { required: true })} placeholder='Search Logo Here' />
                {errors["THUMBNAIL_NAME"] && <p>Thumbnail file name is required</p>} */}
                <div className="drop-zone" 
                onClick={handleDropZoneClick}
                onDrop={handleDropZoneDrop}
                onDragOver={(event) => event.preventDefault()}
                >
                    Drop thumbnail here or click to select a thumbnail file.<br />
                    <div className='selected-file-name'>{selectedThumbnailFileName}</div>
                </div>
            </div>
          
        </div>
    )
}

export default ThumbnailPicker