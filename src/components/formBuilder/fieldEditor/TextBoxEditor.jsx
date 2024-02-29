import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateField } from '../../../store/formBuilder/FormBuilderSlice'


import './Editor.scss'


const TextBoxEditor = () => {
const formBuilder = useSelector(state => state.formBuilder)
const dispatch=useDispatch()



    
const handleSubmit=(e)=>{

    e.preventDefault()


    const children= e.target.querySelectorAll('input')
    const state={type:"TextBox"}
    for (let i = 0; i < children.length; i++) {
       const child = children[i]
       
       if(child.type=="checkbox"){
        state[child.name]=child.checked
       }else{
        state[child.name]=child.value
       }
      
        
    }

    dispatch(updateField(state))
    console.log(state);

}


useEffect(()=>{

},[])

  return (
    <>
    <div>
        <form onSubmit={handleSubmit} className='editorForm'>

{JSON.stringify()}
            <label>
                <span>Id</span>
                <input type="text" name="id" defaultValue={formBuilder.fields[formBuilder.selectedField].id} />
            </label>

            <label>
                <span>Label</span>
                <input type="text" name="label" defaultValue={formBuilder.fields[formBuilder.selectedField].label}/>
            </label>

            <label>
                <span>Name</span>
                <input type="text" name="name" defaultValue={formBuilder.fields[formBuilder.selectedField].name} />
            </label>

            <label>
                <span>Placeholder</span>
                <input type="text" name="placeholder" defaultValue={formBuilder.fields[formBuilder.selectedField].placeholder} />
            </label>

            <label>
                <span>Value</span>
                <input type="text" name="value" defaultValue={formBuilder.fields[formBuilder.selectedField].value} />
            </label>

            <label>
                <span>Required?</span>
                <input type="checkbox" name="isRequired" defaultChecked={formBuilder.fields[formBuilder.selectedField].isRequired} />
            </label>

            <label>
                <span>Disabled?</span>
                <input type="checkbox" name="isDisabled" defaultChecked={formBuilder.fields[formBuilder.selectedField].isDisabled} />
            </label>

            <input type="submit" />
        </form>
    </div>
    </>
  )
}

export default TextBoxEditor