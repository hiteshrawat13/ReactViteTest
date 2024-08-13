import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

const TextBox = ({label,name,required,...rest}) => {
  const campaignDataState = useSelector(state => state.campaignData)
  const {register,unregister,formState: { errors }} = useFormContext() 

  useEffect(() => {
  
    return () => {
      unregister(name)
    }
  }, [])
  
 
  return (
    <div className='form-group'>
        <label>{label}</label>
        <div className='input-holder'>
        <input type="text" 
        defaultValue={campaignDataState.data[name]||""}
        {...rest} {...register(name, { required: required })}/>
        {errors[name] && <div className='error-icon'>!</div>}
        </div>
      
        {errors[name] && <span className='error'>This field is required</span>}
       
    </div>
  )
}

export default TextBox