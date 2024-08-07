import React, { useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useFormContext,Controller } from 'react-hook-form'
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
 
const RichTextEditor = ({name,required=false}) => {
    const { register, formState: { errors },control } = useFormContext()
    const campaignDataState = useSelector(state => state.campaignData)
 
  return (
    <div>
        
        
        <Controller
        control={control}
        name={name}
        rules={{
            required: required,
          }}
          // defaultValue={campaignDataState.data[name] }
          // value={campaignDataState.data[name]}
        render={({ field: { onChange, onBlur, value, ref } }) => (
            <EditorProvider key={Math.random} ><Editor value={value} onChange={onChange} onBlur={onBlur}    >
            <Toolbar  >
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
          </Editor></EditorProvider>
        )}
      />
          {errors[name] && <p>This field is required</p>}
        {/* 
   
    </EditorProvider> */}
       

    </div>
  )
}

export default RichTextEditor