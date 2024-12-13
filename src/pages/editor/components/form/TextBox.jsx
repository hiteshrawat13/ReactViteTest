import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { MdEdit } from "react-icons/md";
import RichTextEditor from './RichTextEditor';
import Modal from 'react-responsive-modal';

const TextBox = ({type=null,label,name,required,width=null,onChange=null,value=null,html=null,helpText=null,...rest}) => {
  const campaignDataState = useSelector(state => state.campaignData)
  const {register,unregister,getValues,setValue,watch,formState: { errors }} = useFormContext() 

  const [editHtmlModalOpened,setEditHtmlModalOpened]=useState(false)

  const [modalText,setModalText]=useState("")

  useEffect(() => {

    if (campaignDataState.data[name] != undefined) {
      setValue(name, campaignDataState.data[name])
    } else {
      setValue(name, value || "")
    }

   // setValue(name,campaignDataState.data[name]||value||"") // used to call watch method for checkbox
    return () => {
      unregister(name)
    }
  }, [campaignDataState.data[name],value])


 
  return (
      <div className='form-group'>


<Modal open={editHtmlModalOpened} onClose={() => setEditHtmlModalOpened(false)}     center>
                <RichTextEditor  label="" name={name}  onTextChange={(val)=>{setModalText(val);console.log(val);
                }}   />

                <button onClick={()=>{setValue(name,modalText);setEditHtmlModalOpened(false)} }>Save</button>
</Modal>

        <label>{label}{(required)&& <span style={{color:"red"}}>*</span>}</label>
        <div className='input-holder' {...((width!=null) && {style:{width}}) }>
        <input autoComplete="off" type={ `${(type)?type:'text'}`  }
        //defaultValue={campaignDataState.data[name]||""}
         {...rest} 
         {...register(name, { required: required ,onChange: (e) => { onChange && onChange(e) }})}    />
        {errors[name] && <div className='error-icon'>!</div>}

        {html && <button onClick={(e)=>{e.preventDefault();setEditHtmlModalOpened(true)} }><MdEdit /></button> }
        </div>
      
        {errors[name] && errors[name].type!="custom" && <span className='error'>{label || "This"} field is required</span>}
        {errors[name] && errors[name].type=="custom" && <span className='error'>{errors[name].message}</span>}
        {helpText && <div className='help-text'>{helpText}</div>}
       
    </div>
  )
}

export default TextBox