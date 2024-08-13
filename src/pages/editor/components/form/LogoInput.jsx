import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import { StepperContext } from '../stepper/StepperContext'
import TextBox from './TextBox'
const LogoPicker = () => {
    const campaignDataState = useSelector(state => state.campaignData)
    const logoPreviewRef=useRef()
    const Stepper = useContext(StepperContext)
    const [selectedLogoFileName, setSelectedlogoFileName] = useState(Stepper.logoFileRef?.current?.files[0]?.name || null)
    const { register, formState: { errors } ,setValue} = useFormContext()
    const handleDropZoneClick = () => {
        Stepper.logoFileRef.current.click()
    }
    const handleDropZoneDrop=(e)=>{
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
        Stepper.logoFileRef.current.files=droppedFiles
        setValue("LOGO_NAME",Stepper.logoFileRef.current.files[0].name)
        setLogoPreview()
        }
    }

    const setLogoPreview=(e)=>{
        var reader = new FileReader();
        reader.onload = function (e) {
          logoPreviewRef.current.src=e.target.result
        }
        reader.readAsDataURL(Stepper.logoFileRef.current.files[0]);
    }
    useEffect(() => {

        setValue("LOGO_NAME",campaignDataState.data["LOGO_NAME"])

        function onLogoFileChange(e) {
            e.preventDefault()
            // update the scroll position
            setSelectedlogoFileName(Stepper.logoFileRef.current.files[0].name || null)
            setValue("LOGO_NAME",Stepper.logoFileRef.current.files[0].name)
            setLogoPreview()
        }
        if (Stepper.logoFileRef && Stepper.logoFileRef.current)
            Stepper.logoFileRef.current.addEventListener("change", onLogoFileChange);
        return function cleanup() {
            Stepper.logoFileRef?.current?.removeEventListener("change", onLogoFileChange);
        };

    }, [])
    return (
        <div style={{display:"flex"}}>
            <div className='file-preview'>
                <p>Logo Preview</p>
                <img id='LOGO_PREVIEW' ref={logoPreviewRef} />
            </div>
            <div>

                <TextBox label="Logo Name" name="LOGO_NAME" required={true} />

                {/* <input type="text" {...register("LOGO_NAME", { required: true })} placeholder='Search Logo Here' />
                {errors["LOGO_NAME"] && <p>Logo file name is required</p>} */}
                <div className="drop-zone" 
                onClick={handleDropZoneClick}
                onDrop={handleDropZoneDrop}
                onDragOver={(event) => event.preventDefault()}
                >
                    Drop logo here or click to select a logo.<br />
                    <div className='selected-file-name'>{selectedLogoFileName}</div>
                </div>
            </div>
         
        </div>
    )
}

export default LogoPicker