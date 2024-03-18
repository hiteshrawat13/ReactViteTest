import React from 'react'
import { useParams } from 'react-router-dom/dist'
import TGIF from '../../components/campaigns/tgif/TGIF';

const CreateNewCampaign = () => {
   const params= useParams()
 

   const campaign={
    "TGIF":<TGIF key={Math.random()}/>
   }

  return (
    <>
    {(campaign[params.campaign]) ?  campaign[params.campaign] : <div>sdsdsdsdsdsd</div>}
    </>
  )
}

export default CreateNewCampaign