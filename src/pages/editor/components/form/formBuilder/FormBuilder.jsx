import React, { Suspense, useEffect, useRef, useState } from 'react'
import './FormBuilder.scss'
import { addField, updateField, loadFieldsFromJson ,setFields} from '../../../../../store/campaign/CampaignSlice'
import { useDispatch, useSelector } from 'react-redux'
import FieldList from './FieldList'
import { fields, editors } from './fieldEditor/Fields'
 


const CTAEditor = React.lazy(() => import("./fieldEditor/CTAEditor"));
const CheckBoxEditor = React.lazy(() => import("./fieldEditor/CheckBoxEditor"));
const CheckGroupEditor = React.lazy(() => import("./fieldEditor/CheckGroupEditor"));
const HiddenInputEditor = React.lazy(() => import("./fieldEditor/HiddenInputEditor"));
const HtmlEditor = React.lazy(() => import("./fieldEditor/HtmlEditor"));
const RadioGroupEditor = React.lazy(() => import("./fieldEditor/RadioGroupEditor"));
const SelectBoxEditor = React.lazy(() => import("./fieldEditor/SelectBoxEditor"));
const TextBoxEditor = React.lazy(() => import("./fieldEditor/TextBoxEditor"));
const TextEditor = React.lazy(() => import("./fieldEditor/TextEditor"));


import { RiListRadio } from "react-icons/ri";
import { PiTextTBold } from "react-icons/pi";
import { GoSingleSelect } from "react-icons/go";
import { MdOutlineCheckBox } from "react-icons/md";

import { RiCheckboxMultipleLine } from "react-icons/ri";
import { LuText } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { ImDownload2 } from "react-icons/im";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdNumbers } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-responsive-modal'
import FormScripts from './formScripts/index'


 





