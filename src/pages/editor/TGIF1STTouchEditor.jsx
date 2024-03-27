import React, { useEffect, useRef,useState } from 'react'


import "./Editor.scss"





import FormBuilder from '../../components/formBuilder/FormBuilder.jsx'
import Stepper from '../../components/ui/stepper/Stepper.jsx'
import Step from '../../components/ui/stepper/Step.jsx'



import { useDispatch,useSelector } from 'react-redux'

import JSZip from 'jszip'
import { saveAs } from 'file-saver';


import Modal from '../../components/ui/Modal.jsx'
import RichEditor from './RichEditor.jsx'
import AssetPicker from './AssetPicker.jsx'


import {TGIFFormRenderer} from './FormRenderer.js'
import { editors } from '../../components/formBuilder/fieldEditor/Fields.jsx'
import PublishHelper from './PublishHelper.js'
import Preview from './Preview.jsx'





class PublishMe{
  constructor(data){
    this.data=data;
  }






}



const TGIF1STTouchEditor = () => {


  const formRef=useRef()
 

  const [sameAsEDMTitle,setSameAsEDMTitle]=useState(true)
  const [sameAsEDMAbstract,setSameAsEDMAbstract]=useState(true)
  const [sameAsEDMCTA,setSameAsEDMCTA]=useState(true)

  const [isOpened,setOpened]=useState(false)

  const frameRef=useRef()
  const formBuilder = useSelector(state => state.formBuilder)
  const campaign = useSelector(state => state.campaign)
 
  const dispatch=useDispatch()


  const publishHelper=useRef(new PublishHelper())


  const getData=()=>{
    const inputs=formRef.current.querySelectorAll("input:not([type='submit']) , select, textarea")

    const data={
      baseUrl:"https://resource.itbusinesstoday.com/whitepapers/",
      year:new Date().getFullYear().toString()
    }
     for (let i = 0; i < inputs.length; i++) {
     
      // console.log(inputs[i].name,inputs[i].value);
      if(inputs[i].name){
        if(inputs[i].type=="checkbox"){
          data[inputs[i].name]=inputs[i].checked
        }else{
          data[inputs[i].name]=inputs[i].value
        }
        
      }
     }
     data["form"]=formBuilder.fields

     return data;
  }


  const handleSubmit=(e)=>{
    e.preventDefault();
   // alert("Submit Call")

   


   publishHelper.current.setData(getData())
   publishHelper.current.openPreview("landing")

   console.log(publishHelper);
  }


  const handlePreview= async(e)=>{
    e.preventDefault()
 
    publishHelper.current.setData(getData())
    publishHelper.current.generateZip(JSZip,saveAs)
  
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



<Stepper onStepChange={()=>{
  publishHelper.current.setData(getData())
}}>
  
  <Step title="Basic Info">
    
   {/* Step 1 */}


   <div className='holder'>
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
      <select  name="privacyPolicy"  >
        <option value="">Select...</option>
        <option value="https://itbusinesstoday.com/eu-data-protection/">EU</option>
        <option value="https://itbusinesstoday.com/us-privacy-policy/">NON-EU</option>
        <option value="https://itbusinesstoday.com/casl-policy/">CASL</option>
      </select>
    </label>

    <label>
      <span>Sponsored By Text</span>
      <input type="text" name="sponsoredBy"  />
    </label>
   </div>
   
   {/* Step 1 end */}
    
  </Step>

  <Step title="Content">
  {/* Step 2 */}
  


  <div style={{display:"flex",justifyContent:"space-between",gap:"10px",backgroundColor:"#fff"}}>

    <div style={{width:"100%"}}>
      <label>
          <span>EDM Page Title</span>
          <input type="text" name="edmTitle" />
      </label>
      <label>
        <span>EDM Abstract</span>
       
      </label>
      <RichEditor key={1211212} name="edmAbstract"/>
      <label>
        <span>EDM CTA</span>
        <input type="text" name="edmCTA" />
      </label>
    </div>

    <div style={{width:"100%"}}>
      <label>
        <span>Landing Page Title</span>
        <input type="checkbox" name="sameAsEDMTitle" defaultChecked={sameAsEDMTitle} onChange={()=>{setSameAsEDMTitle(!sameAsEDMTitle)}}  />
        { !sameAsEDMTitle && <input type="text" name="landingTitle" />}
      </label>
      <label>
          <span>Landing Abstract</span>
          
      </label>
      <input type="checkbox" name="sameAsEDMAbstract" defaultChecked={sameAsEDMAbstract} onChange={()=>{setSameAsEDMAbstract(!sameAsEDMAbstract)}} />
      { !sameAsEDMAbstract && <RichEditor key={1211212} name="landingAbstract"/>}
      <label>
        <span>Landing CTA</span>
        <input type="checkbox" name="sameAsEDMCTA" defaultChecked={sameAsEDMCTA} onChange={()=>{setSameAsEDMCTA(!sameAsEDMCTA)}} />
        { !sameAsEDMCTA && <input type="text" name="landingCTA"  />}
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
   
    <label>
      <span>Logo</span>
      <input type="text" name="logo" /><br/>
      <input type="file" name="logofile"  />
    </label>
    <label>
      <span>Thumbnail</span>
      <input type="text" name="thumbnail"/><br/>
      <input type="file" name="thumbnailfile"  />
    </label>
   
    <AssetPicker/>
    {/* Step 4 end */}
  </Step>

  <Step title="Complete">
    {/* Step 5 */}
    <input type="submit" value="Submit" />
    <br/>
    <button onClick={handlePreview}>Preview</button>
    {/* Step 5 end */}
  </Step>

  <Step title="Preview">
    {/* Step 5 */}
    <Preview  publishHelper={publishHelper.current}/>
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