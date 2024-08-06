import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'

const SelectBox = ({label,name,required,options,...rest}) => {
    const campaignDataState = useSelector(state => state.campaignData)
    const { register, formState: { errors } } = useFormContext()
   
    return (
        <div>
            <label>{label}</label>
            <select 
            defaultValue={campaignDataState.data[name] || ""}
            {...rest} 
            {...register(name, { required: required })}>
                {options?.map(opt=>{
                    return <option value={opt.value}>{opt.label}</option>
                })}
            </select>
            {errors[name] && <p>This field is required</p>}

        </div>
    )
}

export default SelectBox