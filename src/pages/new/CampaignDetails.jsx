import React from 'react'
import { Form, useForm, FormProvider } from 'react-hook-form'

import { SelectBox, TextBox } from '../editor/components/form'
import { useAuth } from '../../Auth'

import Cookies from 'js-cookie'
const CampaignDetails = ({onSubmit,onCancel,campaignData,buttonValue="Submit",edit=false}) => {

  const token = Cookies.get('access_token');
  const userName = Cookies.get('user_id');
  
    const methods = useForm({ mode: "onChange" })
    const {clientCode,category,campaignId="",campaignName="",country="",comment="",lastEditedBy,campCreatedBy}=campaignData
  return (
    <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}  style={{width:"500px"}}>
            <TextBox name="clientCode" label="Client Code" value={clientCode} required={true} readOnly />
            <TextBox name="category" label="Category" value={category} required={true} readOnly />
            <TextBox name="campaignId" label="Campaign Id" value={campaignId} required={true} />
            <SelectBox name="country" label="Country" value={country} options={[
              { label: "Select..", value: "" },
              { label: "EU", value: "EU" },
              { label: "NON-EU", value: "NON-EU" },
              { label: "CASL", value: "CASL" },
              { label: "Both ( NON-EU & CASL )", value: "BOTH" }
            ]}  required={true} />
            <TextBox name="campaignName" label="Campaign Name" value={campaignName} required={true} readOnly ={(edit)==true?true:false} />
            <TextBox name="comment" label="Comment" value={comment} required={false} />
            <TextBox name="campCreatedBy" label="campCreatedBy" value={campCreatedBy} required={true} readOnly />
            <TextBox name="lastEditedBy" label="lastEditedBy" value={lastEditedBy} required={true} readOnly />
            
            <div style={{display:"flex",justifyContent:"right",gap:"10px"}}>
            <button  onClick={(e)=>{e.preventDefault();onCancel()} } className='btn--secondary' >Cancel</button>
            <input type="submit" value={buttonValue}  className='btn--primary'/>
            </div>
            
          </form>
          </FormProvider>
  )
}

export default CampaignDetails