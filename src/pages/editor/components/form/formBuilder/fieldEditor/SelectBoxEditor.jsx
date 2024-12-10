import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateField } from '../../../../../../store/campaign/CampaignSlice'


import './Editor.scss'
import { fields } from './Fields'

//import Modal from '../../../../../../components/ui/Modal'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { FaPencilAlt } from "react-icons/fa";
import OptionList from '../../OptionList'
import Jodit from './Jodit'
const SelectBoxEditor = ({ id, data, toast, handleFieldDataUpdate }) => {
    const [isLabelModalOpened, setLabelModalOpened] = useState(false)
    const [isOptionsModalOpened, setOptionsModalOpened] = useState(false)
    const [label, setLabel] = useState(data.label)
    const [options, setOptions] = useState(data.options)

    const dispatch = useDispatch()

    const divRef = useRef()

    const textareaRef = useRef()


    const handleSubmit = (e) => {
        e.preventDefault()
        const children = divRef.current.querySelectorAll('input , textarea')
        const state = { type: fields.SelectBox }
        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            if (child.type == "checkbox") {
                state[child.name] = child.checked
            } else if (child.type == "submit") {

            } else {
                state[child.name] = child.value
            }
        }
        state["options"] = options
        //dispatch(updateField(state))
        handleFieldDataUpdate(id, state)
        console.log(state);
        toast.success('Field Updated')
    }


    const handleRemoveTags = () => {
        const strippedHtml = stripHtml(textareaRef.current.value)
        textareaRef.current.value = strippedHtml
    }

    function stripHtml(html) {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }


    return (

        <div ref={divRef} className='editorForm'>



            <div className='field-holder'>
                <span>Id</span>
                <input type="text" name="id" defaultValue={data.id} />
            </div>

            {/* <div className='field-holder'>
                <span>Label</span>
                <textarea name="label" value={label} onChange={(e) => { setLabel(e.target.value) }} />

            </div> */}

            <div className='field-holder'>
          <span>Label</span>
          <div className='field'>
          <input type="text" name="label" onChange={(e) => { setLabel(e.target.value) }} value={label} />
          <button className='pencil-button' onClick={(e) => { e.preventDefault(); setLabelModalOpened(true) }}><FaPencilAlt /></button>
          </div>
        </div>

            {/* {<Modal setOpened={setLabelModalOpened} isOpened={isLabelModalOpened} title={"My Modal"} style={{ width: "90%", height: "90%" }}>

                <label style={{ width: "90%", height: "90%" }}>
                    <span>Label</span>
                    <textarea type="text" name="label" value={label} onChange={(e) => { setLabel(e.target.value) }} style={{ width: "90%", height: "90%" }} />
                </div>

            </Modal>} */}

<Modal
          center
          open={isLabelModalOpened}
          onClose={() => setLabelModalOpened(false)}>
          <label style={{ width: "90%", height: "90%" }}>
            <Jodit value={label} onChange={(e) => { setLabel(e) }} />
          </label>
          <div style={{ display: "flex", justifyContent: "center", padding: "3px 20px" }}><button className='btn--primary' style={{ width: "100%" }} onClick={() => setLabelModalOpened(false)}>Save</button></div>
        </Modal>

            {/* <Modal open={isLabelModalOpened} onClose={() => setLabelModalOpened(false)}>
                <div style={{ width: "90%", height: "90%" }}>
                    <span>Label</span>
                    <textarea type="text" name="label" value={label} onChange={(e) => { setLabel(e.target.value) }} style={{ width: "90%", height: "90%" }} />
                </div>
            </Modal> */}


            {/* <button className='openModal' onClick={(e) => { e.preventDefault(); setLabelModalOpened(true) }}><FaPencilAlt /></button> */}


            <div className='field-holder'>
                <span>Name</span>
                <input type="text" name="name" defaultValue={data.name} />
            </div>


            <div className='field-holder'>
                <span>Placeholder</span>
                <input type="text" name="placeholder" defaultValue={data.placeholder} />
               
            </div>

            <div className='field-holder'>
                <div className='field'>
          
                <button className=' ' onClick={(e) => { e.preventDefault(); setOptionsModalOpened(true) }}>{options?.length} options  <FaPencilAlt /></button>
                </div>
            </div>


            <Modal
                center
                open={isOptionsModalOpened}
                onClose={() => setOptionsModalOpened(false)}>
                <OptionList setOptions={setOptions} options={options} />
                <div style={{display:"flex",justifyContent:"center",padding:"3px 20px"}}><button className='btn--primary' style={{width:"100%"}} onClick={()=>setOptionsModalOpened(false)}>Save</button></div>
            </Modal>

           





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

export default SelectBoxEditor