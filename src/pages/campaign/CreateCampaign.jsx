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
    <div className='campaignCard' onClick={handleClick} data-campaign="TGIF"> TGIF</div>
    <div className='campaignCard' onClick={handleClick} data-campaign="Alpha"> Alpha</div>
    <div className='campaignCard' onClick={handleClick} data-campaign="Arc"> Arc</div>
    <div className='campaignCard' onClick={handleClick} data-campaign="EBN"> EBN</div>
</div>
   
    
    </>
    
  )
}

export default CreateCampaign