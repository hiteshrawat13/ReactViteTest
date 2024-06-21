import React, { useEffect, useRef, useState } from 'react'

import './DropdownMenu.scss'
import Cookies from "js-cookie";
import { CiUser } from "react-icons/ci";

import { useNavigate } from 'react-router-dom';
const DropdownMenu = () => {

  const name = Cookies.get('user_name');
  const navigate = useNavigate();
    const [collapsed,setCollapsed]=useState(true);

    const menuRef=useRef()
 
    useEffect(()=>{
      const handleClick=(e)=>{
       
        if(!menuRef.current?.contains(e.target)){
         setCollapsed(true)
         
        }
       }
     
      document.addEventListener("mousedown",handleClick)

      return ()=>{ document.removeEventListener("mousedown",handleClick) }
    })



    
    const logOutFun =()=>{
      Cookies.remove("user_name");
    Cookies.remove("user_id");
    Cookies.remove("access_token");
    Cookies.remove("user_permissions");

      navigate('/login');
       window.location.reload();
  }

  return (
    <div className='dropdown' ref={menuRef}>
        <button  className="btn_user" onClick={()=>setCollapsed(!collapsed)}><CiUser /></button>
        {/* <div className={`overlay ${(collapsed)?'hide':'show'}`} onClick={()=>setCollapsed(!collapsed)}>ss</div> */}
        { !collapsed && <div className={ `menu` }  >
            <div>{name}</div>
            <div className="bubble"></div>

            <div className='logout'>
        <div onClick={logOutFun}>Logout</div>
            
        </div>

        </div> }

    </div>
  )
}

export default DropdownMenu