import React, { useEffect, useRef, useState } from 'react'

import './DropdownMenu.scss'
import Cookies from "js-cookie";
import { CiUser } from "react-icons/ci";
const DropdownMenu = () => {

  const name = Cookies.get('user_name');

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

  return (
    <div className='dropdown' ref={menuRef}>
        <button  className="btn_user" onClick={()=>setCollapsed(!collapsed)}><CiUser /></button>
        {/* <div className={`overlay ${(collapsed)?'hide':'show'}`} onClick={()=>setCollapsed(!collapsed)}>ss</div> */}
        { !collapsed && <div className={ `menu` }  >
            <div>{name}</div>
            <div className="bubble"></div>
        </div> }

    </div>
  )
}

export default DropdownMenu