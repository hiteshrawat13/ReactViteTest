import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { FaFilePdf } from "react-icons/fa";
import { BsFiletypeMp4 } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { PiFrameCornersThin } from "react-icons/pi";
import { useFormContext } from 'react-hook-form'
import TextBox from './TextBox';
const AssetPicker = () => {
    const campaignDataState = useSelector(state => state.campaignData)
    const { register, formState: { errors }, getValues,setValue, watch } = useFormContext()
    const assetFormatValue = watch("ASSET_FORMAT")
    const handleUpdate = () => {

    }

    useEffect(()=>{
        setValue("ASSET_FORMAT",campaignDataState.data["ASSET_FORMAT"])
    },[])


    return (
        <div>
            <h4>Asset</h4>

            <div className='radio-switches'>
                <input type="radio" {...register("ASSET_FORMAT", { required: true })} className="radio-switch" id="PDF" value="PDF" />
                <label for="PDF">PDF</label>
                <input type="radio" {...register("ASSET_FORMAT", { required: true })} className="radio-switch" id="MP4" value="MP4" />
                <label for="MP4">MP4</label>
                <input type="radio" {...register("ASSET_FORMAT", { required: true })} className="radio-switch" id="CLIENT_LINK" value="CLIENT_LINK" />
                <label for="CLIENT_LINK">Client Link</label>
                <input type="radio" {...register("ASSET_FORMAT", { required: true })} className="radio-switch" id="IFRAME" value="IFRAME" />
                <label for="IFRAME">IFrame</label>
            </div>
            {errors["ASSET_FORMAT"] && <p>Asset format is required</p>}


            {(assetFormatValue == "PDF") && <TextBox label="PDF" required="true" name="PDF" />}
            {(assetFormatValue == "MP4") && <TextBox label="MP4" required="true" name="MP4" />}
            {(assetFormatValue == "CLIENT_LINK") && <TextBox label="Client Link" required="true" name="CLIENT_LINK" />}
            {(assetFormatValue == "IFRAME") && <TextBox label="IFrame" required="true" name="IFRAME" />}

        </div>


    )
}

export default AssetPicker