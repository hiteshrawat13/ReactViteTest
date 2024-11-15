import React, { forwardRef, useContext, useEffect, useImperativeHandle } from 'react'
import { useForm ,FormProvider, useWatch} from 'react-hook-form';
import { StepperContext } from './StepperContext';
import { EContext } from '../../EditorMain';

const Step =  ({ children}) => {
 
  const {  setWatch, setCurrentFormMethods }=useContext(EContext)

  const Stepper=useContext(StepperContext)
    const methods = useForm({
      mode: "onChange"
    })

    useEffect(()=>{
      Stepper.setCurrentStepFormTriggerMethod({trigger:methods.trigger,handleSubmit:methods.handleSubmit,methods})
       
        setCurrentFormMethods(methods)
    },[methods])

    const watchedValue=useWatch(methods)
    
    useEffect(() => {
      //console.log(watchedValue);
      //This condition passes to top form value change
      
        setWatch(watchedValue)
      return () => {
       
      }
    }, [watchedValue])
    
    const onSubmit = (data) =>{ 


      console.log(methods);
      alert("EEE")
       // console.log(data);


       // Stepper.handleNext()
    }

 

    return (
        <FormProvider {...methods}>
            <form  onSubmit={methods.handleSubmit(onSubmit) } >
                {children}
            </form>
        </FormProvider>
    )
} 
export default Step