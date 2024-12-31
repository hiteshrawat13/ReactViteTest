import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setData, clearData, addData, updateData } from '../../store/campaign/CampaignSlice'
import { useSelector } from 'react-redux';
import TemplateManager from './templates/TemplateManager';

import './EditorMain.css'

 
export const EContext = React.createContext("");
const EditorMain = () => {
  const filesRef = useRef({})
  const location = useLocation()

 

  const campData = location?.state;

 

    const Editor11 =   TemplateManager
    .find(client => client.clientCode == campData.clientCode)
    .templates.find(template => template.id == campData.templateId)
    .editor 
    

  const [editor, setEditor] = useState(null)
 



  const { data } = useSelector(state => state.campaignData)


  const getStateValue = (value) => {
    return data[value]
  }







  const dispatch = useDispatch()
  //this is used to get current form value which is changes during key down events
  const [watch, setWatch] = useState([])
  const [currentFormMethods, setCurrentFormMethods] = useState(null)
  // const [loading, setLoading] = useState(null)

  const setStateValue = (key, value) => {
    dispatch(updateData({ prop: key, value: value }))
  }


  const setError = (field, error) => {
    console.log("setError",currentFormMethods);
    //currentFormMethods.setValue("LINK_NAME", "WWWWWWWWWWWWWWWWWWWWWWWWWWWW")
      currentFormMethods.setError(field,{
        type: "custom",
        message: error
      },{shouldFocus:true})

     
  }

  const setState = (data) => {
    dispatch(setData(data))
  }

  const setFormValue = (key, value) => {

  //  console.log(currentFormMethods);

   currentFormMethods.setValue(key, value, { shouldValidate: true })   //{shouldValidate:true} removes errors
  }

  useEffect(() => {

    if (campData) {
        setStateValue("CLIENT_CODE", campData?.clientCode )
        setStateValue("LINK_TYPE", campData?.templateType )
        setStateValue("TEMPLATE_ID", campData?.templateId )
        setStateValue("REGION", campData?.country )
        setStateValue("CAMP_ID", campData?.campaignId )
        setStateValue("CAMP_NAME", campData?.campaignName )
        setStateValue("CAMP_NAME", campData?.campaignName )
      }

    //update state
    if (campData.jsonObject) {

      setState(campData.jsonObject)
    } else {
      console.log("ERROR");
    }



    console.log(".🧡🧡",campData);
    

    return () => {
      //dispatch(clearData())
    }
  }, [])


  //   useEffect(()=>{
 
  //  },[currentFormMethods])

  return (
    <div>

      <div style={{ display: "none" }}>
        {/* THESE FILE INPUTS ARE USED FRO LOGO THUMBNAIL PDF MP4 TO KEEP IN STATE */}
        <input type="file" className="" ref={ref => filesRef.current.fileInput1 = ref} />
        <input type="file" className="" ref={ref => filesRef.current.fileInput2 = ref} />
        <input type="file" className="" ref={ref => filesRef.current.fileInput3 = ref} />
        <input type="file" className="" ref={ref => filesRef.current.fileInput4 = ref} />
        <input type="file" className="" ref={ref => filesRef.current.fileInput5 = ref} />
        <input type="file" className="" ref={ref => filesRef.current.fileInput6 = ref} />
        <input type="file" className="" ref={ref => filesRef.current.fileInput7 = ref} />
        <input type="file" className="" ref={ref => filesRef.current.fileInput8 = ref} />
        <input type="file" className="" ref={ref => filesRef.current.fileInput9 = ref} />
        <input type="file" className="" ref={ref => filesRef.current.fileInput10 = ref} />
        <input type="file" className="" ref={ref => filesRef.current.fileInput11 = ref} />
        <input type="file" className="" ref={ref => filesRef.current.fileInput12 = ref} />
        <input type="file" className="" ref={ref => filesRef.current.fileInput13 = ref} />
        <br/><br/>
        <input type="file" className="" ref={ref => filesRef.current.speaker0 = ref} data-id={0} />
        <input type="file" className="" ref={ref => filesRef.current.speaker1 = ref} data-id={1}/>
        <input type="file" className="" ref={ref => filesRef.current.speaker2 = ref} data-id={2}/>
        <input type="file" className="" ref={ref => filesRef.current.speaker3 = ref} data-id={3}/>
        <input type="file" className="" ref={ref => filesRef.current.speaker4 = ref} data-id={4}/>
        <input type="file" className="" ref={ref => filesRef.current.speaker5 = ref} data-id={5}/>
        <input type="file" className="" ref={ref => filesRef.current.speaker6 = ref} data-id={6}/>
        <input type="file" className="" ref={ref => filesRef.current.speaker7 = ref} data-id={7}/>
        <input type="file" className="" ref={ref => filesRef.current.speaker8 = ref} data-id={8}/>
        <input type="file" className="" ref={ref => filesRef.current.speaker9 = ref} data-id={9}/>

        

      </div>

      <div className='campaignInfo'>
      <span >Campaign: <Link
  to={{
    pathname: "/linklist",
    search: `?campaignName=${encodeURIComponent(campData.campaignName)}`,
   // hash: "#hash",
  }}
><b>{campData.campaignName}</b></Link></span>
 
        <div className='campaignInfoRight'>
       
        <span>Client Code :  <b>{campData.clientCode}</b></span>
        <span>Region: <b> {campData.country}</b></span>
        {(getStateValue("LANGUAGE") )  &&  <span>Lang :  <b>{getStateValue("LANGUAGE") }</b></span> }
        <span>Type :<b> {campData.templateType}</b></span>
       
        </div>
        
       
       
      </div>

      

      <EContext.Provider value={{
        campData:campData,
        watch:watch || [],
        setWatch:setWatch ||   function() { } ,
        setCurrentFormMethods:setCurrentFormMethods || function() { } ,
        setStateValue:setStateValue || function(key, value) { } ,
        getStateValue:getStateValue || function(key) { } ,
        setState:setState || function() { } ,
        setFormValue:setFormValue || function(key, value) { } ,
        filesRef:filesRef,
        setError:setError || function(field,error) { } 
      }}>

        <Suspense fallback={<div>Loading...</div>}>
          {/* <Editor11 /> */}
        {/* {React.cloneElement(
             <Editor11/>, {  })}   */}
          <Editor11/>
        </Suspense>
      </EContext.Provider>
    </div>
  )
}

export default EditorMain