const FormBuilder = (defaultFieldsJson) => {

  // below code is prevent user from accidental exit *****************************************

  window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault();

    // Display a confirmation dialog
    var confirmationMessage = 'Are you sure you want to leave?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  });

  // ********************************************************************************************



  const addFieldSelectBoxRef = useRef()

  const state = useSelector(state => state.campaignData.data)

  const formScriptsDropdownRef=useRef()

  const [selectedField, setSelectedField] = useState(-1)
  
  const [fieldPropsModalOpened,setFieldPropsModalOpened]=useState(false)
  const [addScriptModalShow,setAddScriptModalShow]=useState(false)
  const [loadJSONModalShow,setLoadJSONModalShow]=useState(false)
  const JSONTextareaRef=useRef()

  const dispatch = useDispatch()

 


  //API For FormScripts
  const API = { addField, updateField, loadFieldsFromJson ,setFields ,dispatch, state , fields}

  const applyFormScript=(ScriptTitle)=>{
   const script= FormScripts(API).list.find((item)=>{ return item.title == ScriptTitle})

   if(script){
   // script.script.run()
    console.log(script.script.run());
    alert("Script Added Successfully.")
    return true;
    
   }else{
    alert("No Script Found")
    return false;
   }
 }

  const handleAdd = (value) => {

    switch (value) {
      case fields.TextBox:
        dispatch(addField({ field: { label: "Text Box", type: fields.TextBox, isRequired:true } }))
        break
      case fields.SelectBox:
        dispatch(addField({ field: { label: "Select Box", type: fields.SelectBox, isRequired:true } }))
        break;
      case fields.CheckGroup:
        dispatch(addField({ field: { label: "Check Group", type: fields.CheckGroup, isRequired:true } }))
        break;
      case fields.RadioGroup:
        dispatch(addField({ field: { label: "Radio Group", type: fields.RadioGroup, isRequired:true } }))
        break;
      case fields.CheckBox:
        dispatch(addField({ field: { label: "Checkbox", type: fields.CheckBox, isRequired:true } }))
        break;
      case fields.Text:
        dispatch(addField({ field: { label: "Text", type: fields.Text } }))
        break;
      case fields.Html:
        dispatch(addField({ field: { label: "Html", type: fields.Html } }))
        break;
      case fields.HiddenInput:
        dispatch(addField({ field: { label: "Hidden Input", type: fields.HiddenInput } }))
        break;
      case fields.CTA:
        dispatch(addField({ field: { label: "Download Now", type: fields.CTA,id:"cta_button" } }))
        break;
      default:
        alert("Not Supported")
        break;
    }

  }



  const getIcon = (type, inputType = "text") => {
    //inputType => it is a text box only  input type like text, email, number

    const iconSize = 15

    let textBoxLogo = <PiTextTBold size={iconSize} />
    switch (inputType) {
      case "text": break;
      case "email": textBoxLogo = <MdOutlineAlternateEmail size={iconSize} />; break;
      case "number": textBoxLogo = <MdNumbers size={iconSize} />; break;
    }

    switch (type) {

      case "TextBox": return textBoxLogo;
      case "SelectBox": return <GoSingleSelect size={iconSize} />;
      case "CheckBox": return <MdOutlineCheckBox size={iconSize} />;
      case "CheckGroup": return <RiCheckboxMultipleLine size={iconSize} />;
      case "RadioGroup": return <RiListRadio />;
      case "Text": return <LuText size={iconSize} />;
      case "Html": return <FaCode size={iconSize} />;
      case "HiddenInput": return <FaEyeSlash size={iconSize} />;
      case "CTA": return <ImDownload2 size={iconSize} />;



    }
  }

  const handleLoadFromJson=( )=>{

    
     
    try{
      const json=JSONTextareaRef.current?.value
      dispatch(loadFieldsFromJson(JSON.parse(json)))
      alert(" form fields loaded.")
    }catch(error){
      console.log(error);
      
      alert("Error loading form fields.")
    }
   
  }


  const handleFieldDataUpdate = (id, state) => {
    dispatch(updateField({ fieldId: id, state: state }))
    setFieldPropsModalOpened(false)
  }


  const handleNameDataRecalculate=(e)=>{
    e.preventDefault()
   
    let counter=0;
    let updatedForm=[]
    state.form.forEach((field,i)=>{

      const inputs = ["TextBox", "SelectBox", "CheckBox", "CheckGroup","RadioGroup","HiddenInput"];
      if(inputs.includes(field.type) && field.name!="firstname"){
        updatedForm[i]={...field,name:`data[${counter}]`}
        counter++
      }else{
        updatedForm[i]={...field}
      }
        
    })

    console.log(updatedForm);
    
    dispatch(setFields(updatedForm))
  }


  useEffect(() => {

    //console.log("DEFAULT FIELDS", defaultFieldsJson.defaultFieldsJson );
    
    //dispatch(loadFieldsFromJson(defaultFieldsJson.defaultFieldsJson))

  }, [])

  return (
    <>
      <Toaster position="center" reverseOrder={false} />
      <div className="dropdown">
                    <button className="dropbtn" onClick={(e)=>e.preventDefault()}>+ Add Field</button>
                    <div className="dropdown-content">
                    {

                    Object.keys(fields).map((field, i) => {
                      return <div key={i} style={{
                        padding: "5px",
                        
                        cursor: "pointer",
                        display: "flex",
                        gap:"7px",
                        borderBottom:"1px solid #ededed",

                        
                        padding: "4px 10px"
                      }} onClick={(e) => {  handleAdd(field); toast.success(`${field} Field Inserted.`) }} 
                      > {getIcon(field)} {field} </div>
                       
                    })
                    }
                    </div>
                </div>
      {/* <span>Click to add field to the form</span>
      <br /><br />
      <div style={{ display: "flex", gap: "6px" }}>




        {
          Object.keys(fields).map((field, i) => {
            return <AddButton key={i}
              style={{
                padding: "5px",
                border: "1px solid gray",
                cursor: "pointer",
                display: "flex",
                gap: "5px",
                borderRadius: "40px",
                backgroundColor: "#c8d6e5",
                padding: "4px 10px"
              }}
              value={field} icon={getIcon(field)} onClick={() => { handleAdd(field) }} />
          })
        }

      </div> */}

      {/* <div>Form Builder {selectedField + 1}</div> */}

      {/* <button onClick={(e)=>{
      e.preventDefault()
      console.log(JSON.stringify(state.form));
      navigator.clipboard.writeText(JSON.stringify(state.form))
      } }>Log From Json</button> */}


<button id='loadFieldsBtn' onClick={(e)=>{
      e.preventDefault()
      try{
        dispatch(loadFieldsFromJson(defaultFieldsJson.defaultFieldsJson))
        alert("Default form fields loaded.")
      }catch(error){
        alert("Error loading form fields.")
      }
      
      } }>Load Default Fields</button>


      {/* Remove All Fields Button */}
      <button id='removeFieldsBtn' onClick={(e)=>{
      e.preventDefault()
   
      if (confirm("Remove all form fields?") == true) {
        try{
          dispatch(loadFieldsFromJson([]))
          alert("Fields removed.")
        }catch(error){
          alert("Error removing form fields.")
        }
      } else {
         
      }
      
      } }>Remove all Fields</button>


      {/* Rearrange Data Button */}
      <button id='recalculateBtn' onClick={handleNameDataRecalculate }>Rearange "data[]"</button>
      
      
      {/* Add Script Button */}
      <button id=' ' className="btn-option" onClick={(e)=>{e.preventDefault();setAddScriptModalShow(true)}}>Add Script</button>
      <Modal
        closeOnOverlayClick={false}
        center
        open={addScriptModalShow}
        onClose={() => setAddScriptModalShow(false)}>
        <div style={{ width: "400px" }}>
          <select ref={formScriptsDropdownRef}>
            {
              
              FormScripts(null).list?.map((script,i)=>{ return <option key={i}>{script.title}</option> })
            }
          </select>
          <button onClick={(e)=>{  
              e.preventDefault();
              if(applyFormScript(formScriptsDropdownRef.current.value)){ 
                setAddScriptModalShow(false) 
              }  
            }
          }>Add Script</button>
        </div>
      </Modal>


      {/* Copy JSON button */}
      <button id=' ' className="btn-option" onClick={(e)=>{
        e.preventDefault();



        try{
          if (navigator.clipboard) {
            navigator.clipboard.writeText(JSON.stringify(state.form))
            alert("Form JSON copied to clipboard [navigator]")
          } else {
            const input = document.createElement('textarea')
            input.value = JSON.stringify(state.form)
            document.body.appendChild(input)
            input.select()
            document.execCommand('copy')
            document.body.removeChild(input)
            alert("Form JSON copied to clipboard [exec]")
          }
        }catch(error){
          alert("Error copy form fields")
        }
     
         
        

 

      }}>Copy JSON</button>


      {/* Load JSON Button */}
      <button id=' ' className="btn-option" onClick={(e)=>{e.preventDefault();setLoadJSONModalShow(true)}}>Load JSON</button>
      <Modal
        closeOnOverlayClick={false}
        center
        open={loadJSONModalShow}
        onClose={() => setLoadJSONModalShow(false)}>
        <div style={{ width: "700px" }}>
          <textarea ref={JSONTextareaRef} style={{width:"600px",height:"400px",display:"block"}}>

          </textarea>
          
          <button onClick={(e)=>{  e.preventDefault();handleLoadFromJson()}}>Load JSON</button>
        </div>
      </Modal>
      <br /><br />
      <div className='formBuilder'>


        {/* Field List */}
        <FieldList getIcon={getIcon} 
        setSelectedField={setSelectedField} 
        selectedField={selectedField}
        onFieldSelect={()=>{setFieldPropsModalOpened(true)}} />




{state.form[selectedField] && <Suspense fallback={<div>Loading ... </div>}>

  
<Modal 
center
open={fieldPropsModalOpened}
onClose={() => setFieldPropsModalOpened(false)}>
  <div style={{width:"600px"}}>
    {(state.form[selectedField]?.type == "TextBox") && <TextBoxEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
    {(state.form[selectedField]?.type == "SelectBox") && <SelectBoxEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
    {(state.form[selectedField]?.type == "CheckBox") && <CheckBoxEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
    {(state.form[selectedField]?.type == "CheckGroup") && <CheckGroupEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
    {(state.form[selectedField]?.type == "RadioGroup") && <RadioGroupEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
    {(state.form[selectedField]?.type == "Text") && <TextEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
    {(state.form[selectedField]?.type == "Html") && <HtmlEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
    {(state.form[selectedField]?.type == "HiddenInput") && <HiddenInputEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
    {(state.form[selectedField]?.type == "CTA") && <CTAEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
  </div>


</Modal>  
</Suspense>
}

        {/* <div className="fieldEditor">
          <div className='fieldEditorHolder'>
            {(selectedField == -1 || !state.form[selectedField]?.type)
              &&
              <div className='editorFallback'><span>Field Properties<br></br>Select the form field to update filed properties.</span></div>}

            {state.form[selectedField] && <Suspense fallback={<div>Loading ... </div>}>

  
              <Modal 
              center
              open={fieldPropsModalOpened}
              onClose={() => setFieldPropsModalOpened(false)}>
                <div style={{width:"600px"}}>
                  {(state.form[selectedField]?.type == "TextBox") && <TextBoxEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
                  {(state.form[selectedField]?.type == "SelectBox") && <SelectBoxEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
                  {(state.form[selectedField]?.type == "CheckBox") && <CheckBoxEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
                  {(state.form[selectedField]?.type == "CheckGroup") && <CheckGroupEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
                  {(state.form[selectedField]?.type == "RadioGroup") && <RadioGroupEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
                  {(state.form[selectedField]?.type == "Text") && <TextEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
                  {(state.form[selectedField]?.type == "Html") && <HtmlEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
                  {(state.form[selectedField]?.type == "HiddenInput") && <HiddenInputEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
                  {(state.form[selectedField]?.type == "CTA") && <CTAEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
                </div>
             
          
              </Modal>  
            </Suspense>
            }
          </div>
        </div> */}

      </div>
    </>
  )
}


const AddButton = ({ value, icon, ...props }) => {
  return (<>
    <div {...props}
    >{value} {icon}</div>
  </>)
}

export default FormBuilder