import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useFormContext, Controller } from 'react-hook-form'
import JoditEditor from 'jodit-react';
import axios from 'axios';
import Config from '../../../../Config';

const RichTextEditor = ({ label, name, required = false, width = null, value = null,onTextChange=null }) => {
  const { register, unregister, setValue, formState: { errors }, control } = useFormContext()
  const campaignDataState = useSelector(state => state.campaignData)
  useEffect(() => {
    setValue(name, campaignDataState.data[name] || value || null)
    return () => {
      unregister(name)
    }
  }, [])


  

  const translate=async ({to,text})=>{
     // Example API endpoint (replace with your actual translation API endpoint)
     const apiUrl = `${Config.API_BASE_URL}/translate`; 

     
    
     try{
        to=to.replaceAll("en-US","en")
        // Axios POST request using await
        const response = await axios.post(apiUrl, { text:text ,  to:to ,  from:'en' });

        // Assuming the API returns the translated text in the response
        const data = response.data;

        return data

     }catch(error){
      console.log("TranslateApi error",error);
      
        return null
     }
     
 
  }

  const editor = useRef(null);


  //   {
  //     zIndex: 0,
  //     readonly: false,
  //     activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about', 'dots'],
  //     toolbarButtonSize: 'middle',
  //     theme: 'default',
  //     saveModeInCookie: false,
  //     spellcheck: true,
  //     editorCssClass: false,
  //     triggerChangeEvent: true,
  //     width: 'auto',
  //     height: 'auto',
  //     minHeight: 100,
  //     direction: '',
  //     language: 'auto',
  //     debugLanguage: false,
  //     i18n: 'en',
  //     tabIndex: -1,
  //     toolbar: true,
  //     enter: "P",
  //     defaultMode: Jodit.MODE_WYSIWYG,
  //     useSplitMode: false,
  //     colors: {
  //         greyscale:  ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
  //         palette:    ['#980000', '#FF0000', '#FF9900', '#FFFF00', '#00F0F0', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF'],
  //         full: [
  //             '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
  //             '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
  //             '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
  //             '#A61C00', '#CC0000', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
  //             '#85200C', '#990000', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#733554',
  //             '#5B0F00', '#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
  //         ]
  //     },
  //     colorPickerDefaultTab: 'background',
  //     imageDefaultWidth: 300,
  //     removeButtons: [],
  //     disablePlugins: [],
  //     extraButtons: [],
  //     sizeLG: 900,
  //     sizeMD: 700,
  //     sizeSM: 400,
  //     sizeSM: 400,
  //     buttons: [
  //         'source', '|',
  //         'bold',
  //         'strikethrough',
  //         'underline',
  //         'italic', '|',
  //         'ul',
  //         'ol', '|',
  //         'outdent', 'indent',  '|',
  //         'font',
  //         'fontsize',
  //         'brush',
  //         'paragraph', '|',
  //         'image',
  //         'video',
  //         'table',
  //         'link', '|',
  //         'align', 'undo', 'redo', '|',
  //         'hr',
  //         'eraser',
  //         'copyformat', '|',
  //         'symbol',
  //         'fullsize',
  //         'print',
  //         'about'
  //     ],
  //     buttonsXS: [
  //         'bold',
  //         'image', '|',
  //         'brush',
  //         'paragraph', '|',
  //         'align', '|',
  //         'undo', 'redo', '|',
  //         'eraser',
  //         'dots'
  //     ],
  //     events: {},
  //     textIcons: false,
  // }

  const config = useMemo(
    () => ({
      events: {
      },

      iframe:true,
      style: { font: "14px Arial", },
      height: 210,
      readonly: false,
      placeholder: '',
      defaultActionOnPaste: 'insert_as_html',
      defaultLineHeight: 1.5,

      enter: 'p',
      toolbarButtonSize: 'small',
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
      buttons: [
        'source', '|',
        'bold',
        'strikethrough',
        'underline',
        'italic', '|',
        'ul',
        'ol', '|',
        'outdent', 'indent', '|',
        'font',
        'fontsize',
        'brush',
        'paragraph', '|',
        'image',
        'video',
        'table',
        'link', '|',
        'align', 'undo', 'redo', '|',
        'hr',
        'eraser',
        'copyformat', '|',
        // 'symbol',
        'fullsize',

           {
          name: 'translateButton',
          icon: 'fa fa-language',
          tooltip: 'Translate',
          exec: async function (editor) {
             
            const to=campaignDataState.data["LANGUAGE"]
            const text=editor.value
            
         let a = document.createElement("a");
            a.setAttribute("style", "display: none");
            a.href = `https://translate.google.co.in/?sl=${'en'}&tl=${to}&text=${encodeURIComponent(text)}&op=translate`;
            a.target = "_blank";
           // a.download = "MyFileName.pdf";
            a.click();
            a.innerHTML = "TranslateLink";
            document.body.appendChild(a);
            a.remove();
           
          }
      },

        {
          name: 'Remove Styles',
          tooltip: 'Remove style attributes from html tags.',
          exec: (editor) => {
            //console.log(editor.value);
            
           
            const editorValue=editor.value

            const parsed = new DOMParser().parseFromString(editorValue, 'text/html')
            parsed.body.querySelectorAll('*').forEach(elem => [...elem.attributes].forEach(attr => (attr.name=="style")?elem.removeAttribute(attr.name):null  ))
            const strippedHtml= parsed.body.innerHTML;

            //editor.s.insertHTML(strippedHtml);
            editor.value=strippedHtml

          }
        },
      //   {
      //     name: 'translateButton',
      //     icon: 'fa fa-language',
      //     tooltip: 'Translate',
      //     exec: async function (editor) {
      //        alert("D-"+campaignDataState.data["LANGUAGE"])
      //       const to=campaignDataState.data["LANGUAGE"]
      //       const text=editor.value
            
      //       //const tt=await translate({to,text})
      //       var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
      //       window.open(`https://translate.google.co.in/?sl=${'en'}&tl=${to}&text=${text}&op=translate`, "_blank",strWindowFeatures) //to open new page
          
           
      //     }
      // }

      ]


    }),
    [],
  );



  return (
    <div className='form-group'>
      <label>{label}{(required) && <span style={{ color: "red" }}>*</span>}</label>
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
            onChange={(e)=>{onChange(e);if(onTextChange)onTextChange(e)}}
          />
        )} />

      {errors[name] && <span className='error'>This field is required</span>}
    </div>
  );
};

export default RichTextEditor