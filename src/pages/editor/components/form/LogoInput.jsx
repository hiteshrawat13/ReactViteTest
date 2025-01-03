import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import { StepperContext } from '../stepper/StepperContext'


import { FileInput } from '.'
import { EContext } from '../../EditorMain'

import axios from 'axios'
import { debounce } from "lodash";
import "./LogoInput.css"
const LogoPicker = ({ fileRef, name, label = "", tag = "",onFileChange=null,onTextChange=null }) => {



  const { setStateValue, getStateValue, watch, setFormValue, filesRef, campData } = useContext(EContext)

  const [foundLogos, setFoundLogos] = useState([])

  const logoPreviewRef=useRef()



  const loadLogoPreview=(filename)=>{

    // axios.get(getStateValue("BASE_URL") + getStateValue("LOGO_FOLDER") + filename)
    //     .then(result => {
    //       logoPreviewRef.src=result
    //     }).catch(err => {
           
    //     })

        logoPreviewRef.current.src=  getStateValue("BASE_URL") + getStateValue("LOGO_FOLDER") + filename

  }

  useEffect(() => {
    loadLogoPreview(getStateValue(name))
  
    return () => {
     
    }
  }, [ ])
  


  const handleLogoSearch = (e) => {

    console.log(e);

    if (e.target.value.trim().length == 0) {
      document.querySelector(".logoList").style.display = "none";

      return;
    }
    try {

      const search_query = e.target.value;
      const formData = new FormData();
      formData.append("query", search_query);

      axios.post(getStateValue("BASE_URL") + getStateValue("LOGO_FOLDER") + 'searchlogotest.php', formData)
        .then(result => {
          setFoundLogos(result.data.results)
          if(e.target.value!="")  document.querySelector(".logoList").style.display = "block";
          console.log(result, "Complete");
        }).catch(err => {
          console.log(err, "ERROR");
        })

    } catch (error) {
      console.log(error);
    }
  }

 


  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 800);
    };
  };

  const optimizedFn = useCallback(debounce((e)=> handleLogoSearch(e) ), []);


  //const handleChangeWithLib = useCallback(debounce((value) => {handleLogoSearch(value)}, 800), []);
 
  


  return (
    <div style={{ display: "flex" }}>



      <div style={{ position: "relative",width:"100%" }} className='logoInput'>



        <FileInput name={name} label={label} tag={tag} fileRef={fileRef} placeholder="Type to Search Logo..."
          onTextChange={(e) => {
            console.log(e.target.value);

            optimizedFn(e) 

            if(onTextChange)onTextChange(e)



          }}

          onFileChange={(filename) => {
           
         
           // filename = filename.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-\.]/g, '');
           
           // setFormValue("LOGO_NAME", filename)  NOT WORKING HERE so used querySelector
            //document.querySelector("[name=LOGO_NAME]").value = filename;
          //  setFormValue("ASSET_TITLE", filename)
 
            if(onFileChange)onFileChange(filename)
           // alert(filename)
          }}

        readOnly={false}/>

       
        

        <ul className='logoList' style={{ display: "none" }} >{
          (foundLogos == null) ? <div style={{ fontSize: "10px" }} >Logo Not Found</div> : foundLogos.map((logo, i) => {

            return <li key={i} onClick={() => {

              document.querySelector(".logoList").style.display = "none";

              setFormValue("LOGO_NAME", logo)

            }}><img src={getStateValue("BASE_URL") + getStateValue("LOGO_FOLDER") + logo} /> <p> {logo}</p></li>

          })
        }


        </ul>



        
      <div className='serverLogoFile'>
          <div>Server Logo File: </div>
          <div className='logoFileName'>{getStateValue(name)}</div>
          <img ref={logoPreviewRef} />
        </div>

      </div>






    </div>
  )
}

export default LogoPicker