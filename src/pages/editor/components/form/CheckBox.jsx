import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useFormContext } from 'react-hook-form'

const CheckBox = ({ label, name = "1", required = false, defaultChecked = false, ...rest }) => {
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
  }, [campaignDataState.data[name], defaultChecked])
  return (
    <div className='form-group'>
      <label>
        <input type="checkbox"
          {...register(name, { required: required })}
          {...rest}
        />
        {errors[name] && <p>This field is required</p>}
        {label}{(required) && <span style={{ color: "red" }}>*</span>}</label>
    </div>
  )
}


export default CheckBox