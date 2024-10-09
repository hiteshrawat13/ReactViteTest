import React from 'react'
import { useSelector } from 'react-redux'

const SaveLink = () => {

    const campaignDataState = useSelector(state => state.campaignData)
const save_link=(e)=>{

e.preventDefault()

const userName = "HARDCODEDUSERNAME";
    let tempdata = {
        campid: campaignDataState.data["CAMP_ID"],
        campname: campaignDataState.data["CAMP_NAME"],
        category: 'CS',
        clientcode: campaignDataState.data["CLIENT_CODE"],
        country: campaignDataState.data["REGION"],
        editedby: userName,
        linktitle: campaignDataState.data["EDM_TITLE"],
        link: campaignDataState.data["BASE_URL"] + firstPageName,
        linkcreatedby: userName,
        language: campaignDataState.data["LANGUAGE"],
        json_data: JSON.stringify(campaignDataState.data)
      }
  
      bodyFormData.append('campdata', JSON.stringify(tempdata));
}
    
  return (
    <div><button onClick={save_link}>Save Link</button></div>
  )
}

export default SaveLink