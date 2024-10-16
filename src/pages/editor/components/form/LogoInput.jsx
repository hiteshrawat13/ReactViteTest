import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import { StepperContext } from '../stepper/StepperContext'
 

import { FileInput } from '.'
import { EContext } from '../../EditorMain'

import axios from 'axios'

import "./LogoInput.css"
const LogoPicker = ({fileRef,name,label="",tag=""}) => {

    

    const { setStateValue, getStateValue, watch, setFormValue, filesRef, campData } = useContext(EContext)

    const [foundLogos,setFoundLogos]=useState([])

 


    const handleLogoSearch=(e)=>{

        console.log(e);
        
        if(e.target.value.length==0){
          document.querySelector(".logoList").style.display="none";
           
          return;
        }
        try {
    
          const search_query=e.target.value;
          const formData = new FormData();
          formData.append("query", search_query);
        
          axios.post(getStateValue("BASE_URL")+'logo/searchlogotest.php', formData )
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
        <div style={{display:"flex"}}>



            <div style={{position:"relative"}}>
         
            <FileInput name={name} label={label} tag={tag} fileRef={fileRef} 
             onTextChange={(e)=>{
                console.log(e.target.value);
                
                handleLogoSearch(e)
                
              }} 
              
              onFileChange={(filename)=>{
                filename = filename.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-\.]/g, '');
               
                setFormValue("LOGO_NAME",filename)
                alert(filename)
              }} 

            />

           
         <ul className='logoList' style={{display:"none",background:"red"}}>{
        (foundLogos==null)? <div>Logo Not Found</div> :        foundLogos.map((logo,i)=>{

          return <li key={i} onClick={()=>{
            document.querySelector("[name='LOGO_NAME']").value=logo;
            document.querySelector(`[name="LOGO_FILE"]`).value=""
            document.querySelector(".logoList").style.display="none";
            document.querySelector("#LOGO_PREVIEW").src=publishHelper.current.BASE_URL+"logo/"+logo
         
         
          }}><img src={getStateValue("BASE_URL")+"logo/"+logo} /> <p> {logo}</p></li>

        })
        }
        
        
            </ul>

            </div>




 
         
        </div>
    )
}

export default LogoPicker