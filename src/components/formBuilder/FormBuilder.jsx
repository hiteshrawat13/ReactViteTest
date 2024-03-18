import React, { Suspense, useEffect, useRef, useState } from 'react'
import './FormBuilder.scss'
import FormBuilderSlice, { addField, setSelectedField,loadFieldsFromJson } from '../../store/formBuilder/FormBuilderSlice'
import { useDispatch,useSelector } from 'react-redux'
import FieldList from './FieldList'
import { fields,editors } from './fieldEditor/Fields'



 import  f from './../../pages/editor/default-fields.json'


 const CTAEditor = React.lazy(() => import("./fieldEditor/CTAEditor"));
const CheckBoxEditor = React.lazy(() => import( "./fieldEditor/CheckBoxEditor"));
const CheckGroupEditor = React.lazy(() => import( "./fieldEditor/CheckGroupEditor"));
const HiddenInputEditor = React.lazy(() => import( "./fieldEditor/HiddenInputEditor"));
const  HtmlEditor = React.lazy(() => import( "./fieldEditor/HtmlEditor"));
const  RadioGroupEditor= React.lazy(() => import( "./fieldEditor/RadioGroupEditor"));
const SelectBoxEditor = React.lazy(() => import( "./fieldEditor/SelectBoxEditor"));
const TextBoxEditor = React.lazy(() => import( "./fieldEditor/TextBoxEditor"));
const TextEditor = React.lazy(() => import( "./fieldEditor/TextEditor"));

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


  useEffect(()=>{

  
   dispatch(loadFieldsFromJson(f)) 
   
  },[])

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
        <Suspense fallback={<div>Loading ... </div>}>
     
    {(formBuilder?.fields[formBuilder.selectedField]?.type=="TextBox") && <TextBoxEditor key={Math.random()}  data={formBuilder?.fields[formBuilder.selectedField]}/> }
    {(formBuilder?.fields[formBuilder.selectedField]?.type=="SelectBox") && <SelectBoxEditor key={Math.random()} data={formBuilder?.fields[formBuilder.selectedField]} /> }
    {(formBuilder?.fields[formBuilder.selectedField]?.type=="CheckBox") && <CheckBoxEditor key={Math.random()} data={formBuilder?.fields[formBuilder.selectedField]} /> }
    {(formBuilder?.fields[formBuilder.selectedField]?.type=="CheckGroup" ) && <CheckGroupEditor key={Math.random()} data={formBuilder?.fields[formBuilder.selectedField]} /> }
    {(formBuilder?.fields[formBuilder.selectedField]?.type=="RadioGroup") && <RadioGroupEditor key={Math.random()} data={formBuilder?.fields[formBuilder.selectedField]} /> }
    {(formBuilder?.fields[formBuilder.selectedField]?.type=="Text") && <TextEditor key={Math.random()} data={formBuilder?.fields[formBuilder.selectedField]} /> }
    {(formBuilder?.fields[formBuilder.selectedField]?.type=="Html") && <HtmlEditor key={Math.random()} data={formBuilder?.fields[formBuilder.selectedField]} /> }
    {(formBuilder?.fields[formBuilder.selectedField]?.type=="HiddenInput") && <HiddenInputEditor key={Math.random()} data={formBuilder?.fields[formBuilder.selectedField]} /> }
    {(formBuilder?.fields[formBuilder.selectedField]?.type=="CTA") && <CTAEditor key={Math.random()} data={formBuilder?.fields[formBuilder.selectedField]} /> }
      
        </Suspense>
      </div>
    </div>
    </>
  )
}

export default FormBuilder