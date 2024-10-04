import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useFormContext } from 'react-hook-form'

const CheckBox = ({label,name="1",required=false,defaultChecked=false,...rest}) => {
    const campaignDataState = useSelector(state => state.campaignData)
    const {register,unregister,setValue,formState: { errors }} = useFormContext() 
    useEffect(() => {
      setValue(name,campaignDataState.data[name]|| defaultChecked ||"")
      return () => {
        unregister(name)
      }
    }, [])
  return (
    <div className='form-group'>
    <label>
    <input type="checkbox" 
    //defaultChecked={campaignDataState.data[name]}
    
    {...register(name, { required: required })}
    {...rest} 
    />
    {errors[name] && <p>This field is required</p>} 
    {label}{(required)&& <span style={{color:"red"}}>*</span>}</label>
    </div>
  )
}


export default CheckBox