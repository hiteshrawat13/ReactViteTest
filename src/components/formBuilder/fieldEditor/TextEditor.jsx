import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateField } from '../../../store/formBuilder/FormBuilderSlice'


import './Editor.scss'
import { fields } from './Fields'


const TextEditor = () => {
const formBuilder = useSelector(state => state.formBuilder)
const dispatch=useDispatch()

    
const handleSubmit=(e)=>{
    e.preventDefault()
    const children= e.target.querySelectorAll('input')
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
    dispatch(updateField(state))
    console.log(state);
}




  return (
    <>
    <div>
        <form onSubmit={handleSubmit} className='editorForm'>
        
            <label>
                <span>Label</span>
                <input type="text" name="label" defaultValue={formBuilder.fields[formBuilder.selectedField].label}/>
            </label>

            <input type="submit" />
        </form>
    </div>
    </>
  )
}

export default TextEditor