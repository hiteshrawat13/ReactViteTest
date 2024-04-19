import React ,{useState} from 'react'

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

const RichEditor = ({name}) => {
    const [html, setHtml] = useState('my <b>HTML</b>');
    function onChange(e) {
        setHtml(e.target.value);
      }
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
    <input type="hidden" name={name} value={html}/>
    
    </>
  )
}

export default RichEditor