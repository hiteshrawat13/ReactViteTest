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
  AssetPicker,
  FTPUpload,
  Preview,
  ZIPDownload,

  ThumbnailInput,
  LogoInput,
  AssetInput

} from '../../components/form/index'



import defaultFields from './default-fields.json'

import defaultFieldsJson from "./default-fields.json"

import { EContext } from '../../Editor'
import PublishHelper from './PublishHelper'
import Section from '../../components/form/Section'
import Row from '../../components/form/Row'
import Col from '../../components/form/Col'
const Editor = ({ campData }) => {


  const publishHelperRef = useRef(new PublishHelper())


  const { setValue,getValue, watch, setFormValue } = useContext(EContext)

  useEffect(() => {
    setValue("FTP_CONFIG_NAME", "TGIF")
    setValue("form", defaultFields)
    //alert("TGIF")
  }, [])

  return (<Stepper >

    <Step title="Basic Info"  key={1101}>




      <button onClick={(e) => {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem("data"))
        console.log(data);

        for (const [key, value] of Object.entries(data)) {
          setFormValue(key, value)
        }
        setValue("form", data.form)
        alert("State Loaded")

      }} >Load State From Local Storage</button>

      <HiddenField name="BASE_URL" value="https://resource.itbusinesstoday.com/whitepapers/" />
      <HiddenField name="YEAR" value={new Date().getFullYear() + ""} />



      <Section title="Link Details">

        <Row>
          <Col>
            <TextBox label="Client Code" name="CLIENT_CODE" required={true} value={campData?.clientCode} />
            {(watch["CLIENT_CODE"] === "Hitesh") && <>IT WORKS</>}
          </Col>
          <Col>
            <TextBox label="Campaign Name" name="CAMP_NAME" required={true} value={campData?.campaignName} placeholder="Campaign email subject line here" />
          </Col>
        </Row>



        <TextBox label="Campaign Id" name="CAMP_ID" required={true} value={campData?.campaignId} width="10%" />
        <SelectBox label="Region" name="REGION" value={campData?.country} required={true}
          options={[
            { label: "Select..", value: "" },
            { label: "EU", value: "EU" },
            { label: "NON-EU", value: "NON-EU" },
            { label: "CASL", value: "CASL" },
            { label: "Both ( NON-EU & CASL )", value: "BOTH" }
          ]}
          width="10%"
        />

        <TextBox label="Link Name" name="LINK_NAME" required={true} width="50%"

          onChange={
            (e) => {
              //console.log(e.target.value);
              e.target.value = e.target.value.replace(/\s+/g, '-');
              e.target.value = e.target.value.replace(/[^a-zA-Z0-9-\.]/g, '');

              const val = e.target.value
              // setValue("THUMBNAIL_NAME",`${val}.png`)
              // setValue("PDF_NAME",`${val}.pdf`)
              // setValue("MP4_NAME",`${val}.mp4`)
              setFormValue("THUMBNAIL_NAME", `${val}.png`)
              setFormValue("PDF_NAME", `${val}.pdf`)
              setFormValue("MP4_NAME", `${val}.mp4`)

            }

          } />

      </Section>


      <Section title="Details" >




        <TextBox label="Pixel Link" name="PIXEL_LINK" required={true} />

         <SelectBox label="Asset Type" name="ASSET_TYPE" required={true}
            options={[
              { label: "Select..", value: "" },
              { label: "White Paper", value: "White Paper" },
              { label: "Buyers/Comparision Guide", value: "Buyers Guide" },
              { label: "E Book", value: "E Book" },
              { label: "Case Study", value: "Case Study" },
              { label: "Report", value: "Report" },
              { label: "Webinar OnDemand", value: "Webinar" },
              { label: "Infographic", value: "Infographic" }
            ]}
          /> 
        <TextBox label="Text above the logo" name="SPONSORED_BY_TEXT" required={true} value="Sponsored by" />


        <SelectBox label="EDM Layout" name="EDM_LAYOUT" required={true}
            options={[
              { label: "Select..", value: "" },
              { label: "Traditional", value: "Traditional" },
              { label: "Full width thumbnail and abstract", value: "Full width thumbnail and abstract" },
 
            ]}
          /> 


        <SelectBox label="Landing Layout" name="LANDING_LAYOUT" required={true}
            options={[
              { label: "Select..", value: "" },
              { label: "Traditional", value: "Traditional" },
              { label: "Thumbnail below abstract", value: "Thumbnail below abstract" },
 
            ]}
        /> 


      </Section>

      
    </Step>
    <Step title="Abstract & Title" key={1102}>


      <Section title="EDM Details">

        <TextBox label="EDM Title" name="EDM_TITLE" required={true} width="60%" />
        <RichTextEditor label="Edm Abstract" name="EDM_ABSTRACT" required={true} />
        <TextBox label="EDM Optin" name="EDM_OPTIN" required={true} value="By clicking/downloading the asset, you agree to allow the sponsor to have your contact information and for the sponsor to contact you." />
        <TextBox label="EDM CTA" name="EDM_CTA" required={true} width="20%" value="Download Now" />
      </Section>


      <Section title="Landing Page Details">

        <CheckBox label="Same As EDM title" name="LANDING_TITLE_SAME_AS_EDM_TITLE" />

         { (watch["LANDING_TITLE_SAME_AS_EDM_TITLE"] == false) && 
        <TextBox label="Landing Page Title" name="LANDING_TITLE" required={true} />
         } 


        <CheckBox label="Same As EDM abstract" name="LANDING_ABSTRACT_SAME_AS_EDM_ABSTRACT" defaultChecked={true}/>
        { (watch["LANDING_ABSTRACT_SAME_AS_EDM_ABSTRACT"] == false) && <>  

        <button onClick={(e) => {
          e.preventDefault();
          //using math random to update value otherwise gives blank result--
          const boxHtml = `<div class="sub" data-key="${Math.random()}" align="center" style="background-color: #e2ebf3;margin-top: 30px;margin-left: 13px;display: inline-flex;padding: 10px;width: 250px;align-items: center;"> <p style="text-align: left; margin-top: 10px;">Please fill this form to get immediate access to this exclusive resource.</p> <p><img src="https://resource.itbusinesstoday.com/whitepapers/Arrow-pr.png" alt="Arrow" style="width: 50px;  " /></p></div>`
          setFormValue("LANDING_ABSTRACT", boxHtml)
        }

        }>Add new format</button>


        <RichTextEditor label="Landing Abstract" name="LANDING_ABSTRACT" required={true} />

        </>}



      </Section>
      { (getValue( "ASSET_TYPE") != "Webinar") && 
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
      <Section title="Sendmail Details">
        <TextBox label="Sendmail Subject" name="SENDMAIL_SUBJECT" required={true} width="60%" value="Thank you for requesting a ##ASSET_TYPE##" />

        <RichTextEditor label="Sendmail Body" name="SENDMAIL_BODY" required={true} value={`<table>
				
				 <tr><td>Dear&nbsp;<b>$firstname,</b></td></tr>
				 <tr><td>&nbsp;</td></tr>
				 <tr><td>Thank you for requesting <b>\"##EDM_TITLE##\"</b>. You can view it immediately by clicking <a href='##BASE_URL####LINK_NAME##.pdf'>HERE</a>!</td></tr>
				 <tr><td>&nbsp;</td></tr>

				 <tr><td>&nbsp;</td></tr>
				 <tr><td>Sincerely,</td></tr>
				 <tr><td>Nina Ridgeway</td></tr>
				 <tr><td>ITBusinessToday</td></tr>
				 
				</table>`} />
      </Section>

    </Step>




    <Step title="Logo & Assets" key={1103}>
      
          <Section title="Logo & Thumbnail">
      <LogoInput/>
      <ThumbnailInput/>
      </Section>

      <Section title="Logo & Thumbnail">
      <AssetInput/>

      </Section>


      <Section title="Logo Dimensions">
      <TextBox type="number" label="Logo Width" name="LOGO_WIDTH"  value={180}/>
      </Section>
    </Step>


    <Step title="Form" key={1104}>
      Forms
      <FormBuilder defaultFieldsJson={defaultFieldsJson} />
    </Step>

    <Step title="Preview" key={1105}>
      <Preview publishHelper={publishHelperRef.current}  />
    </Step>

    <Step title="Publish" key={1106}>
      Publish
      <FTPUpload publishHelper={publishHelperRef.current} />
      <ZIPDownload publishHelper={publishHelperRef.current} />




    </Step>


  </Stepper>
  )
}

export default Editor