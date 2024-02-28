import React, { useRef } from 'react'
import TextInput from '../../ui/editor/TextInput'
import SelectBox from '../../ui/editor/SelectBox'


import {getEDMHtml,getLandingHtml} from './PublishHelper.js'
import FormBuilder from '../../formBuilder/FormBuilder.jsx'


const TGIF = () => {
 const ref=   useRef()


 const handleSubmit=(e)=>{
 
    e.preventDefault()
    
    console.log(getEDMHtml(),getLandingHtml());
    var formData = new FormData(e.target);

    for (var [key, value] of formData.entries()) { 
    console.log(key, value);
   }
 }

  return (
    

    <>
    <div>TGIF</div>

    <form action="" onSubmit={handleSubmit}>


    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="color" />
    <input type="date" />
    <input type="radio" />
    <input type="checkbox" />
    <select name="" id="">
      <option value="e">ee</option>
    </select>
    <input type="file" />

    <textarea></textarea>
    <input type="submit" />
    </form>
    <FormBuilder/>
    </>
  )
}

export default TGIF