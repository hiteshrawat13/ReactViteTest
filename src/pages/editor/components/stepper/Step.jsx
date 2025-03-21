import React, { forwardRef, useContext, useEffect, useImperativeHandle } from 'react'
import { useForm ,FormProvider, useWatch ,useFormContext } from 'react-hook-form';
import { StepperContext } from './StepperContext';
import { EContext } from '../../EditorMain';

const Step =  ({ children}) => {
 
  const {  setWatch, setCurrentFormMethods,state , onFormLoad }=useContext(EContext)

  const Stepper=useContext(StepperContext)
    const methods = useForm({
       mode: "onChange"
       
    })

    // useEffect(() => {
    //   methods.reset(state);
       
    // }, [state]);

    useEffect(() => {
      
      methods.trigger().then(res=>{
    
        console.log("❌🔴" ,res )
        if(onFormLoad)onFormLoad();
        
      });
    
 
    
    }, [methods]);
    
    
    
    const watchedValue=useWatch({
      control:methods.control,  // Pass control to link it to the form
    })
 
    
    useEffect(()=>{
      Stepper.setCurrentStepFormTriggerMethod({trigger:methods.trigger,handleSubmit:methods.handleSubmit,methods})
        setCurrentFormMethods(methods)
         setWatch(watchedValue)
       
    },[methods])

   
    useEffect(() => {
      //console.log(watchedValue);
      //This condition passes to top form value change
      setWatch(watchedValue)
      return () => { }
    }, [watchedValue,methods ])
    
  

 

    return (
        <FormProvider {...methods}>
            <form>
                {children}
            </form>
        </FormProvider>
    )
} 
export default Step