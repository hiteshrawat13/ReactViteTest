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
  FileInput
} from '../../components/form/index'

import defaultFieldsJson from "./default-fields.json"
import { EContext } from '../../EditorMain'
import PublishHelper from './PublishHelper'
import Section from '../../components/form/Section'
import Row from '../../components/form/Row'
import Col from '../../components/form/Col'
import LanguageInput from '../../components/form/LanguageInput'
import CheckLink from '../../components/CheckLink'

const Editor = ({ }) => {


  const publishHelperRef = useRef(new PublishHelper())
  const { setStateValue, getStateValue, watch, setFormValue, filesRef, campData, setError } = useContext(EContext)
  useEffect(() => {


    if (campData?.country == 'EU') {
      setStateValue("FTP_CONFIG_NAME", "EU-ITBP")
      setStateValue("BASE_URL", "https://eu.itbusinessplus.com/whitepaper/test/")

    } else {
      setStateValue("FTP_CONFIG_NAME", "NEW-ITBP")
      setStateValue("BASE_URL", "https://resource.itbusinessplus.com/whitepapers/cbtooltest/")

    }


    setStateValue("LOGO_FOLDER", "logo/")

    //setError("LINK_NAME","WWWWWWWWWWW")
    if (!campData?.jsonObject?.LOGO_WIDTH) setStateValue("LOGO_WIDTH", "180")
    if (!campData?.jsonObject?.THUMBNAIL_WIDTH) setStateValue("THUMBNAIL_WIDTH", "200")
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






      <TextBox label="BASE URL" name="BASE_URL" required={true} readOnly />
      <HiddenField name="YEAR" value={new Date().getFullYear() + ""} />
      <Section title="Link Details">
        <Row>
          <Col>
            <TextBox label="Client Code" name="CLIENT_CODE" required={true} value={campData?.clientCode} readOnly />
            {(watch["CLIENT_CODE"] === "TEST") && <>IT WORKS</>}
            {(watch["CLIENT_CODE"] === "TEST") ? setError("CLIENT_CODE", "WWWWWWWWWWW") : ""}

          </Col>
          <Col>
            <TextBox label="Campaign Name" name="CAMP_NAME" required={true} value={campData?.campaignName} placeholder="Campaign email subject line here" readOnly />
          </Col>


        </Row>
        <Row>
          <Col><TextBox label="Link Type" name="LINK_TYPE" required={true} value={campData?.templateType} readOnly /></Col>
          <Col><TextBox label="Template Id" name="TEMPLATE_ID" required={true} value={campData?.templateId} readOnly /></Col>
        </Row>


        <TextBox label="Campaign Id" name="CAMP_ID" required={true} value={campData?.campaignId} width="10%" readOnly />
        <SelectBox label="Region" name="REGION" value={campData?.country} required={true} disabled
          options={[
            { label: "Select..", value: "" },
            { label: "EU", value: "EU" },
            { label: "NON-EU", value: "NON-EU" },
            { label: "CASL", value: "CASL" },
            { label: "Both ( NON-EU & CASL )", value: "BOTH" }
          ]}
          width="10%"
        />
        <TextBox label="Link Name" name="LINK_NAME" required={true} width="50%" readOnly={campData.mode === 'edit'}

          onChange={
            (e) => {
              //console.log(e.target.value);
              e.target.value = e.target.value.replace(/\s+/g, '-');
              e.target.value = e.target.value.replace(/[^a-zA-Z0-9-\.]/g, '');

              const val = e.target.value
              // setStateValue("THUMBNAIL_NAME",`${val}.png`)
              // setStateValue("PDF_NAME",`${val}.pdf`)
              // setStateValue("MP4_NAME",`${val}.mp4`)
              setFormValue("THUMBNAIL_NAME", `${val}.png`)
              setFormValue("EDM_THUMBNAIL_NAME", `${val}-edm.png`)
              setFormValue("PDF_NAME", `${val}.pdf`)
              setFormValue("MP4_NAME", `${val}.mp4`)
              setFormValue("EXTRA_FILE_1", `${val}.png`)
            }
          } />

        {(watch['LINK_NAME'] != "") && <CheckLink link={watch["BASE_URL"] + (watch['LINK_NAME']) + "-edm.html"} onExists={() => {
          setTimeout(() => {

          }, 500);

        }} />}
      </Section>


      <Section title="Details" >

        <Row>
          <Col>
            <LanguageInput />
          </Col>
        </Row>


        <TextBox label="Sponsored By Text" name="SPONSORED_BY_TEXT" required={true} value="Sponsored By : " />
        <TextBox label="Sponsored Name" name="SPONSOR_NAME" required={true} />
        <TextBox label="Sponsored WebSite" name="SPONSOR_WEBSITE" required={true} />

      </Section>


    </Step>
    <Step title="Abstract & Title" key={1102}>


      {/* EDM Page details */}
      <Section title="EDM Details">
        <TextBox label="EDM Title" name="EDM_TITLE" required={true} width="60%" />
        <TextBox label="EDM Heading" name="EDM_HEADING" required={true} width="60%" />
        <RichTextEditor label="Edm Abstract" name="EDM_ABSTRACT" required={true} />
        <TextBox label="EDM CTA" name="EDM_CTA" required={true} width="20%" value="Download Now" />
      </Section>

      {/* Landing Page Details */}
      <Section title="Landing Page Details">
        <CheckBox label="Landing title is same as EDM title" name="LANDING_TITLE_SAME_AS_EDM_TITLE" />
        {(watch["LANDING_TITLE_SAME_AS_EDM_TITLE"] == false) && <TextBox label="Landing Page Title" name="LANDING_TITLE" required={true} />}

        <CheckBox label="Landing Heading same as EDM Heading" name="LANDING_HEADING_SAME_AS_EDM_HEADING" />
        {(watch["LANDING_HEADING_SAME_AS_EDM_HEADING"] == false) && <TextBox label="Landing Page Heading" name="LANDING_HEADING" required={true} />}
      </Section>

      {/* Thankyou Page Details */}
      <Section title="Thankyou Page Details">

        <CheckBox label="Thankyou page title is same as EDM title" name="THANKYOU_TITLE_SAME_AS_EDM_TITLE" defaultChecked />
        {(watch["THANKYOU_TITLE_SAME_AS_EDM_TITLE"] == false) && <TextBox label="Thankyou Page Title" name="THANKYOU_TITLE" required={true} /> 
        }

        <CheckBox label="Thankyou page heading is same as EDM heading" name="THANKYOU_HEADING_SAME_AS_EDM_HEADING" defaultChecked />
        {(watch["THANKYOU_HEADING_SAME_AS_EDM_HEADING"] == false) && <TextBox label="Thankyou Page Title" name="THANKYOU_HEADING" required={true} /> 
        }

        <TextBox label="Thankyou Page CTA" name="THANKYOU_CTA" required={true} value="View & Download" />
      </Section>


      {/* Sendmail Details */}
      <Section title="Sendmail Details">
        <TextBox label="Sendmail Subject" name="SENDMAIL_SUBJECT" required={true} width="60%" />

        <button onClick={(e) => {
          e.preventDefault()
          const default_body = `<table>
				 <tr><td>Dear&nbsp;<b>$firstname,<b></td></tr>
				 <tr><td>&nbsp;</td></tr>
				 <tr><td>Thank you for registering for content provided by ##SPONSOR_NAME##. Please share it with your colleagues by forwarding the link below (no registration required).</td></tr>
				 <tr><td>&nbsp;</td></tr>
				 <tr><td><a href='##ASSET_URL##'><img src='##BASE_URL####THUMBNAIL_NAME##' width='40%' /></a></td></tr>
				 <tr><td>&nbsp;</td></tr>
				 <tr><td>&nbsp;</td></tr>
				 <tr><td>You can learn more by visiting  <a href = '##SPONSOR_WEBSITE##'>##SPONSOR_WEBSITE##.</a></td></tr>
				 <tr><td>&nbsp;</td></tr>
				 <tr><td><a href='##SPONSOR_WEBSITE##'><img style = 'width: 25%;' src='##BASE_URL####LOGO_NAME##' width='25%'/></a></td></tr>
				 <tr><td>&nbsp;</td></tr>
				 <tr><td>&nbsp;</td></tr>
				 <tr><td>Sincerely,</td></tr>
				 <tr><td>The IT Business Plus fulfillment team</td></tr></table>`

          setFormValue("SENDMAIL_BODY", default_body)
        }}>Load Default Sendmail Body</button>

        <RichTextEditor label="Sendmail Body" name="SENDMAIL_BODY" required={true} />
      </Section>

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


    <Step title="Form" key={1104}>
      <FormBuilder defaultFieldsJson={defaultFieldsJson} />
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
              <TextBox type="number" label="Logo Width" name="LOGO_WIDTH" value={180} onChange={(e) => {

                iframe.contentDocument.querySelector('#sponsorLogo').style.width = e.target.value + "px"



                setStateValue("LOGO_WIDTH", e.target.value)

              }} />

              <TextBox type="number" label="EDM Thumbnail Width" name="THUMBNAIL_WIDTH" value={180} onChange={(e) => {

                iframe.contentDocument.querySelector('#edmThumbnail').style.width = e.target.value + "px"



                setStateValue("THUMBNAIL_WIDTH", e.target.value)

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