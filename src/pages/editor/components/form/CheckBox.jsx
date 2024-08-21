import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useFormContext } from 'react-hook-form'

const CheckBox = ({label,name="1",required=false,...rest}) => {
    const campaignDataState = useSelector(state => state.campaignData)
    const {register,unregister,setValue,formState: { errors }} = useFormContext() 
    useEffect(() => {
      setValue(name,campaignDataState.data[name]||"")
      return () => {
        unregister(name)
      }
    }, [])
  return (
    <div className='form-group'>
    
    <input type="checkbox" 
    //defaultChecked={campaignDataState.data[name]}
    {...rest} 
    {...register(name, { required: required })}/>
    {errors[name] && <p>This field is required</p>} 
    <label>{label}</label>
    </div>
  )
}


export default CheckBox