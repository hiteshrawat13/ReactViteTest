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
import ImageInput from './FileInput';
const RadioGroup = ({title=null,label=null,name,options=null,required=false}) => {
    
   
    const campaignDataState = useSelector(state => state.campaignData)
    const { register, formState: { errors }, getValues,setValue, watch } = useFormContext()
  
   

    useEffect(()=>{
        setValue(name,campaignDataState.data[name])
    },[])


    return (
        <div>
            {title && <h4>{title}</h4> }
           

            <div  className='form-group'>
            {label &&    <div> <label>{label} {(required) && <span style={{ color: "red" }}>*</span>} </label> </div>  }
                <div className='radio-group'>
               
                    {options.map((option,i)=>{
                return <div key={i} ><input type="radio" {...register(name, { required: required })} className="radio-button" id={option.value} value={option.value} />
                <label htmlFor={option.value}>{option.label}</label></div>

                    })}   
                </div>
                {errors[name] && <span className='error'>This field is required</span>}
            </div>

        </div>


    )
}

export default RadioGroup