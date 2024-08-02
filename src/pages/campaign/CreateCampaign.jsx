import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import './CreateCampaign.scss'
import { useNavigate } from 'react-router-dom/dist'

import {hideSidebar} from '../../store/customizer/CustomizerSlice';
import Cookies from "js-cookie";

import Modal from '../../components/ui/Modal'

import axios from 'axios';

import Config from '../../Config';

import { useForm} from 'react-hook-form';

const CreateCampaign = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();


  const formRef=useRef();
  const [isModalOpened,setModalOpened]=useState(false)

    const navigate=useNavigate()
    const dispatch =useDispatch();

    const handleClick=(path,clientCode)=>{
      setModalOpened(true)

    //  clientCodeInputRef.current.value=clientCode
       // navigate(`/${path}`)
       setValue('clientCode', clientCode, { shouldValidate: true })
        //Hide Sidebar
       // dispatch(hideSidebar())
    }

    const handleCreateCampaign=async (data)=>{
     
      const {
        clientCode,
        category,
        campaignId,
        campaignName,
        campCreatedBy,
        lastEditedBy,
        comment,
        country
      }= data

      try{
        const response=await axios.post(Config.API_BASE_URL + `/camplist/createCampaign`,{
          clientCode,
          category,
          campaignId,
          campaignName,
          campCreatedBy,
          lastEditedBy,
          comment,
          country
        })

        if(response.data.status==200){
          navigate(`/editor/${clientCode}`,{state: { 
            clientCode,
            category,
            campaignId,
            campaignName,
            campCreatedBy,
            lastEditedBy,
            comment,
            country
  
          }})
        }else{
          alert(response.data.message)
        }
        
      }catch(err){
        console.log(err, "ERROR");
      }
    }

    

  return (

    <>
    <div>CreateCampaign</div>

    <div className='cardHolder'>
        <div className='campaignCard' onClick={()=>handleClick("editor","TGIF")} >
          
          <div className='title'>TGIF</div>
          <div className='server'>resource.itbusinesstoday.com</div>
        </div>
        <div className='campaignCard' onClick={()=>handleClick("editor2","ALPHA")} >
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


{<Modal setOpened={setModalOpened} isOpened={isModalOpened} title={"Create New Campaign"} style={{ display:"flex",flexDirection:"column", height: "auto" }} width='35%'>

<div className='modalBody'>
<form method="post" ref={formRef} 
// onSubmit={handleCreateCampaign}
 style={{display:"flex",flexDirection:"column",gap:"10px"}} onSubmit={handleSubmit((data) => handleCreateCampaign(data))}>




            

<div  style={{display:"flex",gap:"12px"}}>
 
    <div style={{flexBasis:"50%"}}>
        <span style={{display:"block"}}>Client Code</span>
        <input {...register('clientCode', { required: true })} readOnly style={{width:"100%",background:"#b2bec3"}}/>
        {errors.clientCode && <p>client_code is required.</p>}
    </div>

    <div style={{flexBasis:"50%"}}>
        <span style={{display:"block"}}>Category</span>
        <input value="CS" {...register('category', { required: true })}  readOnly style={{width:"100%",background:"#b2bec3"}}/>
        {errors.category && <p>category is required.</p>}
    </div>

</div>



<div  style={{display:"flex",gap:"12px"}}>
 
    <div style={{flexBasis:"50%"}}>
        <span style={{display:"block"}}>Campaign Id</span>
        <input type="text" {...register('campaignId', { required: true })} style={{width:"100%"}}/>
        {errors.campaignId && <p>campaign_id is required.</p>}
    </div>


    <div style={{flexBasis:"50%"}}>
        <span style={{display:"block"}}>Country</span>
        <select {...register('country', { required: true })} style={{width:"100%"}}>
          <option value="">Select..</option>
          <option value="EU">EU</option>
          <option value="NON-EU">NON-EU</option>
          <option value="CASL">CASL</option>
          <option value="BOTH">Both ( NON-EU & CASL )</option>
        </select>
        {errors.country && <p>country is required.</p>}
    </div>
</div>



<div  style={{display:"flex",gap:"12px"}}>
 
    <div style={{flexBasis:"100%"}}>
        <span style={{display:"block"}}>Campaign Name</span>
        <input type="text"  {...register('campaignName', { required: true })}  style={{width:"100%"}}/>
        {errors.campaignName && <p>campaign_name is required.</p>}
    </div>

    {/* <div style={{flexBasis:"50%"}}>
        <span style={{display:"block"}}>camp_Created_By</span>
        <input type="text" name="camp_Created_By" ref={campCreatedByInputRef} value={Cookies.get('user_name')} readOnly style={{width:"100%"}}/>
    </div> */}

</div>


<div  style={{display:"flex",gap:"12px"}}>
 
    {/* <div style={{display:"none",flexBasis:"50%"}}>
        <span style={{display:"block"}}>last_edited_By</span>
        <input type="text" name="last_edited_By" ref={lastEditedByInputRef} value={Cookies.get('user_name')} readOnly style={{width:"100%"}}/>
    </div> */}

    <div style={{flexBasis:"100%"}}>
        <span style={{display:"block"}}>comment</span>
        <input type="text"  {...register('comment')}   style={{width:"100%"}} />
    </div>

</div>
<input type="hidden"  {...register('campCreatedBy', { required: true })} value={Cookies.get('user_name')} readOnly  />
<input type="hidden"   {...register('lastEditedBy', { required: true })} value={Cookies.get('user_name')} readOnly />

<div>
<input type="submit" value="Create"  style={{width:"100%",padding:"5px",background:"#6ab04c",color:"#fff",border:"none"}}/>
</div>



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