import React, { useEffect, useState ,useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateField } from '../../../store/formBuilder/FormBuilderSlice'


import './Editor.scss'
import { fields } from './Fields'


const HtmlEditor = ({data}) => {
const formBuilder = useSelector(state => state.formBuilder)
const dispatch=useDispatch()

const divRef=useRef()
    
const handleSubmit=(e)=>{
    e.preventDefault()
    const children= e.target.querySelectorAll('input , textarea')
    const state={type:fields.Html}
    for (let i = 0; i < children.length; i++) {
       const child = children[i]
       if(child.type=="checkbox"){
        state[child.name]=child.checked
       }else if(child.type=="submit"){
       
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
                <span>Label</span>
                <input type="text" name="label" defaultValue={data.label}/>
            </label>

            <label>
                <span>Html</span>
                <textarea name="html" defaultValue={data.html}></textarea>
              
            </label>

        
            <button onClick={handleSubmit}>Submit</button>
    </div>
  
  )
}

export default HtmlEditor