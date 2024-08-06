import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

const TextBox = ({label,name,required,...rest}) => {
  const campaignDataState = useSelector(state => state.campaignData)
  const {register,formState: { errors }} = useFormContext() 

 
  return (
    <div>
        <label>{label}</label>
        <input type="text" 
        defaultValue={campaignDataState.data[name]||""}
        {...rest} {...register(name, { required: required })}/>
        {errors[name] && <p>This field is required</p>}
       
    </div>
  )
}

export default TextBox