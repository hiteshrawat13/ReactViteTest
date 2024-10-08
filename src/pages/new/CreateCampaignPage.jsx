import React, { useState } from 'react'

import { Form, useForm, FormProvider } from 'react-hook-form'
import { SelectBox, TextBox } from '../editor/components/form'

import instance from './ApiService'
import { useNavigate } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const CreateCampaignPage = () => {

  const [isCreateCampaignModalOpened, setCreateCampaignModalOpened] = useState(false)



  const [clientCode,setClientCode]=useState("")
  const [category,setCategory]=useState("")
  const [campCreatedBy,setCampCreatedBy]=useState("")
  const [lastEditedBy,setLastEditedBy]=useState("")

  const navigate = useNavigate()
  const methods = useForm({ mode: "onChange" })
  const onSubmit = (d) => {
    
    
    createCampaign(d)

  }



  const openModal=()=>{
   
    setClientCode("TGIF")
    setCategory("CS")
    setCampCreatedBy("ADMIN")
    setLastEditedBy("ADMIN")
    setCreateCampaignModalOpened(true)
  }


  const closeModal=()=>{
    
    setCreateCampaignModalOpened(false)
  }


  const createCampaign = async ({
    clientCode,
    category,
    campaignId,
    campaignName,
    campCreatedBy = "Admin",
    lastEditedBy = "Admin",
    comment,
    country
  }) => {
    const response = await instance({
      url: `/camplist/createCampaign`, method: "post",

      data: {
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

    if (response.data.status == 200) {
      //  navigate(`/editor/${clientCode}`,{state: { 
      navigate(`/editor/`, {
        state: {
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
      alert("campaign created")



    } else {
      alert(response.data.message)
    }
  }
  return (
    <div>
      <button onClick={()=>openModal()}>TGIF</button>
      <Modal
        center
        open={isCreateCampaignModalOpened}
        onClose={()=>closeModal()}>
         <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}  style={{width:"500px"}}>
            <TextBox name="clientCode" label="Client Code" value={clientCode} required={true} readOnly />
            <TextBox name="category" label="Category" value={category} required={true} readOnly />
            <TextBox name="campaignId" label="Campaign Id" required={true} />
            <SelectBox name="country" label="Country" options={[
              { label: "Select..", value: "" },
              { label: "EU", value: "EU" },
              { label: "NON-EU", value: "NON-EU" },
              { label: "CASL", value: "CASL" },
              { label: "Both ( NON-EU & CASL )", value: "BOTH" }
            ]}  required={true} />
            <TextBox name="campaignName" label="Campaign Name" required={true} />
            <TextBox name="comment" label="Comment" required={true} />
            <TextBox name="campCreatedBy" label="campCreatedBy" value={campCreatedBy} required={true} readOnly />
            <TextBox name="lastEditedBy" label="lastEditedBy" value={lastEditedBy} required={true} readOnly />
            
            <button  onClick={(e)=>{e.preventDefault();closeModal()} } >Cancel</button>
            <input type="submit" value="Create Campaign" />
          </form>
        </FormProvider>

       
      </Modal>


    </div>
  )
}

export default CreateCampaignPage