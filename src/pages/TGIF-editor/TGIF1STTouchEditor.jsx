import React, { useEffect, useRef,useState } from 'react'


import "./Editor.scss"





import FormBuilder from '../../components/formBuilder/FormBuilder.jsx'
import Stepper from '../../components/ui/stepper/Stepper.jsx'
import Step from '../../components/ui/stepper/Step.jsx'



import { useDispatch,useSelector } from 'react-redux'

import JSZip from 'jszip'
import { saveAs } from 'file-saver';


import Modal from '../../components/ui/Modal.jsx'
import RichEditor from '../../components/editor/RichEditor.jsx'
import AssetPicker from '../../components/editor/AssetPicker.jsx'


import {TGIFFormRenderer} from './FormRenderer.js'
import { editors } from '../../components/formBuilder/fieldEditor/Fields.jsx'
import PublishHelper from './PublishHelper.js'
import Preview from '../../components/editor/Preview.jsx'


import axios from 'axios'


import { socket } from '../../socket.js'
import FTPUploader from '../../components/editor/FTPUploader.jsx'





const TGIF1STTouchEditor = () => {


  const formRef=useRef()

  const FTPUploaderRef=useRef()
  const PreviewRef=useRef()
 

  const [sameAsEDMTitle,setSameAsEDMTitle]=useState(true)
  const [sameAsEDMAbstract,setSameAsEDMAbstract]=useState(true)
  const [sameAsEDMCTA,setSameAsEDMCTA]=useState(true)
  const [newLandingPageFormat,setNewLandingPageFormat]=useState(true)

  const [isOpened,setOpened]=useState(false)

  const frameRef=useRef()
  const formBuilder = useSelector(state => state.formBuilder)
  const campaign = useSelector(state => state.campaign)
 
  const dispatch=useDispatch()


  const publishHelper=useRef(new PublishHelper())


  const edmAbstractRichEditorRef = useRef();
  const landingAbstractRichEditorRef = useRef();


  const updateData=()=>{
    const inputs=formRef.current.querySelectorAll("input:not([type='submit']) , select, textarea")
     for (let i = 0; i < inputs.length; i++) {
      // console.log(inputs[i].name,inputs[i].value);
      if(inputs[i].name){
        if(inputs[i].type=="checkbox"){
          publishHelper.current[inputs[i].name]=inputs[i].checked
        }else{
          publishHelper.current[inputs[i].name]=inputs[i].value
        }
      }
     }
     publishHelper.current["form"]=formBuilder.fields
  }


  const validateData=()=>{
    let errors=[]
    const inputs=formRef.current.querySelectorAll("input:not([type='submit']) , select, textarea")
    for (let i = 0; i < inputs.length; i++) {
     // console.log(inputs[i].name,inputs[i].value);
      if(inputs[i].hasAttribute('required') &&  inputs[i].value==='' ){
        errors.push(inputs[i].name)
      }
    }

    console.log(errors.map(err=>err+ " is required").join("\n"));

    alert(errors.map(err=>err+ " is required").join("\n"))
  }


  const handleSubmit=(e)=>{
    e.preventDefault();
   console.log(publishHelper);
  }


  const handlePreview= async(e)=>{
    e.preventDefault()
 

    publishHelper.current.generateZip(JSZip,saveAs)
  
  }



  const handleLinkNameChange=(e)=>{

    document.querySelector("[name='THUMBNAIL_NAME']").value=e.target.value+".png"
    document.querySelector("[name='PDF']").value=e.target.value+".pdf"
    document.querySelector("[name='MP4']").value=e.target.value+".mp4"
  }

  const handleCTAChange=(e)=>{

    document.querySelector("[name='THUMBNAIL_NAME']").value=e.target.value+".png"
    document.querySelector("[name='PDF']").value=e.target.value+".pdf"
    document.querySelector("[name='MP4']").value=e.target.value+".mp4"
  }



  const handleStepChange= async (step)=>{
    console.log("step",step);
    validateData()
    switch(step){
      case 0:
        
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
     
      
      PreviewRef.current.handleUpdatePreviewButtons()

      
        
        break;
      case 5:
   //alert("Publish Step")
      FTPUploaderRef.current.handleUpdateFiles()
        break;
    }
  }






  useEffect(()=>{
    Object.keys(editors).forEach(editor=>{
      if(!TGIFFormRenderer[editor]){
        alert(`Form Renderer does not have key ${editor}.Please add it to form renderer`)
      }
    })
    //TGIFFormRenderer
  },[])










  return (
<div className='Editor'>
<form  onSubmit={handleSubmit} ref={formRef}>



<Stepper onStepChange={(step)=>{ 
  updateData()
  handleStepChange(step)
  }}>
  
  <Step title="Basic Info">
   {/* Step 1 */}
   <div className='holder'>

   <label>
      <span>Language</span>
      <select  name="LANGUAGE" required>
        
        <option value="en-us">en-us</option>
       
      </select>
    </label>



   <label>
      <span>Pixel Link</span>
      <input type="text" name="PIXEL_LINK" required/>
    </label>




    <label>
      <span>Campaign Name</span>
      <input type="text" name="CAMP_NAME" required placeholder='Paste Email Subject Line here' />
    </label>


    <label>
      <span>Camp Id</span>
      <input type="text" name="CAMP_ID" required />
    </label>


    <label>
      <span>Link Name</span>
      <input type="text" name="LINK_NAME" required onChange={handleLinkNameChange} />
    </label>


    <label>
      <span>Region</span>
      <select  name="REGION"  required>
        <option value="">Select...</option>
        <option value="EU">EU</option>
        <option value="NON-EU">NON-EU</option>
        <option value="CASL">CASL</option>
        <option value="BOTH">Both ( NON-EU & CASL )</option>
      </select>
    </label>

    <input type="text" name="PRIVACY_POLICY" defaultValue='' hidden/>
       
 
    <label>
      <span>Asset Type</span>
      <select  name="ASSET_TYPE" required>
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
      <span>Sponsored By Text</span>
      <input type="text" name="SPONSORED_BY_TEXT" required defaultValue={"Sponsored By"}  />
    </label>

    <label>
      <span>Logo width</span>
      <input type="number" name="LOGO_WIDTH" required defaultValue={200}  />
    </label>
   </div>
   {/* Step 1 end */}
    
  </Step>

  <Step title="Content">
  {/* Step 2 */}
  <div id='contentContainer' >
    <div className='contentContainerInner'>
    <h4>EDM Page Content</h4>
      <label>
          <span>EDM Page Title</span>
          <input type="text" name="EDM_TITLE" required />
      </label>

{/* 
      <button onClick={(e)=>{
        e.preventDefault()
        console.log(edmAbstractRichEditorRef.current,"REFEREnce|");
        edmAbstractRichEditorRef.current.updateHtml("#####")

        }}>Fetch</button> */}
      <label>
        <span>EDM Abstract</span>
       
      </label>
      <RichEditor ref={edmAbstractRichEditorRef} key={1211212}  name="EDM_ABSTRACT" required/>
      <label>
        <span>EDM CTA</span>
        <input type="text" name="EDM_CTA" required defaultValue={"Download Now"}/>
      </label>
    </div>

    <div className='contentContainerInner' >
    <h4>Landing Page Content</h4>
      <label>
        <span>Landing Page Title</span>
        <label><input type="checkbox" name="SAME_AS_EDM_TITLE" defaultChecked={sameAsEDMTitle} onChange={()=>{setSameAsEDMTitle(!sameAsEDMTitle)}}  />Same as EDM Title</label>
        { !sameAsEDMTitle  && <input type="text" name="LANDING_TITLE" />}
      </label>
      <label> <span>Landing Abstract</span></label>
      <label><input type="checkbox" name="SAME_AS_EDM_ABSTRACT" defaultChecked={sameAsEDMAbstract} onChange={()=>{setSameAsEDMAbstract(!sameAsEDMAbstract)}} />Same as EDM Abstract</label>
      { !sameAsEDMAbstract && <RichEditor key={1211212}  name="LANDING_ABSTRACT"/>}
      {/* <label>
        <span>Landing CTA</span>
        <label><input type="checkbox" name="SAME_AS_EDM_CTA" defaultChecked={sameAsEDMCTA} onChange={()=>{setSameAsEDMCTA(!sameAsEDMCTA)}} />Same as EDM CTA</label>
        { !sameAsEDMCTA && <input type="text" name="LANDING_CTA"  />}
      </label> */}

      <label>
        
        <label><input type="checkbox" name="NEW_LANDING_PAGE_FORMAT" defaultChecked={newLandingPageFormat} onChange={()=>{setNewLandingPageFormat(!newLandingPageFormat)}} />New Landing Page Format</label>
        { newLandingPageFormat && <><label>BOX TEXT<input type="text" name="NEW_LANDING_PAGE_FORMAT_BOX_TEXT"  defaultValue={"Please fill this form to get immediate access to this exclusive resource."} /> </label></>}
      </label>

    </div>
  </div>
  {/* Step 2 end*/}
  </Step>

  <Step title="Form">
  {/* Step 3 */}
    <FormBuilder/>
  {/* Step 3 end */}
  </Step>

  <Step title="Assets & Logo">
    {/* Step 4 */}
    <AssetPicker publishHelper={publishHelper}/>
    {/* Step 4 end */}
  </Step>

  <Step title="Preview" >
    {/* Step 5 */}
    <Preview  ref={PreviewRef} publishHelper={publishHelper.current}/>
    {/* Step 5 end */}
  </Step>

  <Step title="Publish">
    {/* Step 5 */}

    <div className='uploaderOuter'>
     <FTPUploader ref={FTPUploaderRef} publishHelper={publishHelper}/>
    </div>
    {/* Step 5 end */}
  </Step>



</Stepper>
    
</form>
{/* 
{isOpened && <Modal setOpened={setOpened} title={"My Modal"}><div>hello</div><div>hello</div><div>hello</div><div>hello</div><div>hello</div><div>hello</div></Modal>}

<button className='openModal' onClick={()=>setOpened(true)}>Open Modal</button> */}

</div>
  
  )
}

export default TGIF1STTouchEditor