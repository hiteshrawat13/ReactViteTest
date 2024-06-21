import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import './CreateCampaign.scss'
import { useNavigate } from 'react-router-dom/dist'

import {hideSidebar} from '../../store/customizer/CustomizerSlice';


import Modal from '../../components/ui/Modal'

import axios from 'axios';

import Config from '../../Config';


const CreateCampaign = () => {

  const formRef=useRef();
  const clientCodeInputRef=useRef()
  const categoryInputRef=useRef()
  const campaignIdInputRef=useRef()
  const campaignNameInputRef=useRef()
  const countryInputRef=useRef()
  const campCreatedByInputRef=useRef()
  const lastEditedByInputRef=useRef()
  const commentInputRef=useRef()


  const [isModalOpened,setModalOpened]=useState(false)

    const navigate=useNavigate()
    const dispatch =useDispatch();

    const handleClick=(path)=>{
      setModalOpened(true)
       // navigate(`/${path}`)

        //Hide Sidebar
       // dispatch(hideSidebar())
    }

    const handleCreateCampaign=async (e)=>{
      e.preventDefault();


      const clientCode=clientCodeInputRef.current.value
      const category =categoryInputRef.current.value
      const campaignId=campaignIdInputRef.current.value
      const campaignName=campaignNameInputRef.current.value
      const campCreatedBy=campCreatedByInputRef.current.value
      const lastEditedBy=lastEditedByInputRef.current.value
      const comment=commentInputRef.current.value
      const country=countryInputRef.current.value

      try{

 
        const response=await axios.post(Config.API_BASE_URL + `/camplist/createCampaign`,
        {
          clientCode,
          category,
          campaignId,
          campaignName,
          campCreatedBy,
          lastEditedBy,
          comment,
          country
        })

        console.log("Success",response);
      }catch(err){
        console.log(err, "ERROR");
      }

     
    }

    

  return (

    <>
    <div>CreateCampaign</div>

    <div className='cardHolder'>
        <div className='campaignCard' onClick={()=>handleClick("editor")} >
          
          <div className='title'>TGIF</div>
          <div className='server'>resource.itbusinesstoday.com</div>
        </div>
        <div className='campaignCard' onClick={()=>handleClick("editor2")} >
          <div className='title'>Alpha</div>
          <div className='server'>resource.itbusinesstoday.com</div>
        </div>
        {/* <div className='campaignCard' onClick={()=>handleClick("Arc")} > 
          <div className='title'>Arc</div>
          <div className='server'>resource.itbusinesstoday.com</div>
        </div>
        <div className='campaignCard' onClick={()=>handleClick("EBN")}>
          <div className='title'>EBN</div>
          <div className='server'>resource.itbusinesstoday.com</div>
        </div> */}


{<Modal setOpened={setModalOpened} isOpened={isModalOpened} title={"My Modal"} style={{ display:"flex",flexDirection:"column", width: "45%", height: "auto" }}>

<div style={{overflowY:"scroll",flex:"1"}} className='modalBody'>
<form method="post" ref={formRef} onSubmit={handleCreateCampaign}>



<label>
  <span>Client Code</span>
<input value="TGIF" name="client_code"  />
</label>
<label>
  <span>Client Code</span>
<input value="TGIF" name="client_code"  />
</label>


<label>
  <span>Client Code</span>
<input value="TGIF" name="client_code" ref={clientCodeInputRef}/>
</label>

 <label>
 <span>Category</span>
<input value="CS" name="category" ref={categoryInputRef}/>
</label> 

<label><span>Campaign Id</span>
<input type="text" name="campaign_id" ref={campaignIdInputRef}/>
</label>


<label><span>Campaign Name</span>
<input type="text" name="campaign_name" ref={campaignNameInputRef}/>
</label>


<label>
<span>Country</span>
  <select name="country"  ref={countryInputRef}>
    <option>EU</option>
    <option>NON-EU</option>
  </select>
</label>


<label><span>camp_Created_By</span>
<input type="text" name="camp_Created_By" ref={campCreatedByInputRef} value="Hitesh" />
</label>

<label><span>last_edited_By</span>
<input type="text" name="last_edited_By" ref={lastEditedByInputRef} value="Hitesh"/>
</label>

<label><span>comment</span>
<input type="text" name="comment" ref={commentInputRef}  />
</label>



<input type="submit" value="Create"  />
</form>
</div>

</Modal>}
    </div>
   

   
{/* {isOpened && 
<Modal setOpened={setOpened} title={"My Modal"}>
  
  <div><label>First Name</label><input /></div>
  
  
  </Modal>}

<button className='openModal' onClick={()=>setOpened(true)}>Open Modal</button> */}

    
    </>
    
  )
}

export default CreateCampaign