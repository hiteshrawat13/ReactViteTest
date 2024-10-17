import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

const TextBox = ({type=null,label,name,required,width=null,onChange=null,value=null,...rest}) => {
  const campaignDataState = useSelector(state => state.campaignData)
  const {register,unregister,getValues,setValue,watch,formState: { errors }} = useFormContext() 

  useEffect(() => {
    setValue(name,campaignDataState.data[name]||value||"") // used to call watch method for checkbox
    return () => {
      unregister(name)
    }
  }, [])


 
  return (
      <div className='form-group'>
        <label>{label}{(required)&& <span style={{color:"red"}}>*</span>}</label>
        <div className='input-holder' {...((width!=null) && {style:{width}}) }>
        <input autoComplete="off" type={ `${(type)?type:'text'}`  }
        //defaultValue={campaignDataState.data[name]||""}
         {...rest} 
         {...register(name, { required: required ,onChange: (e) => { onChange && onChange(e) }})}    />
        {errors[name] && <div className='error-icon'>!</div>}
        </div>
      
        {errors[name] && <span className='error'>{label || "This"} field is required</span>}
       
    </div>
  )
}

export default TextBox