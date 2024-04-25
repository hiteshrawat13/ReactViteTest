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


  const edmAbstractRichEditorRef = useRef();
  const landingAbstractRichEditorRef = useRef();


  const getData=()=>{
    const inputs=formRef.current.querySelectorAll("input:not([type='submit']) , select, textarea")

    const data={
      BASE_URL:"https://resource.itbusinesstoday.com/whitepapers/",
      YEAR:new Date().getFullYear().toString()
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
  // publishHelper.current.openPreview("landing")

   console.log(publishHelper);
  }


  const handlePreview= async(e)=>{
    e.preventDefault()
 
    publishHelper.current.setData(getData())
    publishHelper.current.generateZip(JSZip,saveAs)
  
  }



  const handleLinkNameChange=(e)=>{

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
        //alert("Publish Step")
      
        let uploadFiles=[]
        if( document.querySelector("[name='LOGO_FILE']").files[0]){
          uploadFiles.push({
            type:"file",
            name:document.querySelector("[name='LOGO_NAME']").value,
            file:document.querySelector("[name='LOGO_FILE']").files[0],
            progress:0
          })
        }

        if( document.querySelector("[name='THUMBNAIL_FILE']").files[0]){
          uploadFiles.push({
            type:"file",
            name:document.querySelector("[name='THUMBNAIL_NAME']").value,
            file:document.querySelector("[name='THUMBNAIL_FILE']").files[0],
            progress:0
          })
        }

        if( document.querySelector("[name='PDF_FILE']").files[0]){
          uploadFiles.push({
            type:"file",
            name:document.querySelector("[name='PDF']").value,
            file:document.querySelector("[name='PDF_FILE']").files[0],
            progress:0
          })
        }

        if( document.querySelector("[name='MP4_FILE']").files[0]){
          uploadFiles.push({
            type:"file",
            name:document.querySelector("[name='MP4']").value,
            file:document.querySelector("[name='MP4_FILE']").files[0],
            progress:0
          })
        }

        const templatefiles=await publishHelper.current.getFiles()
        templatefiles.forEach((file)=>{
          uploadFiles.push({
            type:"templateFile",
            name:file.name,
            data:file.data,
            progress:0
          })
        })

        setFilesToUpload(uploadFiles)
        break;
      case 5:
        break;
    }
  }










  const handlePublish= async (e)=>{
    e.preventDefault()

    if(publishHelper.current.tgif.LINK_NAME.trim().length==0){
      alert("Please fill link name")
      return;
    }
    try {
      

     

      console.log(publishHelper.current.tgif.LINK_NAME);
    
      axios.post('http://localhost:8888/upload_file', {
     //axios.post('https://itbusinessplus.net/template/raj/test/LBUpload.php', {
        files: await publishHelper.current.getFiles(),
       
       
      
       
        }, {
        
          headers: {
          
          },
        
        }
      ).then(data=>{
        console.log(data,"Complete");
      }).catch(err=>{
        console.log(err,"ERROR");
      })

    
    } catch (error) {
      console.log(error);
    }

 

  }



  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [uploadProgress, setUploadProgress] = useState("");
  const [sessionId, setSessionId] = useState( Math.random().toString(36).substr(2, 9))
  const [filesToUpload,setFilesToUpload]=useState([])
  const handleUpload= async (e)=>{
    e.preventDefault()
    if(publishHelper.current.tgif.LINK_NAME.trim().length==0){
      alert("Please fill link name")
      return;
    }

    function onConnect() {
          setIsConnected(true);
    }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
        function onFooEvent(value) {
          setFooEvents(previous => [...previous, value]);
        }
  
        function onUploadProgress(value) {
          console.log(value);
          // 1. Find the todo with the provided id
          const currentTodoIndex = filesToUpload.findIndex((file) => file.name === value.name);
          // 2. Mark the todo as complete
          const updatedTodo = {...filesToUpload[currentTodoIndex], progress :value.progress };
  
          // 3. Update the todo list with the updated todo
          setFilesToUpload( (previous)=>[
            ...previous.slice(0, currentTodoIndex),
            updatedTodo,
            ...previous.slice(currentTodoIndex + 1)])
        }
    
    socket.connect();
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);
    socket.on("uploadProgress",onUploadProgress)
    socket.emit('connectInit', sessionId);

    try {
      var bodyFormData = new FormData();
    //   const templateFiles=await publishHelper.current.getFiles()
      
    //   bodyFormData.append(`templateFiles`, JSON.stringify(templateFiles));

    bodyFormData.append('sessionId',sessionId);

 
  
  
    //  // bodyFormData.append('templateFiles',await publishHelper.current.getFiles());
    //   bodyFormData.append('files[]',document.querySelector("[name='THUMBNAIL_FILE']").files[0] || null);
    //   bodyFormData.append('files[]',document.querySelector("[name='PDF_FILE']").files[0] || null);

    let templateFiles=[]
    filesToUpload.forEach(file=>{
      if(file.type==="file"){
        bodyFormData.append('files[]',file.file,file.name);
      }else if(file.type==="templateFile"){

        
        templateFiles.push(file)
      }
    })

    bodyFormData.append(`templateFiles`, JSON.stringify(templateFiles) );
    
axios({
  method: "post",
  url: "http://localhost:8888/upload_file",
  data: bodyFormData,
  headers: { "Content-Type": "multipart/form-data" },
})
  .then(function (response) {
    //handle success
    console.log(response,"Complete");
  })
  .catch(function (err) {
    //handle error
    console.log(err,"ERROR");
  });




    
    } catch (error) {
      console.log(error);
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
  publishHelper.current.setData(getData()) 
  handleStepChange(step)
  }}>
  
  <Step title="Basic Info">
   {/* Step 1 */}
   <div className='holder'>
   <label>
      <span>Pixel Link</span>
      <input type="text" name="PIXEL_LINK" />
    </label>

    <label>
      <span>Link Name</span>
      <input type="text" name="LINK_NAME" onChange={handleLinkNameChange} />
    </label>

    <label>
      <span>Camp Id</span>
      <input type="text" name="CAMP_ID" />
    </label>
 
    <label>
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
      <span>Privacy Policy</span>
      <select  name="PRIVACY_POLICY"  >
        <option value="">Select...</option>
        <option value="https://itbusinesstoday.com/eu-data-protection/">EU</option>
        <option value="https://itbusinesstoday.com/us-privacy-policy/">NON-EU</option>
        <option value="https://itbusinesstoday.com/casl-policy/">CASL</option>
      </select>
    </label>

    <label>
      <span>Sponsored By Text</span>
      <input type="text" name="SPONSORED_BY_TEXT" defaultValue={"Sponsored By"}  />
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
          <input type="text" name="EDM_TITLE" />
      </label>


      <button onClick={(e)=>{
        e.preventDefault()
       
       edmAbstractRichEditorRef.current.updateHtml("#####")

        }}>Fetch</button>
      <label>
        <span>EDM Abstract</span>
       
      </label>
      <RichEditor ref={edmAbstractRichEditorRef} key={1211212}  name="EDM_ABSTRACT"/>
      <label>
        <span>EDM CTA</span>
        <input type="text" name="EDM_CTA" />
      </label>
    </div>

    <div style={{width:"100%"}}>
      <label>
        <span>Landing Page Title</span>
        <input type="checkbox" name="SAME_AS_EDM_TITLE" defaultChecked={sameAsEDMTitle} onChange={()=>{setSameAsEDMTitle(!sameAsEDMTitle)}}  />
        { !sameAsEDMTitle  && <input type="text" name="LANDING_TITLE" />}
      </label>
      <label>
          <span>Landing Abstract</span>
      </label>
      <input type="checkbox" name="SAME_AS_EDM_ABSTRACT" defaultChecked={sameAsEDMAbstract} onChange={()=>{setSameAsEDMAbstract(!sameAsEDMAbstract)}} />
      { !sameAsEDMAbstract && <RichEditor key={1211212}  name="LANDING_ABSTRACT"/>}
      <label>
        <span>Landing CTA</span>
        <input type="checkbox" name="SAME_AS_EDM_CTA" defaultChecked={sameAsEDMCTA} onChange={()=>{setSameAsEDMCTA(!sameAsEDMCTA)}} />
        { !sameAsEDMCTA && <input type="text" name="LANDING_CTA"  />}
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
    
    <AssetPicker/>
    {/* Step 4 end */}
  </Step>

  <Step title="Publish">
    {/* Step 5 */}
    <input type="submit" value="Submit" />
    <br/>
    <button onClick={handlePreview}>Preview</button>


     <div>
      {filesToUpload.map((file,i)=>{
        return <div key={i}> {file.name} <br/> {file.progress}</div>
      })}


     </div>


     <button onClick={handlePublish}>Publish File</button>

     <button onClick={handleUpload}>Upload Files</button>
        <div>Upload Progress : {uploadProgress}</div>

    {/* Step 5 end */}
  </Step>

  <Step title="Preview" >
    {/* Step 5 */}
    <Preview  publishHelper={publishHelper.current}/>
    {/* Step 5 end */}
  </Step>

</Stepper>
    
</form>

{isOpened && <Modal setOpened={setOpened} title={"My Modal"}><div>hello</div><div>hello</div><div>hello</div><div>hello</div><div>hello</div><div>hello</div></Modal>}

<button className='openModal' onClick={()=>setOpened(true)}>Open Modal</button>

</div>
  
  )
}

export default TGIF1STTouchEditor