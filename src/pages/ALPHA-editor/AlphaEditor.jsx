import React, { useEffect, useRef,useState } from 'react'

import cheerio from "cheerio";
import axios from "axios";

import "./Editor.scss"

import "../../components/ui/editor/editorCommonCSS.scss"



import FormBuilder from '../../components/formBuilder/FormBuilder.jsx'
import Stepper from '../../components/ui/stepper/Stepper.jsx'
import Step from '../../components/ui/stepper/Step.jsx'



import { useDispatch,useSelector } from 'react-redux'

import JSZip from 'jszip'
import { saveAs } from 'file-saver';


import Modal from '../../components/ui/Modal.jsx'
import RichEditor from '../../components/editor/RichEditor.jsx'
import AssetPicker from '../../components/editor/AssetPicker.jsx'


import {ALPHAFormRenderer} from './FormRenderer.js'
import { editors } from '../../components/formBuilder/fieldEditor/Fields.jsx'
import PublishHelper from './PublishHelper.js'
import Preview from '../../components/editor/Preview.jsx'
import LanguageDropdownList from '../../components/ui/editor/LanguageDropdownList.jsx';


import FTPUploader from '../../components/editor/FTPUploader.jsx'


const AlphaEditor = () => {


  const formRef=useRef()
  const FTPUploaderRef=useRef()

  const [sameAsEDMTitle,setSameAsEDMTitle]=useState(true)
  const [sameAsEDMHeading,setSameAsEDMHeading]=useState(true)
  const [sameAsEDMTitleForThanksPage,setSameAsEDMTitleForThanksPage]=useState(true)
  const [sameAsEDMHeadingForThanksPage,setSameAsEDMHeadingForThanksPage]=useState(true)
  const [sameAsEDMAbstract,setSameAsEDMAbstract]=useState(true)
  const [sameAsEDMCTA,setSameAsEDMCTA]=useState(true)


  const [isOpened,setOpened]=useState(false)

  const frameRef=useRef()
  const formBuilder = useSelector(state => state.formBuilder)
  const campaign = useSelector(state => state.campaign)
 
  const dispatch=useDispatch()
  const edmAbstractRichEditorRef = useRef();

  const publishHelper=useRef(new PublishHelper())


  const updateData=()=>{
    const inputs=formRef.current.querySelectorAll("input:not([type='submit']) , select, textarea")

    // below code is to add privacy policy acording to region =====================
    if(inputs[4].options[inputs[4].selectedIndex].value == "EU"){
      inputs[5].value =  "<a href='https://itbusinessplus.com/eu-privacy/'>EU Data Protection Policy</a>"

    }else if(inputs[4].options[inputs[4].selectedIndex].value == "CASL"){
      inputs[5].value = "<a href='https://www.itbusinessplus.com/casl-privacy-policy/'>CASL Privacy Policy</a>"

    }else if(inputs[4].options[inputs[4].selectedIndex].value == "BOTH"){
      inputs[5].value ="<a href='https://www.itbusinessplus.com/privacy-policy/'>ITBP Privacy Policy</a> | <a href='https://www.itbusinessplus.com/casl-privacy-policy/'>CASL Privacy Policy</a>"

    }else{
      inputs[5].value ="<a href='https://itbusinessplus.com/privacy-policy/'>ITBP Privacy Policy</a>"
    }

    
    // ===========================================================================

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
     publishHelper.current.BASE_URL= (publishHelper.current["REGION"] == "EU")?"https://eu.itbusinessplus.com/whitepaper/" : "https://resource.itbusinessplus.com/whitepapers/"
  }


  const handleSubmit=(e)=>{
    e.preventDefault();
   // alert("Submit Call")

  // publishHelper.current.openPreview("landing")

   console.log(publishHelper);
  }





  const handleLinkNameChange=(e)=>{

    document.querySelector("[name='THUMBNAIL_NAME']").value=e.target.value+'.png'
   document.querySelector("[name='PDF']").value=e.target.value+'.pdf'
   document.querySelector("[name='MP4']").value=e.target.value+'.mp4'
    //document.querySelector("[name='MP4']").value=e.target.value
  }



  const handleCTAChange=(e)=>{

    document.querySelector("[name='THUMBNAIL_NAME']").value=e.target.value+".png"
    document.querySelector("[name='PDF']").value=e.target.value+".pdf"
    document.querySelector("[name='MP4']").value=e.target.value+".mp4"
  }



  const handleStepChange= async (step)=>{
    console.log("step",step);

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
     
      
      

      
        
        break;
      case 5:
   //alert("Publish Step")
      FTPUploaderRef.current.handleUpdateFiles()
        break;
    }
  }



  useEffect(()=>{
    Object.keys(editors).forEach(editor=>{
      if(!ALPHAFormRenderer[editor]){
        alert(`Form Renderer does not have key ${editor}.Please add it to form renderer`)
      }
    })
    //ALPHAFormRenderer
  },[])

  async function getAllVals(e){
console.log(e.target.value);
    const axiosResponse = await axios.request({
      method: "GET",
      url: `https://cors-anywhere.herokuapp.com/${e.target.value}`,
      headers: {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
      }
  })
// console.log(axiosResponse.data);
  const $ = cheerio.load(axiosResponse.data);

  edmAbstractRichEditorRef.current.updateHtml($('.col-sm-6').text())
  }

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

   <LanguageDropdownList/>

   <label>
      <span>Campaign Name</span>
      <input type="text" name="CAMP_NAME" placeholder='Paste Email Subject Line here' />
    </label>


   <label>
      <span>Camp Id</span>
      <input type="text" placeholder='e.g - 1234567' name="CAMP_ID" />
    </label>

    <label>
      <span>Link Name</span>
      <input type="text" name="LINK_NAME" placeholder='e.g - Alpha-LP-1234567-client-FY-Q-demo-1' onChange={handleLinkNameChange} />
    </label>

   
 
    <label style={{display:'none'}}>
      <span>Asset Type</span>
      <select  name="ASSET_TYPE" >
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
      <span>Region</span>
      <select  name="REGION" >
        <option value="">Select...</option>
        <option value="EU">EU</option>
        <option value="NON-EU">NON-EU</option>
        <option value="CASL">CASL</option>
        <option value="BOTH">Both ( NON-EU & CASL )</option>
      </select>
    </label>

    <input type="text" name="PRIVACY_POLICY" defaultValue='' hidden/>
       
    <label>
      <span>Sponsored By Text</span>
      <input type="text" defaultValue={'Sponsored By'} name="SPONSORED_BY_TEXT"  />
    </label>

    <label>
      <span>Sponsor Name</span>
      <input type="text" placeholder='e.g - SAP Conor, Microsft, etc.' name="SPONSOR_NAME"  />
    </label>

    <label>
      <span>Sponsor Link</span>
      <input type="text" name="SPONSOR_LINK"  placeholder='www.example.com (don`t add "https//:")'/>
    </label>

   </div>
   {/* Step 1 end */}
    
  </Step>

  <Step title="Content">
  {/* Step 2 */}
  <div id='contentContainer' >
    <div className='contentContainerInner' >
      <h4>EDM Page Content</h4>
      <label>
          <span>EDM Page Title</span>
          <input type="text" defaultValue={''} name="EDM_TITLE" />
      </label>

      <label>
          <span>EDM Page Headline</span>
      </label>
      <RichEditor   key={12112121} name="EDM_HEADING"/>

      <label>
        <span>EDM Abstract</span>
      </label>
      <RichEditor  key={1211212} name="EDM_ABSTRACT"/>

      <label>
        <span>EDM CTA</span>
        <input type="text" name="EDM_CTA" />
      </label>

    </div>

    <div className='contentContainerInner' >
    <h4>Landing Page Content</h4>
      <label>
        <span>Landing Page Title <small>(check if same as edm title)</small></span>
        <input type="checkbox" name="SAME_AS_EDM_TITLE" defaultChecked={sameAsEDMTitle} onChange={()=>{setSameAsEDMTitle(!sameAsEDMTitle)}}  />
        { !sameAsEDMTitle && <input type="text" name="LANDING_TITLE" />}
      </label>

      <label>
        <span>Landing Page Heading <small>(check if same as edm Heading)</small></span>
        <input type="checkbox" name="SAME_AS_EDM_HEADING" defaultChecked={sameAsEDMHeading} onChange={()=>{setSameAsEDMHeading(!sameAsEDMHeading)}}  />
      </label>
      { !sameAsEDMHeading &&   <RichEditor key={121121122} name="LANDING_HEADING"/>}

      {/* <label>
          <span>Landing Abstract</span>
      </label>
      <input type="checkbox" name="SAME_AS_EDM_ABSTRACT" defaultChecked={sameAsEDMAbstract} onChange={()=>{setSameAsEDMAbstract(!sameAsEDMAbstract)}} />
      { !sameAsEDMAbstract && <RichEditor key={1211212} name="LANDING_ABSTRACT"/>} */}
      <label>
        <span>Landing CTA <small>(check if same as edm CTA)</small></span>
        <input type="checkbox" name="SAME_AS_EDM_CTA" defaultChecked={sameAsEDMCTA} onChange={()=>{setSameAsEDMCTA(!sameAsEDMCTA)}} />
        { !sameAsEDMCTA && <input type="text" name="LANDING_CTA"  />}
      </label>
    </div>

    <div className='contentContainerInner' >
    <h4>Sendmail File Content</h4>

    <label>
        <span>Email Subject Line</span>
        <input type="text" name="EMAIL_SUBJECT_LINE" />
      </label>


    </div>

    <div className='contentContainerInner' >
    <h4>Thankyou Page Content</h4>
      <label>
        <span>Thankyou Page Title <small>(check if same as edm title)</small></span>
        <input type="checkbox" name="SAME_AS_EDM_TITLETY" defaultChecked={sameAsEDMTitleForThanksPage} onChange={()=>{setSameAsEDMTitleForThanksPage(!sameAsEDMTitleForThanksPage)}}  />
        { !sameAsEDMTitleForThanksPage && <input type="text" name="THANKYOU_TITLE" />}
      </label>

      <label>
        <span>Thankyou Page Heading <small>(check if same as edm heading)</small></span>
        <input type="checkbox" name="SAME_AS_EDM_HEADINGTY" defaultChecked={sameAsEDMHeadingForThanksPage} onChange={()=>{setSameAsEDMHeadingForThanksPage(!sameAsEDMHeadingForThanksPage)}}  />
      </label>
      { !sameAsEDMHeadingForThanksPage &&   <RichEditor key={1211222122} name="THANKYOU_HEADING"/>}

      <label>
        <span>Thankyou page CTA</span>
       <input type="text" name="THANKYOU_CTA" defaultValue={'View & Download'}  />
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
    
    <AssetPicker   publishHelper={publishHelper}/>
    {/* Step 4 end */}
  </Step>

  <Step title="Preview" >
    {/* Step 5 */}
    <Preview  publishHelper={publishHelper}/>
    {/* Step 5 end */}
  </Step>

  
  <Step title="Publish">
    {/* Step 6 */}
    <div className='uploaderOuter'>

      {/* <input type="submit" value="Submit" /> */}
    <br/>
   

    <FTPUploader ref={FTPUploaderRef} publishHelper={publishHelper}/>
    
    </div>

    {/* Step 6 end */}
  </Step>

</Stepper>
    
</form>

{/* {isOpened && <Modal setOpened={setOpened} title={"Title"}><div>hello</div></Modal>} */}

{/* <button className='openModal' onClick={()=>setOpened(true)}>Open Modal</button> */}

</div>
  
  )
}

export default AlphaEditor