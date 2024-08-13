import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'

const SelectBox = ({label,name,required,options,...rest}) => {
    const campaignDataState = useSelector(state => state.campaignData)
    const { register,unregister, formState: { errors } } = useFormContext()

    useEffect(() => {
  
        return () => {
          unregister(name)
        }
      }, [])
    return (
        <div className='form-group'>
            <label>{label}</label>
            <div className='input-holder'>
            <select 
            defaultValue={campaignDataState.data[name] || ""}
            {...rest} 
            {...register(name, { required: required })}>
                {options?.map((opt,i)=>{
                    return <option value={opt.value} key={i}>{opt.label}</option>
                })}
            </select>
            {errors[name] && <div className='error-icon'>!</div>}
            </div>
            {errors[name] && <span className='error'>This field is required</span>}

        </div>
    )
}

export default SelectBox