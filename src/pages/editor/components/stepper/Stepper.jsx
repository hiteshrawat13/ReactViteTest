import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'


import { StepperContext } from './StepperContext';
import "./Stepper.css"

import { EContext } from '../../EditorMain';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setData, addData, updateData } from '../../../../store/campaign/CampaignSlice'

const Stepper = forwardRef(({ children, onStepChange = null}, ref) => {



    const stepsArray=React.Children.toArray(children)
    const totalSteps=stepsArray.length
    const dispatch = useDispatch()
    const campaignDataState = useSelector(state => state.campaignData)
    const [step, setStep] = useState(0)
    const [currentStepFormTriggerMethod, setCurrentStepFormTriggerMethod] = useState(null)
    const [totalStepsExplored, setTotalStepsExplored] = useState([0])



    const [formState, setFormState] = useState(null)

    useEffect(()=>{
        setFormState(currentStepFormTriggerMethod?.methods?.formState)
    },[currentStepFormTriggerMethod])
   

    // useEffect(()=>{
    //     const importComponent = async () => {
    //      // const module = await import('http://localhost:5173/cbtool/template_files/ARC-1ST-TOUCH/TestPublishHelper.js');
    //    const module = await import('../../templates/ARC-1ST-TOUCH/TestPublishHelper');

    //      const helper=new module.default(campaignDataState,null)
    //       publishHelper.current=helper;
    //       setIsPublishHelperLoaded(true)
    //     };
    //     importComponent();
    // },[])





 


    useImperativeHandle(ref, () => {
        return {
            hi() { alert("hi") },

        };
    }, []);

    const handleSubmitOfCurrentForm = (data) => {
        //alert(data)
      //  console.log("Form Submitted.Saved to state.",data);
        dispatch(addData(data))

       // console.log("REDUX-STATE:-", campaignDataState.data);
    }



    const handleTabChange = async (e, i) => {
        e?.preventDefault()

        

        if (Object.keys(formState.errors).length != 0) {
            // alert("form not valid");
            console.log("Form State have some errors.",formState.errors);
            
            return
        }

        const isCurrentStepValid = await currentStepFormTriggerMethod.trigger()
        console.log(isCurrentStepValid);
        if (!isCurrentStepValid) return

        await currentStepFormTriggerMethod.handleSubmit(handleSubmitOfCurrentForm)()
        setStep(i)
        setTotalStepsExplored(previousValue => [...new Set([...previousValue,step]) ])
        // if (onStepChange) onStepChange(i)
    }
    const handleNext = async (e) => {
        e?.preventDefault()

     
        
        if (Object.keys(formState.errors).length != 0) {
            // alert("form not valid");
            console.log("Form State have some errors.",formState.errors);
            
            return
        }

       

        const isCurrentStepValid = await currentStepFormTriggerMethod.trigger()
        if (!isCurrentStepValid) {
            // alert("form not valid");
            return
        }
      
        await currentStepFormTriggerMethod.handleSubmit(handleSubmitOfCurrentForm)()
        
        setStep((step) => { return (step + 1 < totalSteps - 1) ? step + 1 : totalSteps - 1 })
        //setTotalStepsExplored(previousValue => ++previousValue)
        setTotalStepsExplored(previousValue => [...new Set([...previousValue,step]) ])
        if (onStepChange) onStepChange(step)
    }
    const handlePrevious = async (e) => {
        e?.preventDefault()

        // const isCurrentStepValid= await currentStepFormTriggerMethod.trigger()
        // if(!isCurrentStepValid){
        //     //alert("form not valid");
        //     return
        // }
        // await currentStepFormTriggerMethod.handleSubmit(handleSubmitOfCurrentForm)()

        setStep((step) => { return (step - 1 > 0) ? step - 1 : 0 })
        if (onStepChange) onStepChange(step)
    }

 
    return <div className='steps'>

        {/* {JSON.stringify(campaignDataState.data)} */}
     
        {/* PROGRESS STEPS */}
        <div className='tabs wizard-progress'>
            {
                stepsArray.map((child, i) => {
                    return <div

                        key={i}
                        className={
                            `step 
                        ${(totalStepsExplored.includes(i) ) ? 'complete' : ''}  
                       
                          ${(!totalStepsExplored.includes(i) ) ? 'disabled' : ''}  
                           ${(step == i) ? 'in-progress' : ''}  
                          `
                        }>  <label>
                        <input
                            type="radio"
                            name="stepper-progress"
                            onChange={(e) => handleTabChange(e, i)}
                            checked={step == i}
                            {...(!totalStepsExplored.includes(i) && { disabled: true })}
                        />
                        
                        <span><div className="node"></div>{child.props.title}</span>
                        </label>
                    </div>
                })
            }
        </div>
        <StepperContext.Provider value={{
            handleNext: handleNext,
            handlePrevious: handlePrevious,
            totalSteps: totalSteps,
            setCurrentStepFormTriggerMethod,

          
           

        }}>
            {
                stepsArray.map((child, i) => {
                    return (i == step) && <div key={i}  >{React.cloneElement(child, {  })}</div>
                })
            }
        </StepperContext.Provider>


        <div style={{
            width: "100%",
           
        }}></div>
        <div style={{
            width: "auto",
            position: "relative",
            bottom: "0px",
            display: "flex",
            justifyContent: "space-between",
         
             
        }}>
            <div>{(step > 0) && <button onClick={handlePrevious} className='btn--primary'>⇦ Previous</button>}</div>
            <div>{(step < totalSteps - 1) && <button onClick={handleNext} className='btn--primary'>Next ⇨</button>}</div>

             
        </div>

    </div>
})

export default Stepper