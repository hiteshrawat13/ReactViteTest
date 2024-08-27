import React, { forwardRef, useContext, useEffect, useImperativeHandle } from 'react'
import { useForm ,FormProvider} from 'react-hook-form';
 
import { StepperContext } from './StepperContext';
import { useSelector } from 'react-redux';


const Step =  ({ children }) => {
  const Stepper=useContext(StepperContext)
    const methods = useForm({mode: "onChange"})
    const onSubmit = (data) =>{
     // Stepper.setIsStepValid(true)
       // alert("EE"+data)
        console.log(data);
        Stepper.handleNext()
    }

    useEffect(()=>{
     Stepper.setCurrentStepFormTriggerMethod({trigger:methods.trigger,handleSubmit:methods.handleSubmit,methods})
    },[])

    return (
        <FormProvider {...methods}>
            <form   onSubmit={methods.handleSubmit(onSubmit) } >
                {children}
               
                {/* <input type="submit" value="Save" /> */}
            </form>
        </FormProvider>
    )
} 

export default Step