import React, { useRef, useState } from 'react'
 
 
import { useDispatch,useSelector,shallowEqual } from 'react-redux'
import DynamicForm from './MyComponent/DynamicForm';
import {setData, addData, updateData } from './store/campaign/CampaignSlice'
import fields from './MyComponent/tgif_form'
import Assets from './MyComponent/Assets';
const MyComponent = () => {

  const assetsRef=useRef(null)

  const logoFileRef=useRef()
  const thumbnailFileRef=useRef()
  const pdfFileRef=useRef()
  const mp4FileRef=useRef()

 const dispatch= useDispatch()
   
   
    const campaignData = useSelector(state => state.campaignData  )

    const [step,setStep]=useState(0)
    const [totalSteps,setTotalSteps]=useState(fields.filter(field=>field.type=="step").length)

     

 



    const setFile=(label)=>{
      alert(label+" called")
      switch(label){
        case "LOGO_FILE":
          logoFileRef.current?.click()
        break;
        case "THUMBNAIL_FILE":
          thumbnailFileRef.current?.click()
        break;
        case "PDF_FILE":
          alert("PDF")
        break;
      }
    }
  

 
  return (
    <div>


    <input type="file" name='LOGO_FILE' ref={logoFileRef}/>
    <input type="file" name='THUMBNAIL_FILE' ref={thumbnailFileRef} />
    <input type="file" name='PDF_FILE' ref={pdfFileRef}/>
    <input type="file" name='MP4_FILE' ref={mp4FileRef}/>

{fields.map((field,i)=>{
  
    
      return <div style={{display:(step==i)?"block":"none"}}>
      <DynamicForm 
    { ...(fields[step].title=="Assets") && {setFile:setFile} }
     key={step} 
    campaignData={campaignData} fields={fields[step].children} /></div>
  
    

    
     
})}



Total Steps{totalSteps}

{<button onClick={()=> ( (step-1)>0)? setStep(  step-1 ):setStep(0) }>Prev</button>}
{<button onClick={()=> ( (step+1)< totalSteps-1 )? setStep(  step+1 ):setStep(totalSteps-1) }>Next</button>}
 
 {campaignData?.data && JSON.stringify(campaignData.data)}


    </div>
  )
}

export default MyComponent