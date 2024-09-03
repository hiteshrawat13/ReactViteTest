import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
 

import { StepperContext } from './StepperContext';
import "./Stepper.css"

import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setData, addData, updateData } from '../../../../store/campaign/CampaignSlice'

const Stepper = forwardRef(({ children, onStepChange = null,setCurrentFormValue=null,publishHelper},ref) => {

    
    const dispatch = useDispatch()
    const campaignDataState = useSelector(state => state.campaignData)
    const [step, setStep] = useState(0)
    const [currentStepFormTriggerMethod, setCurrentStepFormTriggerMethod]=useState(null)
    const [totalStepsExplored,setTotalStepsExplored]=useState(1)
    //const publishHelper=useRef()
    const [isPublishHelperLoaded,setIsPublishHelperLoaded]=useState(false)

    const logoFileRef=useRef()
    const thumbnailFileRef=useRef()
    const pdfFileRef=useRef()
    const mp4FileRef=useRef()

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



    const onWatch=(watchValue)=>{
        //This function detected form value change
        if(setCurrentFormValue)setCurrentFormValue(watchValue)
    }
    

    useImperativeHandle(ref, () => {
        return {
             hi(){alert("hi")},
          
        };
    }, []);

    const handleSubmitOfCurrentForm=(data)=>{
        //alert(data)
        console.log(data,"SUBMIT DATA");
        dispatch(addData(data))
       
        console.log("REDUX-STATE:-",campaignDataState.data);
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
     
     {/* {JSON.stringify(campaignDataState.data)} */}
        <div style={{display:"none"}}>
            {/* THESE FILE INPUTS ARE USED FRO LOGO THUMBNAIL PDF MP4 TO KEEP IN STATE */}
            <input type="file" name="LOGO_FILE" accept="image/png" className="" ref={logoFileRef} />
            <input type="file" name="THUMBNAIL_FILE" accept="image/png" className="" ref={thumbnailFileRef}/>
            <input type="file" name="PDF_FILE" className="" ref={pdfFileRef}/>
            <input type="file" name="MP4_FILE" className="" ref={mp4FileRef}/>
        </div>
        {/* PROGRESS STEPS */}
        <div className='tabs wizard-progress'>
            {
                children.map((child, i) => {
                    return <label 
                    className={
                        `step 
                        ${(i< step) ? 'complete' :''}  
                        ${(step == i) ? 'in-progress':''}  
                        ${(i+1>totalStepsExplored) ? 'disabled' :''}`
                    }>
                        <input 
                        type="radio" 
                        name="stepper-progress" 
                        onChange={(e) => handleTabChange(e, i)}  
                        checked={step == i}  
                        {...(i+1>totalStepsExplored && {disabled:true}) }
                        />
                        <div class="node"></div>
                        <span>{child.props.title}</span>
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
            mp4FileRef,
            publishHelper,

            }}>
        {
            children.map((child, i) => {
                return (i == step) && <div key={i}  >{React.cloneElement(child,{onWatch})}</div>  
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