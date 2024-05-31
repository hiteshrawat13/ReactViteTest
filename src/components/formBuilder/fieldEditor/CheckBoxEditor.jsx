import React, { useEffect, useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateField } from '../../../store/formBuilder/FormBuilderSlice'

import Modal from '../../ui/Modal'

import './Editor.scss'
import { fields } from './Fields'


const CheckBoxEditor = ({data}) => {
    const [isModalOpened,setModalOpened]=useState(false)


const formBuilder = useSelector(state => state.formBuilder)
const dispatch=useDispatch()

const divRef=useRef()

    
const handleSubmit=(e)=>{
    e.preventDefault()
    const children= divRef.current.querySelectorAll('input , textarea')
    const state={type:fields.CheckBox}
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




  return (
    
    <div ref={divRef} className='editorForm'>
       
            <label>
                <span>Id</span>
                <input type="text" name="id" defaultValue={data.id} />
            </label>

       

            { <Modal setOpened={setModalOpened} isOpened={isModalOpened} title={"My Modal"} style={{width:"90%",height:"90%"}}>
    
            <label  style={{width:"90%",height:"90%"}}>
                <span>Label</span>
                <textarea type="text" name="label" defaultValue={data.label}  style={{width:"90%",height:"90%"}}/>
            </label>
        
        </Modal>}
        <button className='openModal' onClick={(e)=>{e.preventDefault();setModalOpened(true)} }>Edit Label Text</button>



            <label>
                <span>Name</span>
                <input type="text" name="name" defaultValue={data.name} />
            </label>

            <label>
                <span>Value</span>
                <input type="text" name="value" defaultValue={data.value} />
              
            </label>

        

            <label>
                <span>Required?</span>
                <input type="checkbox" name="isRequired" defaultChecked={data.isRequired} />
            </label>

        

           
            <button onClick={handleSubmit}>Submit</button>
        
    </div>
    
  )
}

export default CheckBoxEditor