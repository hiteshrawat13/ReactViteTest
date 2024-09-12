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

  const [selectedField, setSelectedField] = useState(-1)
  const dispatch = useDispatch()

  const handleAdd = (value) => {

    switch (value) {
      case fields.TextBox:
        dispatch(addField({ field: { label: "Text Box", type: fields.TextBox } }))
        break
      case fields.SelectBox:
        dispatch(addField({ field: { label: "Select Box", type: fields.SelectBox } }))
        break;
      case fields.CheckGroup:
        dispatch(addField({ field: { label: "Check Group", type: fields.CheckGroup } }))
        break;
      case fields.RadioGroup:
        dispatch(addField({ field: { label: "Radio Group", type: fields.RadioGroup } }))
        break;
      case fields.CheckBox:
        dispatch(addField({ field: { label: "Checkbox", type: fields.CheckBox } }))
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
        dispatch(addField({ field: { label: "Call To Action", type: fields.CTA } }))
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


  const handleFieldDataUpdate = (id, state) => {
    dispatch(updateField({ fieldId: id, state: state }))
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

    console.log("DEFAULT FIELDS",defaultFieldsJson.defaultFieldsJson);
    
    //dispatch(loadFieldsFromJson(defaultFieldsJson.defaultFieldsJson))

  }, [])

  return (
    <>
      <Toaster position="center" reverseOrder={false} />

      <span>Click to add filed to the form</span>
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

      </div>

      <div>Form Builder {selectedField + 1}</div>

      <button onClick={(e)=>{
      e.preventDefault()
      console.log(JSON.stringify(state.form));
      navigator.clipboard.writeText(JSON.stringify(state.form))
      } }>Log From Json</button>


<button onClick={handleNameDataRecalculate }>Recalculate name="data[]"</button>
      <div className='formBuilder'>

        <FieldList getIcon={getIcon} setSelectedField={setSelectedField} selectedField={selectedField} />



        <div className="fieldEditor">
          <div className='fieldEditorHolder'>
            {(selectedField == -1 || !state.form[selectedField]?.type)
              &&
              <div className='editorFallback'><span>Field Properties<br></br>Select the form field to update filed properties.</span></div>}

            {state.form[selectedField] && <Suspense fallback={<div>Loading ... </div>}>

              {(state.form[selectedField]?.type == "TextBox") && <TextBoxEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
              {(state.form[selectedField]?.type == "SelectBox") && <SelectBoxEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
              {(state.form[selectedField]?.type == "CheckBox") && <CheckBoxEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
              {(state.form[selectedField]?.type == "CheckGroup") && <CheckGroupEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
              {(state.form[selectedField]?.type == "RadioGroup") && <RadioGroupEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
              {(state.form[selectedField]?.type == "Text") && <TextEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
              {(state.form[selectedField]?.type == "Html") && <HtmlEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
              {(state.form[selectedField]?.type == "HiddenInput") && <HiddenInputEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
              {(state.form[selectedField]?.type == "CTA") && <CTAEditor key={Math.random()} data={state.form[selectedField]} toast={toast} handleFieldDataUpdate={handleFieldDataUpdate} id={selectedField} />}
            </Suspense>

            }
          </div>
        </div>

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