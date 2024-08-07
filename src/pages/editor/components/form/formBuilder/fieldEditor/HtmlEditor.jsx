import React, { useEffect, useState ,useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateField } from '../../../../../../store/formBuilder/FormBuilderSlice'

import { FaPencilAlt } from "react-icons/fa";

import './Editor.scss'
import { fields } from './Fields'

import Modal from '../../../../../../components/ui/Modal'

const HtmlEditor = ({data,toast}) => {


  const [html,setHtml]=useState(data.html)

  const [isModalOpened,setModalOpened]=useState(false)

const formBuilder = useSelector(state => state.formBuilder)
const dispatch=useDispatch()

const divRef=useRef()
    
const handleSubmit=(e)=>{
    e.preventDefault()
    const children= divRef.current.querySelectorAll('input , textarea')
    const state={type:fields.Html}
    for (let i = 0; i < children.length; i++) {
       const child = children[i]
       if(child.type=="checkbox"){
        state[child.name]=child.checked
       }else if(child.type=="submit"){
       
       }else{
        state[child.name]=child.value
       } 
    }


   
    dispatch(updateField(state))
    console.log(state);
    toast.success('Field Updated')
}




  return (

     <div ref={divRef} className='editorForm'>
        
            <label>
                <span>Label</span>
                <input type="text" name="label" defaultValue={data.label}/>
            </label>

            <label>
                <span>Html</span>
                <textarea name="html" onChange={(e)=>{setHtml(e.target.value)}} value={html}></textarea>
              
            </label>


            { <Modal setOpened={setModalOpened} isOpened={isModalOpened} title={"My Modal"} style={{width:"90%",height:"90%"}}>
    
    <label style={{width:"90%",height:"90%"}}>
                    
                    <textarea  name="html" value={html} onChange={(e)=>{setHtml(e.target.value)}} style={{width:"90%",height:"90%"}}></textarea>
                  
                </label>
        
        </Modal>}
    
    <button className='openModal' onClick={(e)=>{e.preventDefault();setModalOpened(true)} }><FaPencilAlt /></button>
    
    

        
            <button onClick={handleSubmit}>Submit</button>
    </div>
  
  )
}

export default HtmlEditor