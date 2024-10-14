import React, { useState } from 'react'


import CampaignDetails from './CampaignDetails';
import instance from './ApiService'
import { useNavigate } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import TemplateManager from '../editor/templates/TemplateManager'

const CreateCampaignPage = () => {

  const [isCreateCampaignModalOpened, setCreateCampaignModalOpened] = useState(false)



  const [clientCode,setClientCode]=useState("")
  const [category,setCategory]=useState("")
  const [campCreatedBy,setCampCreatedBy]=useState("")
  const [lastEditedBy,setLastEditedBy]=useState("")

  const navigate = useNavigate()
 
  const onSubmit = (d) => {
    
    
    createCampaign(d)

  }



  const openModal=(clientCode)=>{
   
    setClientCode(clientCode)
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
      navigate(`/linklist`, {
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
    <div style={{display:"flex",gap:"10px"}}>

      {
        TemplateManager.map((client,i)=>{
         return <div key={i} className='card'>
            <div>{client.title} </div>
            <div><button className='btn--primary' onClick={()=>openModal(client.clientCode)}>Create Campaign</button> </div>
          </div>
        })
      }

      
      <Modal
        center
        open={isCreateCampaignModalOpened}
        onClose={()=>closeModal()}>
         <CampaignDetails campaignData={{clientCode,category,lastEditedBy,campCreatedBy}} onCancel={closeModal} onSubmit={onSubmit}/>

       
      </Modal>


    </div>
  )
}

export default CreateCampaignPage