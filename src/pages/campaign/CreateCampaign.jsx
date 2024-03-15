import React from 'react'

import './CreateCampaign.scss'
import { useNavigate } from 'react-router-dom/dist'

const CreateCampaign = () => {

    const navigate=useNavigate()


    const handleClick=(e)=>{
        console.log(e.target.dataset);
        navigate(`/campaigns/create/${e.target.dataset.campaign}`)
    }

  return (

    <>
    <div>CreateCampaign</div>

    <div className='cardHolder'>
        <div className='campaignCard' onClick={handleClick} data-campaign="TGIF">
          
          <div className='title'>TGIF</div>
          <div className='server'>resource.itbusinesstoday.com</div>
        </div>
        <div className='campaignCard' onClick={handleClick} data-campaign="Alpha">
          <div className='title'>Alpha</div>
          <div className='server'>resource.itbusinesstoday.com</div>
        </div>
        <div className='campaignCard' onClick={handleClick} data-campaign="Arc"> 
          <div className='title'>Arc</div>
          <div className='server'>resource.itbusinesstoday.com</div>
        </div>
        <div className='campaignCard' onClick={handleClick} data-campaign="EBN">
          <div className='title'>EBN</div>
          <div className='server'>resource.itbusinesstoday.com</div>
        </div>
    </div>
   
    
    </>
    
  )
}

export default CreateCampaign