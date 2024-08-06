import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useFormContext } from 'react-hook-form'

const CheckBox = ({label,name="1",required=false,...rest}) => {
    const campaignDataState = useSelector(state => state.campaignData)
    const {register,formState: { errors }} = useFormContext() 
  return (
    <div>
    
    <input type="checkbox" 
    defaultChecked={campaignDataState.data[name]}
    {...rest} 
    {...register(name, { required: required })}/>
    {errors[name] && <p>This field is required</p>} 
    <label>{label}</label>
    </div>
  )
}


export default CheckBox