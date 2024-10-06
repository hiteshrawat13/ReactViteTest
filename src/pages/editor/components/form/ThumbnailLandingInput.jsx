import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { StepperContext } from '../stepper/StepperContext'
import { useFormContext } from 'react-hook-form'
import TextBox from './TextBox'

const ThumbnailLandingPicker = () =>  {
    const campaignDataState = useSelector(state => state.campaignData)
    const thumbnailPreviewRef=useRef()
    const Stepper = useContext(StepperContext)
    const [selectedThumbnailFileName, setSelectedThumbnailFileName] = useState(Stepper.thumbnailFileLandingPageRef?.current?.files[0]?.name || null)
    const { register, formState: { errors } ,setValue} = useFormContext()
    const handleDropZoneClick = () => {
        Stepper.thumbnailFileLandingPageRef.current.click()
    }
    const handleDropZoneDrop=(e)=>{
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
        Stepper.thumbnailFileLandingPageRef.current.files=droppedFiles
        //setValue("THUMBNAIL_LANDING_NAME",Stepper.thumbnailFileLandingPageRef.current.files[0].name)
        setThumbnailPreview()
        }
    }

    const setThumbnailPreview=(e)=>{
        var reader = new FileReader();
        reader.onload = function (e) {
            thumbnailPreviewRef.current.src=e.target.result
        }
        reader.readAsDataURL(Stepper.thumbnailFileLandingPageRef.current.files[0]);
    }
    useEffect(() => {

        setValue("THUMBNAIL_LANDING_NAME",campaignDataState.data["THUMBNAIL_LANDING_NAME"])

        function onLogoFileChange(e) {
            e.preventDefault()
            // update the scroll position
            setSelectedThumbnailFileName(Stepper.thumbnailFileLandingPageRef.current.files[0].name || null)
            //setValue("THUMBNAIL_LANDING_NAME",Stepper.thumbnailFileLandingPageRef.current.files[0].name)
            setThumbnailPreview()
        }
        if (Stepper.thumbnailFileLandingPageRef && Stepper.thumbnailFileLandingPageRef.current)
            Stepper.thumbnailFileLandingPageRef.current.addEventListener("change", onLogoFileChange);
        return function cleanup() {
            Stepper.thumbnailFileLandingPageRef?.current?.removeEventListener("change", onLogoFileChange);
        };

    }, [])
    return (
        <div style={{display:"flex"}}>

            <div className='file-preview'>
                <p>Logo Preview</p>
                <img id='THUMBNAIL_LANDING_PREVIEW' ref={thumbnailPreviewRef} />
            </div>

            <div>


                
                <TextBox label="Landing Thumbnail Name" name="THUMBNAIL_LANDING_NAME" required={true} />
                {/* <input type="text" {...register("THUMBNAIL_LANDING_NAME", { required: true })} placeholder='Search Logo Here' />
                {errors["THUMBNAIL_LANDING_NAME"] && <p>Thumbnail file name is required</p>} */}
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

export default ThumbnailLandingPicker