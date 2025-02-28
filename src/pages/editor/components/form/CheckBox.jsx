import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useFormContext } from 'react-hook-form'

const CheckBox = ({ label, name, required = false, defaultChecked = false, ...rest }) => {
  const campaignDataState = useSelector(state => state.campaignData)
  const { register, unregister, setValue, formState: { errors } } = useFormContext()

  useEffect(() => {
    if (campaignDataState.data[name] != undefined) {
      setValue(name, campaignDataState.data[name])
        
    } else {
      setValue(name, defaultChecked || false)
    }

    
    return () => {
      unregister(name)
    }
  }, [campaignDataState.data[name],defaultChecked,setValue])


 



  return (
    <div className='form-group'>
      
        <input type="checkbox" className="checkbox" id={name}
          {...register(name, { required: required })}
          {...rest}
        />
        <label htmlFor={name} > {label}{(required) && <span style={{ color: "red" }}>*</span>}</label>
        {errors[name] && <p>This field is required</p>}
       
    </div>
  )
}


export default CheckBox