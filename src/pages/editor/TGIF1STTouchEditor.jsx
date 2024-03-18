import React, { useRef,useState } from 'react'


import "./Editor.scss"





import FormBuilder from '../../components/formBuilder/FormBuilder.jsx'
import Stepper from '../../components/ui/stepper/Stepper.jsx'
import Step from '../../components/ui/stepper/Step.jsx'



import { useDispatch,useSelector } from 'react-redux'


import Publish from './Publish.js'
import Modal from '../../components/ui/Modal.jsx'

const TGIF1STTouchEditor = () => {

  const [isOpened,setOpened]=useState(false)

  const frameRef=useRef()
  const formBuilder = useSelector(state => state.formBuilder)
 
  const dispatch=useDispatch()

  const onSubmit = (data) =>{
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEESUBMIT");
    alert(data)

    console.log("DATA",data);
  }


  const handleSubmit=(e)=>{
    e.preventDefault();
   // alert("Submit Call")

   const inputs=e.target.querySelectorAll("input:not([type='submit']) , select, textarea")
   for (let i = 0; i < inputs.length; i++) {
   
    console.log(inputs[i].name,inputs[i].value);
   }

   console.log(formBuilder.fields);
   
  }


  const handlePreview= async(e)=>{
    e.preventDefault()
   const dd= Publish
   console.log(dd.preview());

   try {
    const res= await fetch("tgif/template_files/landing.t")
    const data=await res.text()

    dd.setr("ererr")
    dd.preview()


  
   
   } catch (error) {
      console.log(error);
   }
  
  }

  function loadTemplate(){

  }


  return (
  

    <div className='Editor'>

    


<form action="" onSubmit={handleSubmit}>



<Stepper>
  
  <Step title="Basic Info">
    
   {/* Step 1 */}
   <label>
      <span>Pixel Link</span>
      <input type="text" name="pixelLink" />
      
    </label>

    <label>
      <span>Link Name</span>
      <input type="text" name="linkName"/>
      
    </label>

    <label>
      <span>Camp Id</span>
      <input type="text" name="campId" />
    </label>
 


    <label>
      <span>Asset Type</span>
      <select  name="assetType" >
        <option value="">Select...</option>
        <option value="White Paper">White Paper</option>
        <option value="Buyers/Comparision Guide">Buyers/Comparision Guide</option>
        <option value="E Book">E Book</option>
        <option value="Case Study">Case Study</option>
        <option value="Report">Report</option>
        <option value="Webinar OnDemand">Webinar OnDemand</option>
        <option value="Infographic">Infographic</option>
      </select>
     
    </label>

    <label>
      <span>Privacy Policy</span>
      <input type="text" name="privacyPolicy" />
    </label>

    <label>
      <span>Sponsored By Text</span>
      <input type="text" name="sponsoredBy"  />
    </label>

   {/* Step 1 end */}
    
  </Step>

  <Step title="Content">
  {/* Step 2 */}

  <label>
      <span>EDM Page Title</span>
      <input type="text" name="edmTitle" />
  </label>

    <label>
      <span>EDM Page Abstract</span>
   
     <textarea  name="edmAbstract"></textarea>
    </label>


    <label>
      <span>Landing Page Title</span>
      <input type="text" name="landingTitle" />
    
    </label>

    <label>
      <span>Landing Page Abstract</span>
      
      <textarea name="landingAbstract" ></textarea>
     
    </label>

    <label>
      <span>EDM CTA</span>
      <input type="text" name="edmCTA" />
      
    </label>


    <label>
      <span>Landing CTA</span>
      <input type="text" name="landingCTA"  />
      
    </label>
  {/* Step 2 end*/}
  </Step>

  <Step title="Assets & Logo">
  {/* Step 3 */}

  <label>
      <span>Logo</span>
      <input type="text" name="logo" /><br/>
      
      <input type="file" name="pdf"  />
    </label>
    <label>
      <span>Thumbnail</span>
      <input type="text" name="thumbnail"/><br/>
      <input type="file" name="pdf"  />
    </label>
    <hr/>
    <label>
      <span>Asset Type</span>
      <select   name="asset" >
      <option value="">Select...</option>
        <option value="PDF">PDF</option>
        <option value="MP4">MP4</option>
        <option value="Client Link">Client Link</option>
        <option value="IFRAME Html">IFRAME Html</option>
      </select>
     
    </label>

    

    <label>
      <span>Asset PDF</span>
      <input type="text" /><br/>
      <input type="file" name="pdf" />
    </label>

    <label>
      <span>MP4</span>
      <input type="text"/><br/>
      <input type="file" name="mp4" />
    </label>

    <label>
      <span>Client Link</span>
      <input type="text" name="clientLink" />
    </label>

    <label>
      <span>Iframe Html</span>
      <input type="text" name="iframeHtml" />
    </label>

  {/* Step 3 end */}
  </Step>

  <Step title="Form">
    {/* Step 4 */}
    <FormBuilder/>
    {/* Step 4 end */}
  </Step>

  <Step title="Finish">
    {/* Step 5 */}
    <input type="submit" value="Submit" />
    <br/>
    <button onClick={handlePreview}>Preview</button>
    {/* Step 5 end */}
  </Step>

</Stepper>
    
</form>



{isOpened && <Modal setOpened={setOpened} title={"Title"}><div>hello</div></Modal>}



<button className='openModal' onClick={()=>setOpened(true)}>Open Modal</button>


</div>
  
  )
}

export default TGIF1STTouchEditor