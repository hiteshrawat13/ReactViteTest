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
  Section
} from '../../../components/form/index'


 
import PublishHelper from './PublishHelper'
import LinkDetails from '../TGIF-1ST-TOUCH/LinkDetails'
import { EContext } from '../../../EditorMain'
import BasicDetails from '../TGIF-1ST-TOUCH/components/BasicDetails'
import EDMDetails from '../TGIF-1ST-TOUCH/EDMDetails'




const Editor = ({ }) => {

 
  const publishHelperRef = useRef(new PublishHelper())
  const { setStateValue, getStateValue, watch, setFormValue, filesRef, campData, setError } = useContext(EContext)
  useEffect(() => {
    //setStateValue("FTP_CONFIG_NAME", "TGIF")
    // setStateValue("FTP_CONFIG_NAME", "TEST")
    //setStateValue("LOGO_FOLDER", "logo/")
    //if (!campData?.jsonObject?.LOGO_WIDTH) setStateValue("LOGO_WIDTH", "180")
    //alert("TGIF")
  }, [campData])





  return (<Stepper >
    <Step title="Basic Info" key={1101}>
      {/* <button onClick={(e) => {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem("data"))
        console.log(data);

        for (const [key, value] of Object.entries(data)) {
          setFormValue(key, value)
        }
        setStateValue("form", data.form)
        alert("State Loaded")

      }} >Load State From Local Storage</button> */}





      <HiddenField name="FTP_CONFIG_NAME" value="TGIF" />
      <HiddenField name="LOGO_FOLDER" value="logo/" />
      <HiddenField name="LOGO_WIDTH" value="180" />
      <HiddenField name="BASE_URL" value="https://resource.itbusinesstoday.com/whitepapers/cbtool_test/" />
      <HiddenField name="YEAR" value={new Date().getFullYear() + ""} />
      <LinkDetails/>


      <BasicDetails/>


    </Step>
    <Step title="Abstract & Title" key={1102}>


      <Section title="EDM Details">
        <TextBox label="EDM Thanks Text" name="EDM_THANKS_TEXT_FOR_2ND_TOUCH" required={false} width="100%" />
        <EDMDetails/>

      </Section>


       
      {(getStateValue("ASSET_TYPE") != "Webinar") &&
        <>
          <Section title="Thankyou Page Details">

            <RichTextEditor label="Thank You Page" name="NORMAL_THANK_YOU_PAGE_TEXT" required={true} value={`
           <h1>Thank you...</h1>
        <span>for downloading <strong>"##EDM_TITLE##"</strong><br><br>
        Your download will automatically start in <span id="countdown">10</span> seconds...<br>If your download doesn't start automatically, <a href="##BASE_URL####LINK_NAME##.pdf">click here</a> to start your download.</span>

          `} />


          </Section>

        </>

      }


    </Step>




    <Step title="Logo & Assets" key={1103}>

      <Section title="Logo & Thumbnail">


        <LogoInput name="LOGO_NAME" label="Logo" tag="logo" fileRef={filesRef.current.fileInput1} />

        <br></br>
        <FileInput name="THUMBNAIL_NAME" label="Thumbnail" tag="file" fileRef={filesRef.current.fileInput2} />

        <CheckBox label="Use different thumbnail for edm page" name="USE_DIFFERENT_THUMBNAIL_FOR_EDM_PAGE" />
        {(watch["USE_DIFFERENT_THUMBNAIL_FOR_EDM_PAGE"] == true) &&
          <FileInput name="EDM_THUMBNAIL_NAME" label="EDM Thumbnail" tag="file" fileRef={filesRef.current.fileInput3} />
        }


        <CheckBox label="Upload Extra Image [EXTRA_FILE_1]" name="ADD_EXTRA_FILE_1" />
        {(watch["ADD_EXTRA_FILE_1"] == true) &&
          <FileInput name="EXTRA_FILE_1" label="Extra Image" tag="file" fileRef={filesRef.current.fileInput4} onChange={(filename) => {
            setFormValue("EXTRA_FILE_1", filename)
          }} />
        }

      </Section>

      <Section title="Asset">
        <RadioGroup name="ASSET_FORMAT" options={[
          { label: "PDF", value: "PDF" },
          { label: "MP4", value: "MP4" },
          { label: "Client Link", value: "CLIENT_LINK" },
          { label: "IFrame", value: "IFRAME" }
        ]} />
        {(watch["ASSET_FORMAT"] == "PDF") &&
          <FileInput name="PDF_NAME" label="PDF" tag="file" fileRef={filesRef.current.fileInput11} />
        }

        {(watch["ASSET_FORMAT"] == "MP4") &&
          <FileInput name="MP4_NAME" label="MP4" tag="file" fileRef={filesRef.current.fileInput12} />
        }

        {(watch["ASSET_FORMAT"] == "CLIENT_LINK") &&
          <TextBox label="Client Link" required="true" name="CLIENT_LINK" />
        }

        {(watch["ASSET_FORMAT"] == "IFRAME") &&
          <TextBox label="IFrame Url" required="true" name="IFRAME" />
        }


      </Section>
    </Step>




    <Step title="Preview" key={1105}>
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

                iframe.contentDocument.querySelector('.splogo').style.width = e.target.value + "px"

                console.log(iframe.contentDocument.querySelector('.splogo'));

                setStateValue("LOGO_WIDTH", e.target.value)

              }} />

            </div>
          </>
        }
      } />
    </Step>

    <Step title="Publish" key={1106}>
      <Section title="FTP Upload">
        <FTPUpload publishHelper={publishHelperRef.current} filesRef={filesRef.current} />
        <ZIPDownload publishHelper={publishHelperRef.current} filesRef={filesRef.current} />
      </Section>


    </Step>

  </Stepper>
  )
}

export default Editor