// import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector, shallowEqual } from 'react-redux'
// import { useFormContext,Controller } from 'react-hook-form'
// import {   BtnBold,
//     BtnBulletList,
//     BtnClearFormatting,
//     BtnItalic,
//     BtnLink,
//     BtnNumberedList,
//     BtnRedo,
//     BtnStrikeThrough,
//     BtnStyles,
//     BtnUnderline,
//     BtnUndo,
//     HtmlButton,
//     Separator,
    
//     Toolbar,EditorProvider,Editor } from 'react-simple-wysiwyg'

// const RichTextEditor = ({label,name,required=false,width=null,value=null}) => {
//     const { register,unregister,setValue, formState: { errors },control } = useFormContext()
//     const campaignDataState = useSelector(state => state.campaignData)
//     useEffect(() => {
//       setValue( name, campaignDataState.data[name] || value || null)
//       return () => {
//         unregister(name)
//       }
//     }, [])

//     const editorRef=useRef()
//   return (
//     <div className='form-group'>
        
          
//         <label>{label}{(required)&& <span style={{color:"red"}}>*</span>}</label>
//         <Controller
//         control={control}
//         name={name}
//         rules={{
//             required: required,
//           }}
//           //defaultValue={campaignDataState.data[name] }
//            //value={campaignDataState.data[name]}

//           // {...(value? {value:value} : {})} 
//         render={({ field: { onChange, onBlur, value, ref } }) => (
//           <div className='input-holder'  {...((width!=null) && {style:{width}}) }>
//             <EditorProvider   key={Math.random} >
              
//               <Editor 
              
//                 value={value} 
//                 onChange={onChange} 
//                 onBlur={onBlur} 
//                 containerProps={{ style: { resize: 'vertical' ,minHeight:"300px"} }}  
//               >
//               <Toolbar  >
//               {/* <BtnUndo />
//                 <BtnRedo /> */}
//                 <Separator />
//                 <BtnBold />
//                 <BtnItalic />
//                 <BtnUnderline />
//                 <BtnStrikeThrough />
//                 <Separator />
//                 <BtnNumberedList />
//                 <BtnBulletList />
//                 <Separator />
//                 <BtnLink />
//                 <BtnClearFormatting />
//                 <HtmlButton />
//                 <Separator />
//                 <BtnStyles />
//               </Toolbar>
//             </Editor>
//           </EditorProvider>
//           {errors[name] && <div className='error-icon'>!</div>}
//           </div>
//         )}
//       />
//           {errors[name] && <span className='error'>This field is required</span>}
        
       

//     </div>
//   )
// }

// export default RichTextEditor



import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useFormContext,Controller } from 'react-hook-form'

import JoditEditor from 'jodit-react';

const RichTextEditor = ({label,name,required=false,width=null,value=null}) => {
      const { register,unregister,setValue, formState: { errors },control } = useFormContext()
      const campaignDataState = useSelector(state => state.campaignData)
      useEffect(() => {
        setValue( name, campaignDataState.data[name] || value || null)
        return () => {
          unregister(name)
        }
      }, [])
	const editor = useRef(null);
 

  const config ={
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder:  'Start typings...'
  }


	return (

    <div className='form-group'>
        
          
       <label>{label}{(required)&& <span style={{color:"red"}}>*</span>}</label>
         <Controller
          control={control}
        name={name}
       rules={{
          required: required,
           }}
           //defaultValue={campaignDataState.data[name] }
           //value={campaignDataState.data[name]}

          // {...(value? {value:value} : {})} 
         render={({ field: { onChange, onBlur, value, ref } }) => (
          <JoditEditor
            ref={editor}
            value={value}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={onBlur} // preferred to use only this option to update the content for performance reasons
            onChange={onChange}
          />
         )}


    />
             {errors[name] && <span className='error'>This field is required</span>}
            
           
    
         </div>
	);
};

export default RichTextEditor