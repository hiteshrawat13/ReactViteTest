import React, { useEffect, useState,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateField } from '../../../store/formBuilder/FormBuilderSlice'


import './Editor.scss'
import { fields } from './Fields'

import Modal from '../../ui/Modal'


const SelectBoxEditor = ({data}) => {

    const [isModalOpened,setModalOpened]=useState(false)



const formBuilder = useSelector(state => state.formBuilder)
const dispatch=useDispatch()

const divRef=useRef()

const textareaRef=useRef()

    
const handleSubmit=(e)=>{
    e.preventDefault()
    const children= divRef.current.querySelectorAll('input , textarea')
    const state={type:fields.SelectBox}
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
}


const handleRemoveTags=()=>{
   const strippedHtml= stripHtml(textareaRef.current.value)
   textareaRef.current.value=strippedHtml
}

function stripHtml(html)
{
   let tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}


  return (
 
     <div ref={divRef} className='editorForm'>
       
       

            <label>
                <span>Id</span>
                <input type="text" name="id" defaultValue={data.id} />
            </label>

            <label>
                <span>Label</span>
                <input type="text" name="label" defaultValue={data.label}/>
            </label>

            <label>
                <span>Name</span>
                <input type="text" name="name" defaultValue={data.name} />
            </label>



            { <Modal setOpened={setModalOpened} isOpened={isModalOpened} title={"My Modal"} style={{width:"90%",height:"90%"}}>
    
<label style={{width:"90%",height:"90%"}}>
                <span>Options  <button onClick={handleRemoveTags}>Remove Tags</button></span>
                <textarea ref={textareaRef} name="options" defaultValue={data.options} style={{width:"90%",height:"90%"}}></textarea>
              
            </label>
    
    </Modal>}

<button className='openModal' onClick={(e)=>{e.preventDefault();setModalOpened(true)} }>Edit Option Values</button>


          


            <label>
                <span>Full Width?</span>
                <input type="checkbox" name="isFullWidth" defaultChecked={data.isFullWidth} />
            </label>

            <label>
                <span>Required?</span>
                <input type="checkbox" name="isRequired" defaultChecked={data.isRequired} />
            </label>

            <label>
                <span>Disabled?</span>
                <input type="checkbox" name="isDisabled" defaultChecked={data.isDisabled} />
            </label>

            <button onClick={handleSubmit}>Submit</button>
    </div>
  
  )
}

export default SelectBoxEditor