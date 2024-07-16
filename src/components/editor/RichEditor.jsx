import React ,{useState,forwardRef,useImperativeHandle} from 'react'

import {   BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    HtmlButton,
    Separator,
    
    Toolbar,EditorProvider,Editor } from 'react-simple-wysiwyg'

const RichEditor = forwardRef(({name,htmlValue="my <b>HTML</b>"},ref) => {
    const [html, setHtml] = useState(htmlValue);
    function onChange(e) {
     
     
        setHtml(e.target.value);
      }

      const printSomething = () =>{
        //alert("print")
        console.log('printing from child function')
     }

     const updateHtml=(html)=>{
      setHtml(html);
     
     }
     useImperativeHandle(ref, () => ({
       printSomething: printSomething,
       updateHtml: updateHtml
     }));


  return (
    <>
    <EditorProvider key={Math.random} >
    <Editor value={html} onChange={onChange} key={Math.random} >
        <Toolbar key={Math.random}>
        {/* <BtnUndo />
          <BtnRedo /> */}
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <HtmlButton />
          <Separator />
          <BtnStyles />
         
        </Toolbar>
      </Editor>
    </EditorProvider>
    <input type="text" style={{display:"none"}} name={name} 
      value={html}
     onChange={onChange} />
    
    </>
  )
})

export default RichEditor