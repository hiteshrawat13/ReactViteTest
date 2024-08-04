import React from 'react'
import { useFormContext } from 'react-hook-form'


const TextBox = ({label,name,required,...rest}) => {
  const {register,formState: { errors }} = useFormContext() 

  console.log(errors,name);
  return (
    <div>
        <label>{label}</label>
        <input type="text" {...rest} {...register(name, { required: required })}/>
        {errors[name] && <p>This field is required</p>}
       
    </div>
  )
}

export default TextBox