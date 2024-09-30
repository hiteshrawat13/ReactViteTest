import React from 'react'

import { Form, useForm ,FormProvider} from 'react-hook-form'
import {   SelectBox, TextBox } from '../editor/components/form'

import instance from './ApiService'
import {   useNavigate } from 'react-router-dom'


const CreateCampaignPage = () => {

  const navigate=useNavigate()

    const methods = useForm({mode: "onChange"})
    

    const onSubmit=(d)=>{
        alert(d)

        console.log(d);

        createCampaign(d)
        
    }

    
const createCampaign=async ({
    clientCode,
    category,
    campaignId,
    campaignName,
    campCreatedBy="Admin",
    lastEditedBy="Admin",
    comment,
    country
})=>{
const response=await instance({url:`/camplist/createCampaign`,method:"post",
    
    data:{
    clientCode,
    category,
    campaignId,
    campaignName,
    campCreatedBy,
    lastEditedBy,
    comment,
    country
    }

})

if(response.data.status==200){
//  navigate(`/editor/${clientCode}`,{state: { 
  navigate(`/editor/`,{state: { 
    clientCode,
    category,
    campaignId,
    campaignName,
    campCreatedBy,
    lastEditedBy,
    comment,
    country

  }})
    alert("created")



  }else{
    alert(response.data.message)
  }
}
  return (
    <div>
         
       <FormProvider {...methods}>
            <form   onSubmit={methods.handleSubmit(onSubmit) }>
               
              
      

        <TextBox name="clientCode" label="Client Code" value="TGIF"  readOnly />

        <TextBox name="category" label="Category" value="CS"  readOnly />

        <TextBox name="campaignId" label="Campaign Id"/>

        <SelectBox name="country" label="Country" options={[
             { label: "Select..", value: "" },
             { label: "EU", value: "EU" },
             { label: "NON-EU", value: "NON-EU" },
             { label: "CASL", value: "CASL" },
             { label: "Both ( NON-EU & CASL )", value: "BOTH" }
        ]}/>

       
        <TextBox name="campaignName" label="Campaign Name"/>

        <TextBox name="comment" label="Comment"/>

        <TextBox name="campCreatedBy" label="campCreatedBy" value="Admin"  readOnly />

        <TextBox name="lastEditedBy" label="lastEditedBy" value="Admin"  readOnly  />

        <input type="submit" value="Save" />
        </form>
        </FormProvider>
    </div>
  )
}

export default CreateCampaignPage