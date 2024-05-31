import React, { useRef, useState } from 'react'


import './AssetPicker.scss'

import { FaFilePdf } from "react-icons/fa";
import { BsFiletypeMp4 } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { PiFrameCornersThin } from "react-icons/pi";

import axios from 'axios'
import { useEffect } from 'react';

import { socket } from '../../socket';






const AssetPicker = ({publishHelper}) => {

  const [sessionId, setSessionId] = useState( Math.random().toString(36).substr(2, 9))

 
    const [selected,setSelected]=useState("")

    const [foundLogos,setFoundLogos]=useState([])

    const pdfRef=useRef()

    const progressRef=useRef()



    

    const handleSelect=(e)=>{
        console.log(e.target.dataset.val);
        setSelected(e.target.dataset.val)

        console.log( document.querySelector("[name='ASSET_FORMAT']").checked);
       
    }

    const handleDrop = (event,target_name) => {
      event.preventDefault();
      const droppedFiles = event.dataTransfer.files;
      if (droppedFiles.length > 0) {
        //const newFiles = Array.from(droppedFiles);
       // console.log(newFiles);
        //setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        document.querySelector(`[name="${target_name}"]`).files=droppedFiles
        const eq =  new Event('change', { bubbles: true });
  
        document.querySelector(`[name="${target_name}"]`).dispatchEvent(eq);
      }
    };



   

    
  const handleLogoSearch=(e)=>{

    if(e.target.value.length==0){
      document.querySelector(".logoList").style.display="none";
      document.querySelector(`[name="LOGO_FILE"]`).value=""
      document.querySelector("#LOGO_PREVIEW").src=""
      return;
    }
    try {

      const search_query=e.target.value;
      const formData = new FormData();
      formData.append("query", search_query);
    
      axios.post(publishHelper.current.BASE_URL+'logo/searchlogotest.php', formData )
      .then(result=>{

        setFoundLogos(result.data.results)
        document.querySelector(".logoList").style.display="block";
        console.log(result,"Complete");
      }).catch(err=>{
        console.log(err,"ERROR");
      })

    } catch (error) {
      console.log(error);
    }
  }

  const handleCheckUrl=(e)=>{
    console.log(e.target.value);
    try {
     
    
      axios.post('http://localhost:8888/check_url', {
        url:  publishHelper.current.BASE_URL+e.target.value,
        
        }, {
        
         
        }
      ).then(result=>{
        console.log(result.data.status,"Complete");
      }).catch(err=>{
        console.log(err,"ERROR");
      })

    
    } catch (error) {
      console.log(error);
    }
  }


    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };
 
  return (
    <div className='AssetPicker'>
        
        <label>
        <h4>LOGO</h4>
      <input type="text" name="LOGO_NAME" placeholder='Search Logo Here' onChange={debounce((e)=>{handleLogoSearch(e)},500)}/>
      <ul className='logoList' style={{display:"none"}}>{
        (foundLogos==null)? <div>Logo Not Found</div> :        foundLogos.map((logo,i)=>{

          return <li key={i} onClick={()=>{
            document.querySelector("[name='LOGO_NAME']").value=logo;
            document.querySelector(`[name="LOGO_FILE"]`).value=""
            document.querySelector(".logoList").style.display="none";
            document.querySelector("#LOGO_PREVIEW").src=publishHelper.current.BASE_URL+"logo/"+logo
         
         
          }}><img src={publishHelper.current.BASE_URL+"logo/"+logo} /> <p> {logo}</p></li>

        })
        }
        
        <li>

        <div className="drop-zone" style={{margin:"10px auto",fontSize: '18px'}}>
    <span className="drop-zone__prompt">Drop file here or click to upload</span>
    <input type="file" name="LOGO_FILE" accept="image/png" className="drop-zone__input" 
      
      onChange={(e)=>{
        e.preventDefault()
        console.log("EEE");
        var reader = new FileReader();
            reader.onload = function (e) {
              
              document.querySelector("[name='LOGO_NAME']").value=document.querySelector(`[name="LOGO_FILE"]`).files[0].name;
              document.querySelector(".logoList").style.display="none";
                document.querySelector("#LOGO_PREVIEW").src=e.target.result
            }
        reader.readAsDataURL(e.target.files[0]);
        
      }}

      onDrop={(e)=>handleDrop(e,"LOGO_FILE")}
      onDragOver={(event) => event.preventDefault()}
      />
  </div>
       
      {/* <div  
        onClick={(e)=>{e.preventDefault();document.querySelector(`[name="LOGO_FILE"]`).click();}}
        onDrop={(e)=>handleDrop(e,"LOGO_FILE")}
        onDragOver={(event) => event.preventDefault()}>Drop Here</div> */}

        </li>
        
        
        </ul>
      <br/>

    <div id='logoPrevievDiv'>
      <p>Logo Preview</p>
    <img id='LOGO_PREVIEW'/>
    </div>
        
    </label>
    <label>
    <h4>Thumbnail</h4>
      
      <input type="text" name="THUMBNAIL_NAME" /><br/>

      <div className="drop-zone">
    <span className="drop-zone__prompt">Drop file here or click to upload</span>
    <input type="file" name="THUMBNAIL_FILE" accept="image/png" className="drop-zone__input" 
     onChange={(e)=>{
      e.preventDefault()
      // alert("OnChange")
      console.log("EEE");
      var reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector("#THUMBNAIL_PREVIEW").src=e.target.result
      }
      reader.readAsDataURL(e.target.files[0]);
      
    }}

    onDrop={(e)=>handleDrop(e,"THUMBNAIL_FILE")}
    onDragOver={(event) => event.preventDefault()}
    />
  </div>


      {/* <div  
        onClick={(e)=>{e.preventDefault();document.querySelector(`[name="THUMBNAIL_FILE"]`).click();}}
        onDrop={(e)=>handleDrop(e,"THUMBNAIL_FILE")}
        onDragOver={(event) => event.preventDefault()}>Drop Here</div> */}

        <div id='thumbnailPreviewDiv'>
          <p>Thumbnail Preview</p>
        <img id='THUMBNAIL_PREVIEW' />
        </div>
       
    </label>



        <label>
        <h4>Asset</h4>
        <div className='switches'>
       
        <label className='form-control'>
        <FaFilePdf /> PDF
        <input type="radio"  data-val="PDF" checked={selected=="PDF"} onChange={handleSelect}/>
        <span className="checkmark"></span>
        </label>
            

        <label className='form-control'>
        <BsFiletypeMp4 /> MP4
        <input type="radio"   data-val="MP4" checked={selected=="MP4"} onChange={handleSelect}/>
        <span className="checkmark"></span>
        </label>

        <label className='form-control'>
        <IoIosLink /> Client Link
        <input type="radio"   data-val="Client Link" checked={selected=="Client Link"} onChange={handleSelect}/>
        <span className="checkmark"></span>
        </label>

        <label className='form-control'>
        <PiFrameCornersThin /> Iframe
        <input type="radio"   data-val="IFrame" checked={selected=="IFrame"} onChange={handleSelect}/>
        <span className="checkmark"></span>
        </label>

        <input type="hidden" name="ASSET_FORMAT" value={selected}/>
        </div>
 
