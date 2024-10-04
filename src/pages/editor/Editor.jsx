import React, { Suspense, useEffect, useRef, useState } from 'react'


import ArcEditor from './templates/ARC-1ST-TOUCH/Editor';
import TGIF_1ST_TOUCH_Editor from './templates/TGIF-1ST-TOUCH/Editor';
import { useLocation } from 'react-router-dom'
import { EditorContext } from 'react-simple-wysiwyg';

import { Stepper ,Step} from './components/form/index';
import { useDispatch } from 'react-redux';
import { setData, addData, updateData } from '../../store/campaign/CampaignSlice'
import { useSelector } from 'react-redux';
const Context = React.createContext();
const Editor = () => {
  
  const location =useLocation()

  const campData=location?.state;

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



  
  const {data} = useSelector(state => state.campaignData)


  const getValue=(value)=>{
    return data[value]
  }
 


  
  const dispatch = useDispatch()
    //this is used to get current form value which is changes during key down events
    const [watch,setWatch]=useState({})
    const [currentFormMethods,setCurrentFormMethods]=useState(null)  
    
    const setValue=(key,value)=>{
      dispatch(updateData({ prop: key, value:value }))
    }

    const setState=(data)=>{
      dispatch(  setData( data )  )
    }

    const setFormValue=(key,value)=>{

      console.log(currentFormMethods);
      
      currentFormMethods.setValue(key,value)
    }

  return (
    <div>

      {/* <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
      </Suspense> */}

        {/* <ArcEditor/> */}


        <Context.Provider value={{
          campData,
          watch,
          setWatch,
          setCurrentFormMethods,
          setValue,
          getValue,
          setState,
          setFormValue
          }}>
            
        
   <TGIF_1ST_TOUCH_Editor  /> 
          
        </Context.Provider>

       

     

    </div>
  )
}

export default Editor

export const EContext =Context