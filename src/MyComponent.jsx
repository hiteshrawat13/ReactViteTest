import React, { useRef, useState } from 'react'
 
 
import { useDispatch,useSelector,shallowEqual } from 'react-redux'
import DynamicForm from './MyComponent/DynamicForm';
import {setData, addData, updateData } from './store/campaign/CampaignSlice'
import fields from './MyComponent/tgif_form'
import Assets from './MyComponent/Assets';
const MyComponent = () => {

  const assetsRef=useRef(null)

 const dispatch= useDispatch()
   
   
    const campaignData = useSelector(state => state.campaignData  )

    const [step,setStep]=useState(0)
    const [totalSteps,setTotalSteps]=useState(fields.filter(field=>field.type=="step").length)

     

 



  

 
  return (
    <div>

 

{fields.map((field,i)=>{
   if(fields[step].title=="Assets"){
    return <Assets/>
  }
  if(fields[step].type=="step"){

    
      return <div style={{display:(step==i)?"block":"none"}}>
      <DynamicForm 
    { ...(fields[step].title=="Assets") && {ref:assetsRef} }
     key={step} 
    campaignData={campaignData} fields={fields[step].children} /></div>
  }
    

    
     
})}



Total Steps{totalSteps}

{<button onClick={()=> ( (step-1)>0)? setStep(  step-1 ):setStep(0) }>Prev</button>}
{<button onClick={()=> ( (step+1)< totalSteps-1 )? setStep(  step+1 ):setStep(totalSteps-1) }>Next</button>}
 
 {campaignData?.data && JSON.stringify(campaignData.data)}


    </div>
  )
}

export default MyComponent