{
     <div style={{display:`${(selected=="PDF")?'block':'none'}`}}> 
    <span>Asset PDF</span>
    <input type="text" name="PDF"/><br/>

    <div className="drop-zone">
    <span className="drop-zone__prompt" id='pdfSelect'>Drop file here or click to upload</span>
    <input type="file" name="PDF_FILE" ref={pdfRef} className="drop-zone__input"
     onChange={(e)=>{
      e.preventDefault()
      // alert("OnChange")
        document.querySelector("#pdfSelect").innerHTML=e.target.files[0].name
     
    }}


    onDrop={(e)=>handleDrop(e,"PDF_FILE")}
    onDragOver={(event) => event.preventDefault()}
     />
  </div>


  </div>
}
{
    <div style={{display:`${(selected=="MP4")?'block':'none'}`}}>
    <span>MP4</span>
    <input type="text" name="MP4"/><br/>
   
    <div className="drop-zone">
    <span className="drop-zone__prompt" id='videoSelect'>Drop file here or click to upload</span>
    <input type="file" name="MP4_FILE" className="drop-zone__input" 
      onChange={(e)=>{
        e.preventDefault()
        // alert("OnChange")
          document.querySelector("#videoSelect").innerHTML=e.target.files[0].name
       
      }}
    />
  </div>
  </div>
}
    
{
  <div  style={{display:`${(selected=="Client Link")?'block':'none'}`}}>
    <span>Client Link</span>
    <input type="text" name="CLIENT_LINK" />
  </div>
}
{
  <div  style={{display:`${(selected=="IFrame")?'block':'none'}`}}>
    <span>Iframe Html</span>
    <input type="text" name="IFRAME" />
  </div>
}

</label>

     
    </div>
  )
}

export default AssetPicker