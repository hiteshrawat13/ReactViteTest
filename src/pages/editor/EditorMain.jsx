import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setData, clearData, addData, updateData } from '../../store/campaign/CampaignSlice'
import { useSelector } from 'react-redux';
import TemplateManager from './templates/TemplateManager';

const Context = React.createContext();
const EditorMain = () => {
  const filesRef = useRef({})
  const location = useLocation()

  const campData = location?.state;

  const Editor11 = useMemo(
    () => TemplateManager.find(client => client.clientCode == campData.clientCode).templates.find(template => template.id == campData.templateId).editor,
    [])

  const [editor, setEditor] = useState(null)

  //   useEffect(()=>{
  //     const importComponent = async () => {
  //       const module = await import('http://localhost:5173/cbtool/template_files/ARC-1ST-TOUCH/Editor.jsx');
  //       const Editor = module.default;
  //       setEditor(<Editor />)


  //     };
  //     importComponent();
  // },[])
  //const LazyComponent = React.lazy(() => import('./components/Editor'));




  const { data } = useSelector(state => state.campaignData)


  const getStateValue = (value) => {
    return data[value]
  }







  const dispatch = useDispatch()
  //this is used to get current form value which is changes during key down events
  const [watch, setWatch] = useState({})
  const [currentFormMethods, setCurrentFormMethods] = useState(null)

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

    console.log(currentFormMethods);

    currentFormMethods.setValue(key, value, { shouldValidate: true }) //{shouldValidate:true} removes errors
  }

  useEffect(() => {

    //update state
    if (campData.jsonObject) {

      setState(campData.jsonObject)
    } else {
      console.log("ERROR");
    }


    return () => {
      //dispatch(clearData())
    }
  }, [])


  useEffect(()=>{
    console.log("currentFormMethods loaded.:-",currentFormMethods);
    
  },[currentFormMethods])

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


      </div>



      <Context.Provider value={{
        campData,
        watch,
        setWatch,
        setCurrentFormMethods,
        setStateValue,
        getStateValue,
        setState,
        setFormValue,
        filesRef,
        setError
      }}>

        <Suspense fallback={<div>Loading...</div>}>
          <Editor11 />
        </Suspense>

      </Context.Provider>
    </div>
  )
}

export default EditorMain

export const EContext = Context