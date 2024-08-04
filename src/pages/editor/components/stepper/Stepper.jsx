import React, { forwardRef, useImperativeHandle, useState } from 'react'
 

import { StepperContext } from './StepperContext';
import "./Stepper.css"
const Stepper = forwardRef(({ children, onStepChange = null },ref) => {
    const [step, setStep] = useState(0)

   

    const [currentStepFormTriggerMethod, setCurrentStepFormTriggerMethod]=useState(null)
    const [totalStepsExplored,setTotalStepsExplored]=useState(1)
  
    useImperativeHandle(ref, () => {
        return {
          hi(){alert("hi")}
        };
    }, []);

    const handleSubmitOfCurrentForm=(data)=>{
        alert(data)
        console.log(data);
    }

   

    const handleTabChange = async (e, i) => {
        e?.preventDefault()

       const isCurrentStepValid= await currentStepFormTriggerMethod.trigger()
       console.log(isCurrentStepValid);
       if(!isCurrentStepValid)return
       await currentStepFormTriggerMethod.handleSubmit(handleSubmitOfCurrentForm)()
       setStep(i)
       // if (onStepChange) onStepChange(i)
    }
    const handleNext = async (e) => {
        e?.preventDefault()


        const isCurrentStepValid= await currentStepFormTriggerMethod.trigger()
        if(!isCurrentStepValid){alert("form not valid");return}
        await currentStepFormTriggerMethod.handleSubmit(handleSubmitOfCurrentForm)()
        setStep((step) => { return (step + 1 < children.length-1) ? step + 1 : children.length -1})
        setTotalStepsExplored(previousValue => ++previousValue)
        
        if (onStepChange) onStepChange(step)
    }
    const handlePrevious = async (e) => {
        e?.preventDefault()
        const isCurrentStepValid= await currentStepFormTriggerMethod.trigger()
        if(!isCurrentStepValid){alert("form not valid");return}
        await currentStepFormTriggerMethod.handleSubmit(handleSubmitOfCurrentForm)()
        setStep((step) => { return (step - 1 > 0) ? step - 1 : 0 })
        if (onStepChange) onStepChange(step)
    }

    
    return <div className='steps'>
        <div className='tabs wizard-progress'>
            {
                children.map((child, i) => {

                    return <label className={`step ${(i< step) ? 'complete' :''}  ${(step == i) ? 'in-progress':''}  ${(i+1>totalStepsExplored) ? 'disabled' :''} `   }>
                        <input type="radio" name="stepper-progress" onChange={(e) => handleTabChange(e, i)}  checked={step == i}  {...(i+1>totalStepsExplored && {disabled:true}) }/>
                        <div class="node"></div>
                        <span>i {child.props.title}</span>
                        
                        </label>
                    return <button key={i} onClick={(e) => handleTabChange(e, i)} className={`tab ${(step == i) ? 'selected' : ''}`}  {...(i+1>totalStepsExplored && {disabled:true}) }> {totalStepsExplored} {child.props.title || `Step ${i}`} </button>
                })
            }
        </div>
        <StepperContext.Provider value={{handleNext:handleNext,handlePrevious:handlePrevious,totalSteps:children.length,setCurrentStepFormTriggerMethod}}>
        {
            children.map((child, i) => {
                return (i == step) && <div key={i}  >{child}</div>  
            })
        }
        </StepperContext.Provider>
 

        <div>
        {(step>0) && <button onClick={handlePrevious}>Previous</button>}
        {(step<children.length-1) && <button onClick={handleNext}>Next</button>}
        </div>
         
    </div>
})

export default Stepper