import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateField } from '../../../store/formBuilder/FormBuilderSlice'

import Modal from '../../ui/Modal'
import './Editor.scss'
import { fields } from './Fields'

import { FaPencilAlt } from "react-icons/fa";

const RadioGroupEditor = ({ data }) => {

    const [isLabelModalOpened, setLabelModalOpened] = useState(false)
    const [isOptionsModalOpened, setOptionsModalOpened] = useState(false)


    const [label, setLabel] = useState(data.label)
    const [options, setOptions] = useState(data.options)


    const formBuilder = useSelector(state => state.formBuilder)
    const dispatch = useDispatch()

    const divRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const children = divRef.current.querySelectorAll('input , textarea')
        const state = { type: fields.RadioGroup }
        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            if (child.type == "checkbox") {
                state[child.name] = child.checked
            } else if (child.type == "submit") {

            } else {
                state[child.name] = child.value
            }
        }
        dispatch(updateField(state))
        console.log(state);
    }




    return (

        <div ref={divRef} className='editorForm'>

            <label>
                <span>Id</span>
                <input type="text" name="id" defaultValue={data.id} />
            </label>

            <label>
                <span>Label</span>
                <textarea name="label" value={label} onChange={(e) => { setLabel(e.target.value) }} />
            </label>

            {<Modal setOpened={setLabelModalOpened} isOpened={isLabelModalOpened} title={"My Modal"} style={{ width: "90%", height: "90%" }}>

                <label style={{ width: "90%", height: "90%" }}>
                    <span>Label</span>
                    <textarea type="text" name="label" value={label} onChange={(e) => { setLabel(e.target.value) }} style={{ width: "90%", height: "90%" }} />
                </label>

            </Modal>}
            <button className='openModal' onClick={(e) => { e.preventDefault(); setLabelModalOpened(true) }}><FaPencilAlt /></button>

            <label>
                <span>Name</span>
                <input type="text" name="name" defaultValue={data.name} />
            </label>



            <label>
                <span>Options</span>
                <textarea name="options" value={options} onChange={(e) => { setOptions(e.target.value) }}></textarea>

            </label>


            {<Modal setOpened={setOptionsModalOpened} isOpened={isOptionsModalOpened} title={"My Modal"} style={{ width: "90%", height: "90%" }}>

                <label style={{ width: "90%", height: "90%" }}>
                    <span>Label</span>
                    <textarea type="text" name="options" value={options} onChange={(e) => { setOptions(e.target.value) }} style={{ width: "90%", height: "90%" }} />
                </label>

            </Modal>}
            <button className='openModal' onClick={(e) => { e.preventDefault(); setOptionsModalOpened(true) }}><FaPencilAlt /></button>

            <label>
                <span>Required?</span>
                <input type="checkbox" name="isRequired" defaultChecked={data.isRequired} />
            </label>

            <label>
                <span>Disabled?</span>
                <input type="checkbox" name="isDisabled" defaultChecked={data.isDisabled} />
            </label>

            <label>
                <span>ReadOnly?</span>
                <input type="checkbox" name="isReadOnly" defaultChecked={data.isReadOnly} />
            </label>



            <button onClick={handleSubmit}>Submit</button>
        </div>

    )
}

export default RadioGroupEditor