import React, { useState } from 'react'

import { IoClose } from "react-icons/io5";
import './Modal.scss'
const Modal = ({children,setOpened,isOpened,title,...props}) => {
    
  return (
    <div className={`Modal `} style={{display:isOpened?"flex":"none"}}>
        <div className='modalOverlay' onClick={()=>setOpened(false)}></div>
        <div className='modalContent' {...props}>
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