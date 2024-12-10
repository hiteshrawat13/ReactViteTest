import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateField } from '../../../../../../store/campaign/CampaignSlice'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


import { fields } from './Fields'

import { FaPencilAlt } from "react-icons/fa";
import Jodit from './Jodit'


const CheckBoxEditor = ({ id, data ,toast,handleFieldDataUpdate}) => {
    const [isModalOpened,setModalOpened]=useState(false)
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


            {/* <label>
                <span>Label</span>
                <textarea name="label" value={label} onChange={(e) => { setLabel(e.target.value) }} />
            </label> */}
            
            <div className='field-holder'>
          <span>Label</span>
          <div className='field'>
          <textarea name="label" value={label} onChange={(e) => { setLabel(e.target.value) }} />
          <button className='pencil-button' onClick={(e) => { e.preventDefault(); setModalOpened(true) }}><FaPencilAlt /></button>
          </div>
        </div>

            <Modal 
center
open={isModalOpened} 
onClose={() =>setModalOpened(false)}>
 <div style={{width:"100%"}}>
                 <Jodit value={label} onChange={(e)=>{setLabel(e)}}/>
                    {/* <textarea type="text" name="label" value={label} onChange={(e) => { setLabel(e.target.value) }} style={{ width: "90%", height: "90%" }} />
                 */}

</div>
<button className='btn--primary' onClick={(e) =>{e.preventDefault(); setModalOpened(false) }}>Save</button>
            </Modal>
            <button className='openModal' onClick={(e) => { e.preventDefault(); setModalOpened(true) }}><FaPencilAlt /></button>

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