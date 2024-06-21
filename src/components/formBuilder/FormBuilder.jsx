import React, { Suspense, useEffect, useRef, useState } from 'react'
import './FormBuilder.scss'
import FormBuilderSlice, { addField, setSelectedField,loadFieldsFromJson } from '../../store/formBuilder/FormBuilderSlice'
import { useDispatch,useSelector } from 'react-redux'
import FieldList from './FieldList'
import { fields,editors } from './fieldEditor/Fields'



 import  f from '../../pages/TGIF-editor/default-fields.json'


const CTAEditor = React.lazy(() => import("./fieldEditor/CTAEditor"));
const CheckBoxEditor = React.lazy(() => import( "./fieldEditor/CheckBoxEditor"));
const CheckGroupEditor = React.lazy(() => import( "./fieldEditor/CheckGroupEditor"));
const HiddenInputEditor = React.lazy(() => import( "./fieldEditor/HiddenInputEditor"));
const HtmlEditor = React.lazy(() => import( "./fieldEditor/HtmlEditor"));
const RadioGroupEditor= React.lazy(() => import( "./fieldEditor/RadioGroupEditor"));
const SelectBoxEditor = React.lazy(() => import( "./fieldEditor/SelectBoxEditor"));
const TextBoxEditor = React.lazy(() => import( "./fieldEditor/TextBoxEditor"));
const TextEditor = React.lazy(() => import( "./fieldEditor/TextEditor"));


import { RiListRadio } from "react-icons/ri";
import { PiTextbox } from "react-icons/pi";
import { GoSingleSelect } from "react-icons/go";
import { MdOutlineCheckBox } from "react-icons/md";

import { RiCheckboxMultipleLine } from "react-icons/ri";
import { LuText } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { ImDownload2 } from "react-icons/im";


const FormBuilder = () => {

  // below code is prevent user from accidental exit *****************************************

  window.addEventListener('beforeunload', function(e) {
    // Cancel the event
    e.preventDefault();
   
    // Display a confirmation dialog
    var confirmationMessage = 'Are you sure you want to leave?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
});

  // ********************************************************************************************

  const addFieldSelectBoxRef=useRef()
  
  const formBuilder = useSelector(state => state.formBuilder)
 
  const dispatch=useDispatch()

  const handleAdd=(value)=>{
    
    switch(value){
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


  
  const getIcon=(type)=>{
    switch(type){
     
      case "TextBox": return <PiTextbox size={20} />;
      case "SelectBox": return <GoSingleSelect size={20} />;
      case "CheckBox": return <MdOutlineCheckBox size={20} />;
      case "CheckGroup": return <RiCheckboxMultipleLine size={20} />;
      case "RadioGroup": return <RiListRadio />;
      case "Text": return <LuText size={20} />;
      case "Html": return <FaCode size={20} />;
      case "HiddenInput": return <FaEyeSlash size={20} />;
      case "CTA": return <ImDownload2 size={20} />;
        


    }
  }


  useEffect(()=>{

  
   dispatch(loadFieldsFromJson(f)) 
   
  },[])

  return (
    <>
 

    <span>Click to add filed to the form</span>
    <div style={{display:"flex",gap:"6px"}}>

      


      {
      Object.keys(fields).map( (field,i)=>{
        return <AddButton key={i} 
        style={{padding:"5px", 
        border:"1px solid gray",
        cursor:"pointer",
        display:"flex",
        gap:"5px",
        borderRadius:"40px",
        backgroundColor:"#c8d6e5",
        padding:"4px 10px"}} 
        value={field} icon={getIcon(field)} onClick={()=>{handleAdd(field)}}/>
      })
    }

      

    </div>

    <div>Form Builder {formBuilder.selectedField+1}</div>
    <div className='formBuilder'>
    
      <FieldList getIcon={getIcon} />
 
      <div className="fieldEditor">

      {(!formBuilder?.fields[formBuilder.selectedField]?.type) 
      &&  
      <div className='editorFallback'><span>Field Properties<br></br>Select the form field to update filed properties.</span></div> }

        <Suspense fallback={<div>Loading ... </div>}>
     
    {(formBuilder?.fields[formBuilder.selectedField]?.type=="TextBox") && <TextBoxEditor key={Math.random()}  data={formBuilder?.fields[formBuilder.selectedField]}/>  }
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


const AddButton=({value,icon,...props})=>{
  return (<>
  <div {...props}
  >{value} {icon}</div>
  </>)
}

export default FormBuilder