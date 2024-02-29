import React, { useState } from 'react'
import './FormBuilder.scss'
import FormBuilderSlice, { addField, setSelectedField } from '../../store/formBuilder/FormBuilderSlice'
import { useDispatch,useSelector } from 'react-redux'
import TextBoxEditor from './fieldEditor/TextBoxEditor'
import FieldList from './FieldList'



const FormBuilder = () => {
  const formBuilder = useSelector(state => state.formBuilder)
 
  const dispatch=useDispatch()


  const handleAdd=()=>{
    dispatch(addField({field:{label:"E",type:"TextBox"}}))

    console.log(formBuilder);
  }



  const fieldEditor={
    "TextBox":<TextBoxEditor key={Math.random()}/>
  }

  return (
    <>
    
    <button onClick={handleAdd}>Add</button>
    <div>Form Builder {formBuilder.selectedField}</div>

    <div className='formBuilder'>
      <div className='fieldList'>
        {/* {
          formBuilder.fields.map((field,i)=>{
          return <div key={i} onClick={()=>handleFieldEdit(i)} className='field'>
            <div className='fieldType'>{field.type}</div>
            <div className='fieldLabel'>{field.label}</div>
            </div>
          })
        } */}

        <FieldList/>
      </div>

      <div className="fieldEditor">
       
        {(formBuilder.selectedField!=-1)? fieldEditor[formBuilder.fields[formBuilder.selectedField].type]:null}
        </div>
      
    </div>

  

    
    </>
  )
}

export default FormBuilder