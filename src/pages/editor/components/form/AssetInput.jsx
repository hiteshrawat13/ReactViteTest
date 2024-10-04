import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { FaFilePdf } from "react-icons/fa";
import { BsFiletypeMp4 } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { PiFrameCornersThin } from "react-icons/pi";
import { useFormContext } from 'react-hook-form'
import TextBox from './TextBox';
import { StepperContext } from '../stepper/StepperContext';
import Row from './Row';
import Col from './Col';
const AssetPicker = () => {
    
    const Stepper = useContext(StepperContext)
    const [selectedPDFFileName, setSelectedPDFFileName] = useState(Stepper.pdfFileRef?.current?.files[0]?.name || null)
    const [selectedMP4FileName, setSelectedMP4FileName] = useState(Stepper.mp4FileRef?.current?.files[0]?.name || null)
    const campaignDataState = useSelector(state => state.campaignData)
    const { register, formState: { errors }, getValues,setValue, watch } = useFormContext()
    const assetFormatValue = watch("ASSET_FORMAT")
    const handleUpdate = () => {

    }

    useEffect(()=>{
        setValue("ASSET_FORMAT",campaignDataState.data["ASSET_FORMAT"])


        function onPDFFileChange(e) {
            e.preventDefault()
            //setValue("PDF",Stepper?.pdfFileRef?.current?.files[0]?.name)
            setSelectedPDFFileName(Stepper?.pdfFileRef?.current?.files[0]?.name)
        }

        function onMP4FileChange(e) {
            e.preventDefault()
            //setValue("MP4",Stepper?.mp4FileRef?.current?.files[0]?.name)
            setSelectedMP4FileName(Stepper?.mp4FileRef?.current?.files[0]?.name)
        }
       
            Stepper?.pdfFileRef?.current?.addEventListener("change", onPDFFileChange);
            Stepper?.mp4FileRef?.current?.addEventListener("change", onMP4FileChange);

        return function cleanup() {
            Stepper.pdfFileRef?.current?.removeEventListener("change", onPDFFileChange);
            Stepper.mp4FileRef?.current?.removeEventListener("change", onMP4FileChange);
        };


    },[])



    const handleDropZoneClickPDF = () => {
        Stepper.pdfFileRef.current.click()
    }
    const handleDropZoneDropPDF=(e)=>{
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
        Stepper.pdfFileRef.current.files=droppedFiles
        //setValue("PDF",Stepper.pdfFileRef.current.files[0].name)
        setSelectedPDFFileName(Stepper.pdfFileRef.current.files[0].name)
        }
    }


    const handleDropZoneClickMP4 = () => {
        Stepper.mp4FileRef.current.click()
    }
    const handleDropZoneDropMP4=(e)=>{
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
        Stepper.mp4FileRef.current.files=droppedFiles
        //setValue("MP4",Stepper.mp4FileRef.current.files[0].name)
        setSelectedMP4FileName(Stepper.mp4FileRef.current.files[0].name)
        }
    }


    return (
        <div>
            <h4>Asset</h4>

            <div  className='form-group'>
                <div className='radio-switches'>
                    <input type="radio" {...register("ASSET_FORMAT", { required: true })} className="radio-switch" id="PDF" value="PDF" />
                    <label htmlFor="PDF">PDF</label>
                    <input type="radio" {...register("ASSET_FORMAT", { required: true })} className="radio-switch" id="MP4" value="MP4" />
                    <label htmlFor="MP4">MP4</label>
                    <input type="radio" {...register("ASSET_FORMAT", { required: true })} className="radio-switch" id="CLIENT_LINK" value="CLIENT_LINK" />
                    <label htmlFor="CLIENT_LINK">Client Link</label>
                    <input type="radio" {...register("ASSET_FORMAT", { required: true })} className="radio-switch" id="IFRAME" value="IFRAME" />
                    <label htmlFor="IFRAME">IFrame</label>
                </div>
                {errors["ASSET_FORMAT"] && <span className='error'>Asset format is required</span>}
            </div>




            {(assetFormatValue == "PDF") && <TextBox label="PDF" required="true" name="PDF_NAME" />}
            {(assetFormatValue == "MP4") && <>
            <TextBox label="MP4" required="true" name="MP4_NAME" />
            <Row>
            <Col>
            <TextBox label="MP4 Video Width" required="true" name="MP4_WIDTH" />
            </Col>
            <Col>
            <TextBox label="MP4 Video Height" required="true" name="MP4_HEIGHT" />
            </Col>
            </Row>
            </>}
            {(assetFormatValue == "CLIENT_LINK") && <TextBox label="Client Link" required="true" name="CLIENT_LINK" />}
            {(assetFormatValue == "IFRAME") && <>
            <TextBox label="IFrame Url" required="true" name="IFRAME" />  
            <Row>
                <Col>
                <TextBox label="IFrame Width" required="true" name="IFRAME_WIDTH" />
                </Col>
                <Col>
                <TextBox label="IFrame Height" required="true" name="IFRAME_HEIGHT" />
                </Col>
            </Row>
           
       
            
            </> }


            {(assetFormatValue == "PDF") && <div>
                <div className="drop-zone" 
                onClick={handleDropZoneClickPDF}
                onDrop={handleDropZoneDropPDF}
                onDragOver={(event) => event.preventDefault()}
                >
                    Drop pdf file here or click to select a pdf file.<br />
                    <div className='selected-file-name'>{selectedPDFFileName}</div>
                </div>
            </div>
            }

            {(assetFormatValue == "MP4") && <div>
                <div className="drop-zone" 
                onClick={handleDropZoneClickMP4}
                onDrop={handleDropZoneDropMP4}
                onDragOver={(event) => event.preventDefault()}
                >
                    Drop mp4 file here or click to select a mp4 file.<br />
                    <div className='selected-file-name'>{selectedMP4FileName}</div>
                </div>
            </div>
            }

        </div>


    )
}

export default AssetPicker