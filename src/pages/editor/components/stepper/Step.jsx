import React, { forwardRef, useContext, useEffect, useImperativeHandle } from 'react'
import { useForm ,FormProvider, useWatch} from 'react-hook-form';
 
import { StepperContext } from './StepperContext';



const Step =  ({ children ,onWatch=null,onCurrentFormMethods=null }) => {
  const Stepper=useContext(StepperContext)
    const methods = useForm({
      mode: "onChange",
      

    })


    useEffect(()=>{
      if(onCurrentFormMethods)onCurrentFormMethods(methods)

    },[methods])


    
  
    const watchedValue=useWatch(methods)
    
    useEffect(() => {
      //console.log(watchedValue);
      //This condition passes to top form value change
      if(onWatch)onWatch(watchedValue)
     
       
        
      return () => {
       
      }
    }, [watchedValue])
    

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