import React, { useEffect, useState, useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateField } from '../../../../../../store/campaign/CampaignSlice'


import './Editor.scss'
import { fields } from './Fields'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { FaPencilAlt } from "react-icons/fa";
import Jodit from './Jodit'
const TextEditor = ({ id,data,toast,handleFieldDataUpdate}) => {
const dispatch=useDispatch()
const [isModalOpened,setModalOpened]=useState(false)
const divRef=useRef()

const [textContent,setTextContent]=useState(data.label)
    
const handleSubmit=(e)=>{
    e.preventDefault()
    const children= divRef.current.querySelectorAll('input')
    const state={type:fields.Text}
    for (let i = 0; i < children.length; i++) {
       const child = children[i]
       if(child.type=="checkbox"){
        state[child.name]=child.checked
       }else if(child.type=="submit"){
       
       }else{
        state[child.name]=child.value
       } 
    }
    //dispatch(updateField(state))
    handleFieldDataUpdate(id,state)
    console.log(state);
    toast.success('Field Updated')
}




  return (
    <>
     <div ref={divRef} className='editorForm'>
            <label>
                <span>Label</span>
                <input type="text" name="label" onChange={(e)=>{setTextContent(e.target.value)}} value={textContent}/>
            </label>

            <Modal 
center
open={isModalOpened} 
onClose={() =>setModalOpened(false)}>
    <label style={{width:"90%",height:"90%"}}>
                    

                    <Jodit value={textContent} onChange={(e)=>{setTextContent(e)}}/>
                    {/* <textarea  name="label" value={textContent} onChange={(e)=>{setTextContent(e.target.value)}} style={{width:"90%",height:"90%"}}></textarea>
                   */}
                </label>
</Modal>
    
    <button className='openModal' onClick={(e)=>{e.preventDefault();setModalOpened(true)} }><FaPencilAlt /></button>
    


            <button onClick={handleSubmit}>Submit</button>
    </div>
    </>
  )
}

export default TextEditor