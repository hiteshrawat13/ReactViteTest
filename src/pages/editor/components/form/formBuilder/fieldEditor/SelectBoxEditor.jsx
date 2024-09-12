import React, { useEffect, useState,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateField } from '../../../../../../store/campaign/CampaignSlice'


import './Editor.scss'
import { fields } from './Fields'

//import Modal from '../../../../../../components/ui/Modal'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { FaPencilAlt } from "react-icons/fa";
import OptionList from '../../OptionList'

const SelectBoxEditor = ({ id,data,toast,handleFieldDataUpdate}) => {
    const [isLabelModalOpened, setLabelModalOpened] = useState(false)
    const [isOptionsModalOpened, setOptionsModalOpened] = useState(false)


    const [label, setLabel] = useState(data.label)
    const [options, setOptions] = useState(data.options)

const dispatch=useDispatch()

const divRef=useRef()

const textareaRef=useRef()

    
const handleSubmit=(e)=>{
    e.preventDefault()
    const children= divRef.current.querySelectorAll('input , textarea')
    const state={type:fields.SelectBox}
    for (let i = 0; i < children.length; i++) {
       const child = children[i]
       if(child.type=="checkbox"){
        state[child.name]=child.checked
       }else if(child.type=="submit"){
       
       }else{
            state[child.name]=child.value
       } 
    }
    state["options"]=options
    //dispatch(updateField(state))
    handleFieldDataUpdate(id,state)
    console.log(state);
    toast.success('Field Updated')
}


const handleRemoveTags=()=>{
   const strippedHtml= stripHtml(textareaRef.current.value)
   textareaRef.current.value=strippedHtml
}

function stripHtml(html)
{
   let tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
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

            {/* {<Modal setOpened={setLabelModalOpened} isOpened={isLabelModalOpened} title={"My Modal"} style={{ width: "90%", height: "90%" }}>

                <label style={{ width: "90%", height: "90%" }}>
                    <span>Label</span>
                    <textarea type="text" name="label" value={label} onChange={(e) => { setLabel(e.target.value) }} style={{ width: "90%", height: "90%" }} />
                </label>

            </Modal>} */}

<Modal open={isLabelModalOpened} onClose={() => setLabelModalOpened(false)}>
<label style={{ width: "90%", height: "90%" }}>
                    <span>Label</span>
                    <textarea type="text" name="label" value={label} onChange={(e) => { setLabel(e.target.value) }} style={{ width: "90%", height: "90%" }} />
                </label>
      </Modal>


            <button className='openModal' onClick={(e) => { e.preventDefault(); setLabelModalOpened(true) }}><FaPencilAlt /></button>


            <label>
                <span>Name</span>
                <input type="text" name="name" defaultValue={data.name} />
            </label>



            <label>
                <span>Options</span>
                
                
            </label>

{/* 
            {<Modal setOpened={setOptionsModalOpened} isOpened={isOptionsModalOpened} title={"My Modal"} style={{ width: "90%", height: "90%" }}>

               

                 <OptionList  setOptions={setOptions} options={options}/>

            </Modal>} */}


<Modal 
center
open={isOptionsModalOpened} 

onClose={() => setOptionsModalOpened(false)}>
<OptionList  setOptions={setOptions} options={options}/>
</Modal>
            
            <button className='openModal' onClick={(e) => { e.preventDefault(); setOptionsModalOpened(true) }}>{options?.length} options <FaPencilAlt /></button>


          


            <label>
                <span>Full Width?</span>
                <input type="checkbox" name="isFullWidth" defaultChecked={data.isFullWidth} />
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

export default SelectBoxEditor