import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
 

import { StepperContext } from './StepperContext';
import "./Stepper.css"

import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setData, addData, updateData } from '../../../../store/campaign/CampaignSlice'

const Stepper = forwardRef(({ children, onStepChange = null },ref) => {

    const dispatch = useDispatch()
    const campaignDataState = useSelector(state => state.campaignData)
    const [step, setStep] = useState(0)
    const [currentStepFormTriggerMethod, setCurrentStepFormTriggerMethod]=useState(null)
    const [totalStepsExplored,setTotalStepsExplored]=useState(1)


    const logoFileRef=useRef()
    const thumbnailFileRef=useRef()
    const pdfFileRef=useRef()
    const mp4FileRef=useRef()
  
    useImperativeHandle(ref, () => {
        return {
       //   hi(){alert("hi")}
        };
    }, []);

    const handleSubmitOfCurrentForm=(data)=>{
        //alert(data)
        console.log(data,"SUBMIT DATA");
        dispatch(addData(data))
       
        console.log(campaignDataState.data,"STATE");
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
        if(!isCurrentStepValid){
           // alert("form not valid");
            return}
        await currentStepFormTriggerMethod.handleSubmit(handleSubmitOfCurrentForm)()
        setStep((step) => { return (step + 1 < children.length-1) ? step + 1 : children.length -1})
        setTotalStepsExplored(previousValue => ++previousValue)
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
        <div>
            <input type="file" name="LOGO_FILE" accept="image/png" className="" ref={logoFileRef} />
            <input type="file" name="THUMBNAIL_FILE" accept="image/png" className="" ref={thumbnailFileRef}/>
            <input type="file" name="PDF_FILE" className="" ref={pdfFileRef}/>
            <input type="file" name="MP4_FILE" className="" ref={mp4FileRef}/>
        </div>
        <div className='tabs wizard-progress'>
            {
                children.map((child, i) => {

                    return <label className={`step ${(i< step) ? 'complete' :''}  ${(step == i) ? 'in-progress':''}  ${(i+1>totalStepsExplored) ? 'disabled' :''} `   }>
                        <input type="radio" name="stepper-progress" onChange={(e) => handleTabChange(e, i)}  checked={step == i}  {...(i+1>totalStepsExplored && {disabled:true}) }/>
                        <div class="node"></div>
                        <span>i {child.props.title}</span>
                        </label>
                })
            }
        </div>
        <StepperContext.Provider value={{
            handleNext:handleNext,
            handlePrevious:handlePrevious,
            totalSteps:children.length,
            setCurrentStepFormTriggerMethod,

            logoFileRef,
            thumbnailFileRef,
            pdfFileRef,
            mp4FileRef

            }}>
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