import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'

const SelectBox = ({label,name,value=null,required,options,width=null,...rest}) => {
    const campaignDataState = useSelector(state => state.campaignData)
    const { register,unregister,setValue, formState: { errors } } = useFormContext()

    useEffect(() => {
        setValue(name,campaignDataState.data[name] ||value || "")
        return () => {
          unregister(name)
        }
      }, [])
    return (
        <div className='form-group'>
            <label>{label}{(required)&& <span style={{color:"red"}}>*</span>}</label>
            <div className='input-holder'  {...((width!=null) && {style:{width}}) }>
            <select 
            //defaultValue={campaignDataState.data[name] || ""}
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