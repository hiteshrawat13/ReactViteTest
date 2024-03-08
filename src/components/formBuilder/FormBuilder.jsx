import React, { useRef, useState } from 'react'
import './FormBuilder.scss'
import FormBuilderSlice, { addField, setSelectedField } from '../../store/formBuilder/FormBuilderSlice'
import { useDispatch,useSelector } from 'react-redux'
import TextBoxEditor from './fieldEditor/TextBoxEditor'
import FieldList from './FieldList'
import SelectBoxEditor from './fieldEditor/SelectBoxEditor'
 import { fields,editors } from './fieldEditor/Fields'



const FormBuilder = () => {

  const addFieldSelectBoxRef=useRef()
  
  const formBuilder = useSelector(state => state.formBuilder)
 
  const dispatch=useDispatch()

  const handleAdd=(e)=>{
    e.preventDefault()
    switch(addFieldSelectBoxRef.current.value){
      case fields.TextBox:
        dispatch(addField({field:{label:"Text Box",type:fields.TextBox}}))
        break
      case fields.SelectBox:
        dispatch(addField({field:{label:"Select Box",type:fields.SelectBox}})) 
        break;
      case fields.CheckGroup:
        dispatch(addField({field:{label:"Check Group",type:fields.CheckGroup}})) 
        break;
      case fields.RadioGroup:
        dispatch(addField({field:{label:"Radio Group",type:fields.RadioGroup}})) 
        break;
      case fields.CheckBox:
        dispatch(addField({field:{label:"Checkbox",type:fields.CheckBox}})) 
        break;
      case fields.Text:
        dispatch(addField({field:{label:"Text",type:fields.Text}})) 
        break;
      case fields.Html:
        dispatch(addField({field:{label:"Html",type:fields.Html}})) 
        break;
      case fields.HiddenInput:
        dispatch(addField({field:{label:"Hidden Input",type:fields.HiddenInput}})) 
        break;
      case fields.CTA:
        dispatch(addField({field:{label:"Call To Action",type:fields.CTA}})) 
        break;
      default:
        alert("Not Supported")
        break;
    }
  
  }

  return (
    <>
  
    <select ref={addFieldSelectBoxRef}>
    {
      Object.keys(fields).map( (field,i)=>{
        return <option key={i} value={field}>{field}</option>
      })
    }
    </select>
    <button onClick={handleAdd}>Add</button>

    <div>Form Builder {formBuilder.selectedField+1}</div>
    <div className='formBuilder'>
    
      <FieldList/>
 
      <div className="fieldEditor">
        {
          (formBuilder.selectedField!=-1)
          ?        editors[formBuilder?.fields[formBuilder.selectedField]?.type]
          :<div>Select Field</div>
        }
      </div>
    </div>
    </>
  )
}

export default FormBuilder