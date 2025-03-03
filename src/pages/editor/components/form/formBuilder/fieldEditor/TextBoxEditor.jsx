import React, { useEffect, useState ,useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateField } from '../../../../../../store/campaign/CampaignSlice'


import './Editor.scss'
import { fields } from './Fields'


const TextBoxEditor = ({ id,data,toast,handleFieldDataUpdate}) => {
const dispatch=useDispatch()


const divRef=useRef()

    
const handleSubmit=(e)=>{
    e.preventDefault()
    const children= divRef.current.querySelectorAll('input , textarea,select')
    const state={type:fields.TextBox}
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
   
    <div ref={divRef} className='editorForm'>
       
             <div className='field-holder'>
                <span>Input Type</span>
                <select name="inputType" defaultValue={data.inputType}>
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="number">Number</option>
                </select>
            </div>

             <div className='field-holder'>
                <span>Id</span>
                <input type="text" name="id" defaultValue={data.id} />
            </div>

             <div className='field-holder'>
                <span>Label</span>
                <input type="text" name="label" defaultValue={data.label}/>
            </div>

             <div className='field-holder'>
                <span>Name</span>
                <input type="text" name="name" defaultValue={data.name} />
            </div>

             <div className='field-holder'>
                <span>Placeholder</span>
                <input type="text" name="placeholder" defaultValue={data.placeholder} />
            </div>

             <div className='field-holder'>
                <span>Value</span>
                <input type="text" name="value" defaultValue={data.value} />
            </div>

            <div className='field-holder'>
                <span>Full Width?</span>
                <input type="checkbox" name="isFullWidth" defaultChecked={data.isFullWidth} />
            </div>

             <div className='field-holder'>
                <span>Required?</span>
                <input type="checkbox" name="isRequired" defaultChecked={data.isRequired} />
            </div>

             <div className='field-holder'>
                <span>Disabled?</span>
                <input type="checkbox" name="isDisabled" defaultChecked={data.isDisabled} />
            </div>

             <div className='field-holder'>
                <span>ReadOnly?</span>
                <input type="checkbox" name="isReadOnly" defaultChecked={data.isReadOnly} />
            </div>

            <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default TextBoxEditor