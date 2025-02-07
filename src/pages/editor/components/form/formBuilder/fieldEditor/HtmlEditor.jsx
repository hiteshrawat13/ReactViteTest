import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateField } from '../../../../../../store/campaign/CampaignSlice'

import { FaPencilAlt } from "react-icons/fa";

import './Editor.scss'
import { fields } from './Fields'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

const HtmlEditor = ({ id, data, toast, handleFieldDataUpdate }) => {


  const [html, setHtml] = useState(data.html)

  const [isModalOpened, setModalOpened] = useState(false)

  const dispatch = useDispatch()

  const divRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const children = divRef.current.querySelectorAll('input , textarea')
    const state = { type: fields.Html }
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (child.type == "checkbox") {
        state[child.name] = child.checked
      } else if (child.type == "submit") {

      } else {
        state[child.name] = child.value
      }
    }



    //dispatch(updateField(state))
    handleFieldDataUpdate(id, state)
    console.log(state);
    toast.success('Field Updated')
  }




  return (

    <div ref={divRef} className='editorForm'>

      <div className='field-holder'>
        <span>Label</span>
        <input type="text" name="label" defaultValue={data.label} />
      </div>

      {/* <label>
                <span>Html</span>
                <textarea name="html" onChange={(e)=>{setHtml(e.target.value)}} value={html}></textarea>
              
            </label> */}


      <div className='field-holder'>
        <span>Html</span>
        <div className='field'>
          {/* <input type="text" name="html" onChange={(e) => { setHtml(e.target.value) }} value={html} /> */}
          <textarea name="html" onChange={(e) => { setHtml(e.target.value) }} value={html} ></textarea>
          <button className='pencil-button' onClick={(e) => { e.preventDefault(); setModalOpened(true) }}><FaPencilAlt /></button>
        </div>
      </div>





      <Modal
        center
        open={isModalOpened}
        onClose={() => setModalOpened(false)}>
        <label style={{ width: "90%", height: "90%" }}>

          {/* <textarea  name="html" value={html} onChange={(e)=>{setHtml(e.target.value)}} style={{width:"500px",height:"500px",padding:"10px"}}></textarea>
                   */}


          <CodeMirror
            value={html}
            height="500px"
            width='650px'
            extensions={[langs.html()]}
            onChange={(val) => {
              setHtml(val)
            }}
            theme={vscodeDark}
          />;

        </label>
      </Modal>

      {/* <button className='openModal' onClick={(e)=>{e.preventDefault();setModalOpened(true)} }><FaPencilAlt /></button>
    
     */}


      <button onClick={handleSubmit}>Submit</button>
    </div>

  )
}

export default HtmlEditor