import React, { forwardRef, useImperativeHandle } from 'react'
import { useForm ,FormProvider} from 'react-hook-form';
import TextBox from './TextBox';



const Form = forwardRef( ({ next,children },ref) => {
    const methods = useForm()
    const onSubmit = (data) =>{
        next()
        alert("EE"+data)
    }

    useImperativeHandle(ref, () => {
        return {
          hi(){alert("hi")}
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