import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './CreateCampaign.scss'
import { useNavigate } from 'react-router-dom/dist'
import Modal from '../../components/ui/Modal'
import {hideSidebar} from '../../store/customizer/CustomizerSlice';
const CreateCampaign = () => {
  const [isOpened,setOpened]=useState(false)
    const navigate=useNavigate()
    const dispatch =useDispatch();

    const handleClick=(path)=>{
        
        navigate(`/${path}`)

        //Hide Sidebar
        dispatch(hideSidebar())
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