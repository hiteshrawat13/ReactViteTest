import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'

import {
  Stepper,
  Step,
  TextBox,
  Form,
  SelectBox,
  RichTextEditor,
  CheckBox,
  HiddenField,
  FormBuilder,
  FTPUpload,
  Preview,
  ZIPDownload,
  LogoInput,
  RadioGroup,
  FileInput,
  Row,
  Col,
  LanguageInput,
  CheckLink,
  AssetDetails,
  SpeakerDetails,
  LinkDetails,
  Section,
  ExtraFiles
} from '../../../components/form/index'


 
import PublishHelper from './PublishHelper'
 
import { EContext } from '../../../EditorMain'
import BasicDetails from '../TGIF-1ST-TOUCH/components/BasicDetails'
import EDMDetails from '../TGIF-1ST-TOUCH/components/EDMDetails'
import HiddenData from '../TGIF-1ST-TOUCH/components/HiddenData'
 




const Editor = ({ }) => {

 
  const publishHelperRef = useRef(new PublishHelper())
  const { setStateValue, getStateValue, watch, setFormValue, filesRef, campData, setError } = useContext(EContext)
 




  return (<Stepper >
    <Step title="Basic Info" key={1101}>

    <HiddenData/>

      <LinkDetails />
      <BasicDetails />


    </Step>
    <Step title="Abstract & Title" key={1102}>

      <Section title="EDM Details">
        <TextBox label="EDM Thanks Text" name="EDM_THANKS_TEXT_FOR_2ND_TOUCH" required={false} width="100%" />
        <EDMDetails/>

        
      </Section>

 {/* Speakers Section */}
      <SpeakerDetails />
       
          {(getStateValue("ASSET_TYPE") != "Webinar") &&
              <>
                <Section title="Thankyou Page Details">
                  <RichTextEditor label="Thank You Page" name="NORMAL_THANK_YOU_PAGE_TEXT" required={true} value={`
              <h1>Thank you...</h1>
              <span>for downloading <strong>"##ASSET_TITLE##"</strong><br><br>
              Your download will automatically start in <span id="countdown">10</span> seconds...<br>If your download doesn't start automatically, <a href="##BASE_URL####LINK_NAME##.pdf">click here</a> to start your download.</span>
      
                `} />
      
      
                </Section>
      
              </>
      
            }


    </Step>




    <Step title="Logo & Assets" key={1103}>

      <Section title="Logo & Thumbnail">



        <Row>
          <Col>
            <LogoInput name="LOGO_NAME" label="Logo" tag="logo" fileRef={filesRef.current.fileInput1}
              onFileChange={(filename) => {

                setFormValue("LOGO_NAME", filename)
              }
              } />

          </Col>
          <Col>
            <FileInput name="THUMBNAIL_NAME" label="Thumbnail" tag="file" fileRef={filesRef.current.fileInput2}
              onTextChange={(filename) => {

              }
              }

              onFileChange={(filename) => {

                if (filename.includes(".")) {
                  let fn = filename.split('.')
                  fn.pop()


                  alert(fn.join("."));
                }

                //setFormValue("LOGO_NAME",Math.random()+"---")

              }
              }
            />

<CheckBox label="Hide thumbnails" name="HIDE_THUMBNAIL" defaultChecked={false} />
            <CheckBox label="Add border to thumbnail" name="THUMBNAIL_BORDER" defaultChecked={true} />
            <TextBox label="EDM Thumbnail width" name="EDM_THUMBNAIL_WIDTH" required={true} value="260px" helpText={`In % or px`} />
            <CheckBox label="Use different thumbnail for edm page" name="USE_DIFFERENT_THUMBNAIL_FOR_EDM_PAGE" />

            {(watch["USE_DIFFERENT_THUMBNAIL_FOR_EDM_PAGE"] == true) &&
              <FileInput name="EDM_THUMBNAIL_NAME" label="EDM Thumbnail" tag="file" fileRef={filesRef.current.fileInput3} />
            }
          </Col>
        </Row>








      </Section>




      {/* Asset Details */}
      <AssetDetails />




      <Section title="Image Below Abstract">
        <Row>
          <Col>
            <CheckBox label="Show Image Below Abstract" name="SHOW_IMAGE_BELOW_ABSTRACT" defaultChecked={false} />
            {(watch["SHOW_IMAGE_BELOW_ABSTRACT"] == true) &&

              [<FileInput name="IMAGE_BELOW_ABSTRACT" label="Image Below Abstract" tag="file" fileRef={filesRef.current.fileInput9} onFileChange={(filename) => { setFormValue("IMAGE_BELOW_ABSTRACT", filename) }} />
                , <TextBox label="IMAGE_BELOW_ABSTRACT_WIDTH" required="true" name="IMAGE_BELOW_ABSTRACT_WIDTH" value={'20%'} />
                , <CheckBox label="Show on Landing Page" name="SHOW_IMAGE_BELOW_ABSTRACT_ON_LANDING_PAGE" defaultChecked={false} />]
            }
          </Col>
        </Row>
      </Section>



          {/* Extra Files Section */}
      <ExtraFiles/>

       



    </Step>




    <Step title="Preview" key={1105}>
          <Section>
            <Preview publishHelper={publishHelperRef.current} filesRef={filesRef.current} controls={
              ({ iframe }) => {
                return <>
                  <div style={{
                    background: 'white',
                    height: 'fit-content',
                    margin: '30px 10px',
                    padding: '10px',
                    paddingTop: '3px'
                  }}>
                    <TextBox type="number" label="Logo Width" name="LOGO_WIDTH" onChange={(e) => {
                      console.log(e);
                      iframe.contentDocument.querySelector('.splogo').style.width = e.target.value + "px"
                      console.log(iframe.contentDocument.querySelector('.splogo'));
                      setStateValue("LOGO_WIDTH", e.target.value)
                    }} />
    
    
    
    
    
                    {(getStateValue("SHOW_IMAGE_BELOW_ABSTRACT") == true) &&
    
                      <TextBox type="text" label="Logo Width" name="IMAGE_BELOW_ABSTRACT_WIDTH" onChange={(e) => {
                        console.log(e);
                        if (!e.target.value.endsWith("%")) {
                          alert("Please add percentage sign.")
                          return
                        }
                        iframe.contentDocument.querySelector('.image_below_abstract').style.width = e.target.value + ""
    
                        setStateValue("IMAGE_BELOW_ABSTRACT_WIDTH", e.target.value)
                      }} />}
    
    
    
    
    
                    <TextBox type="text" label="EDM Thumbnail width" helpText='enter values in % or px' name="EDM_THUMBNAIL_WIDTH" onChange={(e) => {
                      console.log(e);
    
                      iframe.contentDocument.querySelector('.edm_thumbnail').style.width = e.target.value + ""
    
                      setStateValue("EDM_THUMBNAIL_WIDTH", e.target.value)
                    }} />
    
    
    
    
    
    
    
                  </div>
                </>
              }
            } />
          </Section>
        </Step>
    
        <Step title="Publish" key={1106}>
          <Section title="FTP Upload">
            <FTPUpload publishHelper={publishHelperRef.current} filesRef={filesRef.current} />
    
          </Section>
    
    
        </Step>

  </Stepper>
  )
}

export default Editor