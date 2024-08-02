import React, { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form';



const Form = forwardRef( ({ children },ref) => {
    const { register, handleSubmit } = useForm();

    useImperativeHandle(ref, () => {
        return {
          hi(){alert("hi")}
        };
    }, []);


    return (
        <form ref={ref} onSubmit={(e)=>{e.preventDefault();handleSubmit((data) => alert("EE"+data)  )} }>
            <input {...register("camp_name", { required: true })} />
            <input {...register("camp_id", { required: true })} />
            <input type="submit" value="Save" />
        </form>
    )
} )

export default Form