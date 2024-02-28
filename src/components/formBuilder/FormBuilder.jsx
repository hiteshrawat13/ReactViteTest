import React, { useState } from 'react'
import './FormBuilder.scss'
import FormBuilderSlice, { addField, setSelectedField } from '../../store/formBuilder/FormBuilderSlice'
import { useDispatch,useSelector } from 'react-redux'
import TextBoxEditor from './fieldEditor/TextBoxEditor'
const FormBuilder = () => {
  const formBuilder = useSelector(state => state.formBuilder)
 
  const dispatch=useDispatch()


  const handleAdd=()=>{
    dispatch(addField({field:{label:"E",type:"TextBox"}}))

    console.log(formBuilder);
  }

  const handleFieldEdit=(fieldIndex)=>{
    dispatch(setSelectedField(fieldIndex))
  }


  const fieldEditor={
    "TextBox":<TextBoxEditor key={Math.random()}/>
  }

  return (
    <>
    <button onClick={handleAdd}>Add</button>
    <div>Form Builder {formBuilder.selectedField}</div>
    {
      formBuilder.fields.map((field,i)=>{
       return <div key={i} onClick={()=>handleFieldEdit(i)}>{field.label}</div>
      })
    }

    <div className="fieldEditor">
      {(formBuilder.selectedField!=-1)? fieldEditor[formBuilder.fields[formBuilder.selectedField].type]:null}
    </div>
    </>
  )
}

export default FormBuilder