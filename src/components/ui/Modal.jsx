import React, { useState } from 'react'

import { IoClose } from "react-icons/io5";
import './Modal.scss'
const Modal = ({children,setOpened,title}) => {
    
  return (
    <div className={`Modal `}>
        <div className='modalOverlay' onClick={()=>setOpened(false)}></div>
        <div className='modalContent'>
            <div>
                <div>{title}</div>
                <div className='close' onClick={()=>setOpened(false)}>
                <IoClose />
                </div>
            </div>
            
            {children}
        </div>
    </div>
  )
}

export default Modal