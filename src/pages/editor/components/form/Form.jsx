import React, { forwardRef, useImperativeHandle } from 'react'
import { useForm ,FormProvider} from 'react-hook-form';
import TextBox from './TextBox';
import './Form.css'


const Form = forwardRef( ({ next,children },ref) => {
    const methods = useForm()
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
                <input type="submit" value="Save" />
            </form>
        </FormProvider>
    )
} )

export default Form