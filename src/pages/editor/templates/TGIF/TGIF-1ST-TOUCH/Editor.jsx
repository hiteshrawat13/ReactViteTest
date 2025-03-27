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
  ExtraFiles,
  TextArea,
  NumberInput
} from '../../../components/form/index'

import defaultFieldsJson from "./default-fields.json"
import { EContext } from '../../../EditorMain'
import PublishHelper from './PublishHelper'
import BasicDetails from './components/BasicDetails'
import EDMDetails from './components/EDMDetails'
import HiddenData from './components/HiddenData'





const Editor = ({ }) => {


  const publishHelperRef = useRef(new PublishHelper())
  const { setStateValue, getStateValue, watch, getFormValue, setFormValue, filesRef, campData, setError, state } = useContext(EContext)


  return (<Stepper >

    <Step title="Start" key={11065}>

      <Section title="Disclaimer">
        <div className="disclaimer">
          <p><span className="important">Important Notice:</span> When using the Campaign Builder Tool, please ensure you follow the guidelines below to avoid potential issues:</p>
          <ul style={{ marginLeft: "30px" }}>
            <li><strong>Duplicate File Names:</strong> Ensure that you do not upload files with duplicate names to the FTP server. Duplicate file names may result in overwriting or errors in your campaign.</li>
            <li><strong>Logo and Title Abstract:</strong> Verify that your logo and title abstract are correctly uploaded and appear as intended. A missing or incorrect logo/title can affect the professional appearance of your campaign.</li>
            <li><strong>PDF and Webinar Links:</strong> Double-check that all PDF documents and webinar links are functioning correctly. Broken or incorrect links may hinder user access to important content.</li>
            <li><strong>Form Fields:</strong> Review all form fields to ensure they are properly configured. Incorrect or missing form fields may result in inaccurate data collection or broken functionality.</li>
            <li><strong>CTA Names:</strong> Verify that the Call-to-Action (CTA) buttons and links, including form fields CTA and EDM CTA, are correctly labeled and linked to the intended actions.</li>
            <li><strong>Privacy Policies:</strong> Make sure that your privacy policy links are correctly included and lead to the appropriate document to ensure compliance with legal requirements.</li>
            <li><strong>Thumbnails:</strong> Confirm that all thumbnails are correctly uploaded and display as expected across all devices and platforms.</li>
            <li><strong>Link Checking:</strong> After creating your campaign, carefully check and test all links to ensure they are functioning as intended. Broken or incorrect links can lead to poor user experience and campaign performance.</li>
          </ul>
          <p>By using this tool, you agree to carefully review and verify the elements listed above to ensure a smooth and effective campaign execution.</p>
        </div>

      </Section>
    </Step>

    <Step title="Basic Info" key={1101}>


      <HiddenData />

      <LinkDetails />
      <BasicDetails />

      <Section title="Double Optin">
        {JSON.stringify(watch["IS_DOUBLE_OPTIN"])}
        <CheckBox label="Add Double Optin to this link" name="IS_DOUBLE_OPTIN" defaultChecked={getStateValue("IS_DOUBLE_OPTIN")} />




        {(watch["IS_DOUBLE_OPTIN"] == true || (watch["IS_DOUBLE_OPTIN"] == undefined && getStateValue("IS_DOUBLE_OPTIN") == true)) && <>


          <RichTextEditor label="Double Optin Content" name="DOUBLE_OPTIN_CONTENT" required={true} value={`
<h1>Thank you...</h1>
<span>  
 Thank you for your interest and registering for this [Sponsor Name] asset.
<br><br>
You will receive a confirmation email shortly with a link to download this content.
<br><br>
If you do not receive the link in your inbox, also check your junk/spam folder if the email was marked with the link.
<br><br>
The email and link are both from "ITBusinessToday".
</span>`} />

          <TextArea label="Countries List" helpText={`Leave empty to apply double optin on all countries.`} name="DOUBLE_OPTIN_COUNTRIES" />
          <TextBox label="Country Form Filed's name attribute" name="DOUBLE_OPTIN_COUNTRY_FIELD_NAME_ATTRIBUTE" required={true} />

        </>}


      </Section>
    </Step>



    <Step title="Abstract & Title" key={1102}>
      <Section title="EDM Details">
        <EDMDetails />
      </Section>


      {
        (getStateValue("LINK_TYPE") == "1st_touch") &&


        <Section title="Landing Page Details">
          <CheckBox label="Landing title is same as EDM title" name="LANDING_TITLE_SAME_AS_EDM_TITLE" defaultChecked={true}  />
          {(watch["LANDING_TITLE_SAME_AS_EDM_TITLE"] == false) &&
          <>
           <TextBox label="Landing Page Title" name="LANDING_TITLE" required={true}

onChange={
  (e) => {
    const val = e.target.value
    setFormValue("ASSET_TITLE", `${val}`)
  }
}
/>
            
            </>
          }
         

          <CheckBox label="Landing abstract is same as EDM abstract" name="LANDING_ABSTRACT_SAME_AS_EDM_ABSTRACT" defaultChecked={false} />
          {(watch["LANDING_ABSTRACT_SAME_AS_EDM_ABSTRACT"] == false) && <>
            <button onClick={(e) => {
              e.preventDefault();
              //using math random to update value otherwise gives blank result--
              const boxHtml = `<div align="center"><div class="sub" data-key="${Math.random()}" align="center" style="background-color: #e2ebf3;margin-top: 30px; display: flex;padding: 10px;width: 250px;align-items: center;">
            <p style="text-align: left; margin-top: 10px;">Please fill this form to get immediate access to this exclusive resource.</p>
            <div><img src="https://resource.itbusinesstoday.com/whitepapers/Arrow-pr.png" alt="Arrow" style="width: 50px;  " /></div>
            </div>
            </div>`
              setFormValue("LANDING_ABSTRACT", boxHtml)
            }
            }>Add new format of Landing Page</button>
            <RichTextEditor label="Landing Abstract" name="LANDING_ABSTRACT" required={true} value={`<div align="center"><div class="sub" data-key="${Math.random()}" align="center" style="background-color: #e2ebf3;margin-top: 30px; display: flex;padding: 10px;width: 250px;align-items: center;">
            <p style="text-align: left; margin-top: 10px;">Please fill this form to get immediate access to this exclusive resource.</p>
            <div><img src="https://resource.itbusinesstoday.com/whitepapers/Arrow-pr.png" alt="Arrow" style="width: 50px;  " /></div>
            </div>
            </div>`} />

          </>}



        </Section>
      }

      {
        (getStateValue("LINK_TYPE") == "1st_touch" || getStateValue("LINK_TYPE") == "2nd_touch") &&

        <SpeakerDetails />

      }



      {(getStateValue("ASSET_TYPE") != "Webinar") &&
        <>
          <Section title="Thankyou Page Details">
            <RichTextEditor label="Thank You Page" name="NORMAL_THANK_YOU_PAGE_TEXT" required={true} />


          </Section>

        </>

      }



      {
        (getStateValue("LINK_TYPE") == "1st_touch") &&
        <Section title="Sendmail Details">
          <TextBox label="Sendmail Subject" name="SENDMAIL_SUBJECT" required={true} width="60%" value={`Thank you for requesting a ${getStateValue("ASSET_TYPE")}`} />
          <RichTextEditor label="Sendmail Body" name="SENDMAIL_BODY" required={true} />
        </Section>

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


            <br />
            <CheckBox label="Add border to thumbnail" name="THUMBNAIL_BORDER" defaultChecked={true} />
            <TextBox label="EDM Thumbnail width" name="EDM_THUMBNAIL_WIDTH" required={true} value="260px" helpText={`In % or px`} />
            <CheckBox label="Use different thumbnail for edm page" name="USE_DIFFERENT_THUMBNAIL_FOR_EDM_PAGE" />

            {(watch["USE_DIFFERENT_THUMBNAIL_FOR_EDM_PAGE"] == true) &&
              <FileInput name="EDM_THUMBNAIL_NAME" label="EDM Thumbnail" tag="file" fileRef={filesRef.current.fileInput3} />
            }


            <CheckBox label="Hide all thumbnails" name="HIDE_THUMBNAIL" defaultChecked={false} />
          </Col>
        </Row>








      </Section>




      {/* Asset Details */}
      <AssetDetails />




      {/* Extra Image */}
      <Section title="Extra Image Below the Abstract">
        <Row>
          <Col>
            <CheckBox label="Add extra Image Below the Abstract" name="SHOW_IMAGE_BELOW_ABSTRACT" defaultChecked={false} />
            {(watch["SHOW_IMAGE_BELOW_ABSTRACT"] == true) &&

            <div className='insetLeft'>
<FileInput name="IMAGE_BELOW_ABSTRACT" label="Image Below Abstract" tag="file" fileRef={filesRef.current.fileInput9} onFileChange={(filename) => { setFormValue("IMAGE_BELOW_ABSTRACT", filename) }} />
<TextBox label="IMAGE_BELOW_ABSTRACT_WIDTH" required="true" name="IMAGE_BELOW_ABSTRACT_WIDTH" value={'20%'} />
<CheckBox label="Show extra image on Landing Page" name="SHOW_IMAGE_BELOW_ABSTRACT_ON_LANDING_PAGE" defaultChecked={false} />
            </div>
 
            }
          </Col>
        </Row>
      </Section>



      {/* Extra Files Section */}
      <ExtraFiles />



    </Step>

    {
      (getStateValue("LINK_TYPE") == "1st_touch") &&
      <Step title="Form" key={1104}>
        <Section>
          <FormBuilder defaultFieldsJson={defaultFieldsJson} />
        </Section>
      </Step>

    }

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
                <TextBox type="number" label="Logo Width (px)" name="LOGO_WIDTH" onChange={(e) => {
                  console.log(e);
                  iframe.contentDocument.querySelector('.splogo').style.width = e.target.value + "px"
                  console.log(iframe.contentDocument.querySelector('.splogo'));
                  setStateValue("LOGO_WIDTH", e.target.value)
                }} />





                {
                  (getStateValue("SHOW_IMAGE_BELOW_ABSTRACT") == true) &&



                  <NumberInput
                    label="Image Below Abstract Width"
                    name="IMAGE_BELOW_ABSTRACT_WIDTH"
                    helpText='enter values in px'
                    required={true}
                    hasSuffix={true}
                    suffixOptions={['px']}
                    onChange={(value) => {


                      iframe.contentDocument.querySelector('.image_below_abstract').style.width = value

                      setStateValue("IMAGE_BELOW_ABSTRACT_WIDTH", value)
                    }} />



                }





                <NumberInput
                  label="EDM Thumbnail Width"
                  name="EDM_THUMBNAIL_WIDTH"
                  helpText='enter values in % or px'
                  required={true}
                  hasSuffix={true}
                  suffixOptions={['px']}
                  onChange={(value) => {


                    iframe.contentDocument.querySelectorAll('.edm_thumbnail').forEach((element) => {
                      element.style.width = value
                    });

                    setStateValue("EDM_THUMBNAIL_WIDTH", value)
                  }} />


                {/* <TextBox type="text" label="EDM Thumbnail width" helpText='enter values in % or px' name="EDM_THUMBNAIL_WIDTH" onChange={(e) => {
                  console.log(e);

                  iframe.contentDocument.querySelector('.edm_thumbnail').style.width = e.target.value + ""

                  setStateValue("EDM_THUMBNAIL_WIDTH", e.target.value)
                }} /> */}







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