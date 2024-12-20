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

import defaultFieldsJson from "./default-fields.json"
import { EContext } from '../../../EditorMain'
import PublishHelper from './PublishHelper'
import Speakers from '../../../components/form/Speakers'




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
      <HiddenField name="LOGO_WIDTH" value={`${(campData?.jsonObject?.LOGO_WIDTH) ? campData?.jsonObject?.LOGO_WIDTH : "180"}`} />
      <HiddenField name="BASE_URL" value="https://resource.itbusinesstoday.com/whitepapers/cbtool_test/" />
      <HiddenField name="YEAR" value={new Date().getFullYear() + ""} />
      <Section title="Link Details">


        <Row>
          <Col>
            <LanguageInput />
          </Col>
          <Col>
            <TextBox label="Client Code" name="CLIENT_CODE" required={true} value={campData?.clientCode} readOnly />
            {(watch["CLIENT_CODE"] === "TEST") && <>IT WORKS</>}
            {/* {(watch["CLIENT_CODE"] === "TEST2") && setError("CLIENT_CODE","LINK ALREADY EXISTS")} */}

          </Col>
          <Col><TextBox label="Link Type" name="LINK_TYPE" required={true} value={campData?.templateType} readOnly /></Col>
          <Col><TextBox label="Template Id" name="TEMPLATE_ID" required={true} value={campData?.templateId} readOnly /></Col>
        </Row>

        <Row>

          <Col>


            <Row>
              <Col><SelectBox label="Region" name="REGION" value={campData?.country} required={true} readOnly
                options={[
                  { label: "Select..", value: "" },
                  { label: "EU", value: "EU" },
                  { label: "NON-EU", value: "NON-EU" },
                  { label: "CASL", value: "CASL" },
                  { label: "Both ( NON-EU & CASL )", value: "BOTH" }
                ]}
                width="100%"
              /></Col>
              <Col>
                <TextBox label="Campaign Id" name="CAMP_ID" required={true} value={campData?.campaignId} readOnly />
              </Col>

            </Row>
          </Col>


          <Col>
            <TextBox label="Campaign Name" name="CAMP_NAME" required={true} value={campData?.campaignName} placeholder="Campaign email subject line here" readOnly />
          </Col>


        </Row>


        <Row>

          <Col>
            <TextBox label="Link Name" name="LINK_NAME" required={true} width="100%" readOnly={campData.mode === 'edit'}

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


            }} />}
          </Col>
        </Row>
 
      </Section>



  





      <Section title="Details" >



        <TextBox label="Pixel Link" name="PIXEL_LINK" required={true} />

        <Row>
          <Col>
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
          </Col>
          <Col>
            <TextBox label="Text above the logo" name="SPONSORED_BY_TEXT" required={true} value="Sponsored by" />
          </Col>

          <Col>
            <SelectBox label="EDM Layout" name="EDM_LAYOUT" required={true}
              options={[
                { label: "Select..", value: "" },
                { label: "Traditional", value: "Traditional" },
                { label: "Full width thumbnail and abstract", value: "Full width thumbnail and abstract" },

              ]}
            /></Col>
          <Col><SelectBox label="Landing Layout" name="LANDING_LAYOUT" required={true}
            options={[
              { label: "Select..", value: "" },
              { label: "Traditional", value: "Traditional" },
              { label: "Thumbnail below abstract", value: "Thumbnail below abstract" },

            ]}
          /></Col>
        </Row>


       


      </Section>


      <Section title="Advanced Options" >
      <Row>
          <Col>
            <CheckBox label="Use Custom Footer" name="USE_CUSTOM_FOOTER" defaultChecked={false} />
            {console.log(watch["USE_CUSTOM_FOOTER"] ,"USE_CUSTOM_FOOTER=================")
      }
            {(watch["USE_CUSTOM_FOOTER"] == true || getStateValue("USE_CUSTOM_FOOTER") == true) &&

              <RichTextEditor label="Custom Footer" name="FOOTER" required={true} value={`<p><a href="##BASE_URL##unsubscribed.html" style="color: #3673b5;">Unsubscribe</a> | ##PRIVACY_POLICY##<br /> Copyright &#169; ##YEAR## XDBS Corporation <br /> Hawthorne, CA 90250 USA<br /> 3501, Jack Northorp Ave, Ste C3873<br /></p>`} />
            }
            {(watch["USE_CUSTOM_FOOTER"] == false || getStateValue("USE_CUSTOM_FOOTER") == false) && [
              setStateValue("USE_CUSTOM_FOOTER", false),

              setStateValue("FOOTER", `<p><a href="##BASE_URL##unsubscribed.html" style="color: #3673b5;">Unsubscribe</a> | ##PRIVACY_POLICY##<br /> Copyright &#169; ##YEAR## XDBS Corporation <br /> Hawthorne, CA 90250 USA<br /> 3501, Jack Northorp Ave, Ste C3873<br /></p>`)
            ]}
            {/* {(getStateValue("FOOTER") == null)&& setFormValue( "FOOTER" , `<p><a href="##BASE_URL##unsubscribed.html" style="color: #3673b5;">Unsubscribe</a> | ##PRIVACY_POLICY##<br /> Copyright &#169; ##YEAR## XDBS Corporation <br /> Hawthorne, CA 90250 USA<br /> 3501, Jack Northorp Ave, Ste C3873</p>`)} */}
          </Col>
        </Row>
      </Section>


    </Step>



    <Step title="Abstract & Title" key={1102}>
      <Section title="EDM Details">

        <Row>
          <Col><TextBox label="EDM Title" name="EDM_TITLE" required={true} width="100%"
            onChange={
              (e) => {

                const val = e.target.value

                setFormValue("ASSET_TITLE", `${val}`)

              }
            }
          /></Col>
          <Col><TextBox label="EDM Sub Title" name="EDM_SUB_TITLE" required={false} width="100%" /></Col>
        </Row>



        <RichTextEditor label="Edm Abstract" name="EDM_ABSTRACT" required={true} />
        <TextBox label="EDM Optin" name="EDM_OPTIN" required={true} value="By clicking/downloading the asset, you agree to allow the sponsor to have your contact information and for the sponsor to contact you." html/>

        <Row>
          <Col> <TextBox label="EDM CTA" name="EDM_CTA" required={true} value="Download Now" /></Col>
          <Col>
            <RadioGroup name="EDM_CTA_ALIGNMENT" label="CTA Alignment" options={[
              { label: "Left", value: "left" },
              { label: "Center", value: "center" },
              { label: "Right", value: "right" },

            ]} />
          </Col>
        </Row>

        <TextBox label="Add Text Below the CTA Button" name="EDM_TEXT_BELOW_CTA" html />
      </Section>


      <Section title="Landing Page Details">
        <CheckBox label="Landing title is same as EDM title" name="LANDING_TITLE_SAME_AS_EDM_TITLE" defaultChecked={true} />
        {(watch["LANDING_TITLE_SAME_AS_EDM_TITLE"] == false) &&
          <TextBox label="Landing Page Title" name="LANDING_TITLE" required={true} />
        }

        <CheckBox label="Landing abstract is same as EDM abstract" name="LANDING_ABSTRACT_SAME_AS_EDM_ABSTRACT" defaultChecked={true} />
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
          }>Add new format</button>
          <RichTextEditor label="Landing Abstract" name="LANDING_ABSTRACT" required={true} />
        </>}



      </Section>



    {/* Speakers Section */}
    <Section title="Speakers">
      <CheckBox label="Show Speakers" name="SHOW_SPEAKERS" defaultChecked={false} />

       
    
       { (watch["SHOW_SPEAKERS"] === true  || getStateValue("SHOW_SPEAKERS") ==true )   &&
        [<TextBox label="Speaker Heading" name="SPEAKER_HEADING" required={true}    />,
        <Speakers name="SPEAKERS" filesRef={filesRef}/>,
        <CheckBox label="Show Speakers on Landing Page" name="SHOW_SPEAKERS_ON_LANDING_PAGE" defaultChecked={false} />
      ]
       }
      { watch["SHOW_SPEAKERS"] === false && [setStateValue("SHOW_SPEAKERS",false)]}
        
      </Section>



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
      <Section title="Sendmail Details">
        <TextBox label="Sendmail Subject" name="SENDMAIL_SUBJECT" required={true} width="60%" value={`Thank you for requesting a ${getStateValue("ASSET_TYPE")}`} />
        <RichTextEditor label="Sendmail Body" name="SENDMAIL_BODY" required={true} value={`<table>
<tr><td>Dear&nbsp;<b>$firstname,</b></td></tr>
<tr><td>&nbsp;</td></tr>
<tr><td>Thank you for requesting <b>"##ASSET_TITLE##"</b>. You can view it immediately by clicking <a href='##BASE_URL####LINK_NAME##.pdf'>HERE</a>!</td></tr>
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

        <Row>
          <Col><LogoInput name="LOGO_NAME" label="Logo" tag="logo" fileRef={filesRef.current.fileInput1} /></Col>
          <Col>
            <FileInput name="THUMBNAIL_NAME" label="Thumbnail" tag="file" fileRef={filesRef.current.fileInput2} />
            <CheckBox label="Add border to thumbnail" name="THUMBNAIL_BORDER" defaultChecked={true} />
          </Col>
        </Row>



        <CheckBox label="Use different thumbnail for edm page" name="USE_DIFFERENT_THUMBNAIL_FOR_EDM_PAGE" />

        {(watch["USE_DIFFERENT_THUMBNAIL_FOR_EDM_PAGE"] == true) &&
          <FileInput name="EDM_THUMBNAIL_NAME" label="EDM Thumbnail" tag="file" fileRef={filesRef.current.fileInput3} />
        }


     

      </Section>


  


      <Section title="Asset">

        <TextBox label="Asset Title" name="ASSET_TITLE" required={true} helpText={`Asset title will be displayed in thanks.php and sendmail.php file.`}/>


        <RadioGroup name="ASSET_FORMAT" label="Asset Format" required={true} options={[
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




      <Section title="Image Below Abstract">
      <Row>
        <Col>
          <CheckBox label="Show Image Below Abstract" name="SHOW_IMAGE_BELOW_ABSTRACT" defaultChecked={false}/>
          {(watch["SHOW_IMAGE_BELOW_ABSTRACT"] == true) &&
          
          [<FileInput name="IMAGE_BELOW_ABSTRACT" label="Image Below Abstract" tag="file" fileRef={filesRef.current.fileInput9} onFileChange={(filename) => { setFormValue("IMAGE_BELOW_ABSTRACT",filename) }} />
          ,<TextBox label="IMAGE_BELOW_ABSTRACT_WIDTH" required="true" name="IMAGE_BELOW_ABSTRACT_WIDTH" value={'20%'} />
          ,<CheckBox label="Show on Landing Page" name="SHOW_IMAGE_BELOW_ABSTRACT_ON_LANDING_PAGE" defaultChecked={false} />]
          }
        </Col>
      </Row>
      </Section>




 {/* Extra Files Upload Section Start*/}
 <Section title="Extra files to upload">
   
   <Row>
     <Col>
       <CheckBox label="Upload Extra File [EXTRA_FILE_1]" name="ADD_EXTRA_FILE_1" defaultChecked={false} />
       {(watch["ADD_EXTRA_FILE_1"] == true) &&
         <FileInput name="EXTRA_FILE_1" label="Extra File 1" tag="file" fileRef={filesRef.current.fileInput4} onChange={(e) => { setFormValue("EXTRA_FILE_1",e.target.value) }} />
       }
     </Col>
   </Row>

   <Row>
     <Col>
       <CheckBox label="Upload Extra File [EXTRA_FILE_2]" name="ADD_EXTRA_FILE_2" defaultChecked={false}/>
       {(watch["ADD_EXTRA_FILE_2"] == true) &&
         <FileInput name="EXTRA_FILE_2" label="Extra File 2" tag="file" fileRef={filesRef.current.fileInput5} onChange={(e) => { setFormValue("EXTRA_FILE_2",e.target.value) }} />
       }
     </Col>
   </Row>

   <Row>
     <Col>
       <CheckBox label="Upload Extra File [EXTRA_FILE_3]" name="ADD_EXTRA_FILE_3" defaultChecked={false}/>
       {(watch["ADD_EXTRA_FILE_3"] == true) &&
         <FileInput name="EXTRA_FILE_3" label="Extra File 3" tag="file" fileRef={filesRef.current.fileInput6} onChange={(e) => {  setFormValue("EXTRA_FILE_3",e.target.value) }} />
       }
     </Col>
   </Row>

   <Row>
     <Col>
       <CheckBox label="Upload Extra File [EXTRA_FILE_4]" name="ADD_EXTRA_FILE_4" defaultChecked={false}/>
       {(watch["ADD_EXTRA_FILE_4"] == true) &&
         <FileInput name="EXTRA_FILE_4" label="Extra File 4" tag="file" fileRef={filesRef.current.fileInput7} onChange={(e) => { setFormValue("EXTRA_FILE_4",e.target.value) }} />
       }
     </Col>
   </Row>

   <Row>
     <Col>
       <CheckBox label="Upload Extra File [EXTRA_FILE_5]" name="ADD_EXTRA_FILE_5" defaultChecked={false} />
       {(watch["ADD_EXTRA_FILE_5"] == true) &&
         <FileInput name="EXTRA_FILE_5" label="Extra File 5" tag="file" fileRef={filesRef.current.fileInput8} onChange={(e) => { setFormValue("EXTRA_FILE_5",e.target.value) }} />
       }
     </Col>
   </Row>
{/*  
   <Row>
     <Col>
       <CheckBox label="Upload Extra File [EXTRA_FILE_6]" name="ADD_EXTRA_FILE_6" defaultChecked={false} />
       {(watch["ADD_EXTRA_FILE_6"] == true) &&
         <FileInput name="EXTRA_FILE_6" label="Extra File 6" tag="file" fileRef={filesRef.current.fileInput9} onChange={(e) => { setFormValue("EXTRA_FILE_6",e.target.value) }} />
       }
     </Col>
   </Row>
 
   <Row>
     <Col>
       <CheckBox label="Upload Extra File [EXTRA_FILE_7]" name="ADD_EXTRA_FILE_7" defaultChecked={false}/>
       {(watch["ADD_EXTRA_FILE_7"] == true) &&
         <FileInput name="EXTRA_FILE_7" label="Extra File 7" tag="file" fileRef={filesRef.current.fileInput10} onChange={(e) => { setFormValue("EXTRA_FILE_7",e.target.value) }} />
       }
     </Col>
   </Row>

   <Row>
     <Col>
       <CheckBox label="Upload Extra File [EXTRA_FILE_8]" name="ADD_EXTRA_FILE_8" defaultChecked={false}/>
       {(watch["ADD_EXTRA_FILE_8"] == true) &&
         <FileInput name="EXTRA_FILE_8" label="Extra File 8" tag="file" fileRef={filesRef.current.fileInput11} onChange={(e) => { setFormValue("EXTRA_FILE_8",e.target.value) }} />
       }
     </Col>
   </Row>

   <Row>
     <Col>
       <CheckBox label="Upload Extra File [EXTRA_FILE_9]" name="ADD_EXTRA_FILE_9" defaultChecked={false}/>
       {(watch["ADD_EXTRA_FILE_9"] == true) &&
         <FileInput name="EXTRA_FILE_9" label="Extra File 9" tag="file" fileRef={filesRef.current.fileInput12} onChange={(e) => { setFormValue("EXTRA_FILE_9",e.target.value) }} />
       }
     </Col>
   </Row>

   <Row>
     <Col>
       <CheckBox label="Upload Extra File [EXTRA_FILE_10]" name="ADD_EXTRA_FILE_10" defaultChecked={false}/>
       {(watch["ADD_EXTRA_FILE_10"] == true) &&
         <FileInput name="EXTRA_FILE_10" label="Extra File 10" tag="file" fileRef={filesRef.current.fileInput13} onChange={(e) => {  setFormValue("EXTRA_FILE_10",e.target.value)  }} />
       }
     </Col>
   </Row> */}

 </Section>
 {/* Extra Files Upload Section End */}



    </Step>


    <Step title="Form" key={1104}>
      <Section>
        <FormBuilder defaultFieldsJson={defaultFieldsJson} />
      </Section>
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


                


                  {(getStateValue( "SHOW_IMAGE_BELOW_ABSTRACT" ) == true) &&
          
                <TextBox type="text" label="Logo Width" name="IMAGE_BELOW_ABSTRACT_WIDTH" onChange={(e) => {
                  console.log(e);
                  if(!e.target.value.endsWith("%")){
                    alert("Please add percentage sign.")
                    return
                  }
                  iframe.contentDocument.querySelector('.image_below_abstract').style.width = e.target.value + ""
               
                  setStateValue("IMAGE_BELOW_ABSTRACT_WIDTH", e.target.value)
                }} /> }


                {}

              </div>
            </>
          }
        } />
      </Section>
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