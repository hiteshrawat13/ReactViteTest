import React, { useState } from 'react'

import { IoClose } from "react-icons/io5";
import './Modal.scss'
const Modal = ({children,setOpened,isOpened,title,width="45%",...props}) => {
    
  return (
    <div className={`Modal `} style={{display:isOpened?"flex":"none",position:"fixed"}}>
      <div >
        <div className='modalOverlay' onClick={()=>setOpened(false)}></div>
        <div  {...props} style={{
         position:"fixed",top:"0",left:"0", display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%",overflowY:"auto"
          }} onMouseDown={e => e.currentTarget === e.target && setOpened(false)}>
            <div  className='modalContent' style={{width:width,margin:"auto"}} >
                <div>
                  <div>{title}</div>
                  <div className='close' onClick={()=>setOpened(false)}>
                  <IoClose />
                  </div>
                </div>
           
            {children}

           

            </div>
        </div>
      </div>
    </div>
  )
}

export default Modal