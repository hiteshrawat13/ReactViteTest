import React, { forwardRef, useImperativeHandle } from 'react'
import { useForm ,FormProvider} from 'react-hook-form';
import TextBox from './TextBox';
import './Form.css'


const Form = forwardRef( ({ children },ref) => {
    const methods = useForm({mode: "onChange"})
    const onSubmit = (data) =>{
       if(next) next()
       // alert("EE"+data)
    }

    useImperativeHandle(ref, () => {
        return {
        //  hi(){alert("hi")}
        };
    }, []);


    return (
        <FormProvider {...methods}>
            <form ref={ref} onSubmit={methods.handleSubmit(onSubmit) }>
                {children}
            </form>
        </FormProvider>
    )
} )

export default Form