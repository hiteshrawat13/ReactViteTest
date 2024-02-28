import React from 'react'
import { useParams } from 'react-router-dom/dist'
import TGIF from '../../components/campaigns/tgif/TGIF';

const CreateNewCampaign = () => {
   const params= useParams()
   console.log(params);

   const campaign={
    "TGIF":<TGIF/>
   }

  return (
    <>
    {(campaign[params.campaign]) ?  campaign[params.campaign] : <div>sdsdsdsdsdsd</div>}
    </>
  )
}

export default CreateNewCampaign