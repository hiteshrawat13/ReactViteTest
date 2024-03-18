import React from 'react'

import './CreateCampaign.scss'
import { useNavigate } from 'react-router-dom/dist'

const CreateCampaign = () => {

    const navigate=useNavigate()


    const handleClick=(path)=>{
        
        navigate(`/campaigns/create/${path}`)
    }

  return (

    <>
    <div>CreateCampaign</div>

    <div className='cardHolder'>
        <div className='campaignCard' onClick={()=>handleClick("TGIF")} >
          
          <div className='title'>TGIF</div>
          <div className='server'>resource.itbusinesstoday.com</div>
        </div>
        <div className='campaignCard' onClick={()=>handleClick("Alpha")} >
          <div className='title'>Alpha</div>
          <div className='server'>resource.itbusinesstoday.com</div>
        </div>
        <div className='campaignCard' onClick={()=>handleClick("Arc")} > 
          <div className='title'>Arc</div>
          <div className='server'>resource.itbusinesstoday.com</div>
        </div>
        <div className='campaignCard' onClick={()=>handleClick("EBN")}>
          <div className='title'>EBN</div>
          <div className='server'>resource.itbusinesstoday.com</div>
        </div>
    </div>
   
    
    </>
    
  )
}

export default CreateCampaign