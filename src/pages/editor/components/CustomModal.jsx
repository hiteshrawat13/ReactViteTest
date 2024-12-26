import React, { useState } from 'react'

import './CustomModal.css'
import Modal from 'react-responsive-modal'
const CustomModal = ({}) => {
    const [showModal,setShowModal]=useState(true)
    return (
        <>
        <Modal
            center
            open={showModal}
            onClose={()=>setShowModal()}
            classNames={{
                overlay: 'customOverlay',
                modal: 'customModal',
              }}
              showCloseIcon	={false}
              closeIcon={<div>X</div>}
            >
            <div className='header'>
                <div className='title'>Time</div>
                <button className='close-icon' onClick={(e)=>{e.preventDefault()} }>X</button>
            </div>

            <div className='content'>
                 Content
            </div>

            <div className='actions'>
                <button className='btn-cancel btn-primary' onClick={(e)=>{e.preventDefault()} }>Cancel</button>
                <button className='btn-confirm btn-primary' onClick={(e)=>{e.preventDefault()} }>Ok</button>
            </div>
        </Modal>
        </>
    )
}

export default CustomModal