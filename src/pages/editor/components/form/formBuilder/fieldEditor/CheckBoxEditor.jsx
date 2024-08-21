import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateField } from '../../../../../../store/campaign/CampaignSlice'

import Modal from '../../../../../../components/ui/Modal'

import './Editor.scss'
import { fields } from './Fields'

import { FaPencilAlt } from "react-icons/fa";


const CheckBoxEditor = ({ id, data ,toast,handleFieldDataUpdate}) => {
    const [isModalOpened, setModalOpened] = useState(false)
    const [isLabelModalOpened, setLabelModalOpened] = useState(false)
    const [label, setLabel] = useState(data.label)
   
    const dispatch = useDispatch()

    const divRef = useRef()


    const handleSubmit = (e) => {
        e.preventDefault()
        const children = divRef.current.querySelectorAll('input , textarea')
        const state = { type: fields.CheckBox }
        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            if (child.type == "checkbox") {
                state[child.name] = child.checked
            } else if (child.type == "submit") {

            } else {
                state[child.name] = child.value
            }
        }
       // dispatch(updateField(state))
        handleFieldDataUpdate(id,state)
        console.log(state);
        toast.success('Field Updated')
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
                <span>Value</span>
                <input type="text" name="value" defaultValue={data.value} />

            </label>



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

export default CheckBoxEditor