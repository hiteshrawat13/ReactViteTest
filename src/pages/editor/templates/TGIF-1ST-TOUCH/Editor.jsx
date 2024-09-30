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
    ZIPDownload

} from '../../components/form/index'

import publishHelper from './PublishHelper'

import  defaultFields from './default-fields.json'

import defaultFieldsJson from "./default-fields.json"

import { EContext } from '../../Editor'
import PublishHelper from './PublishHelper'
const Editor = ({campData}) => {


  const publishHelperRef=useRef(new PublishHelper())
  

  const { setValue,watch,setFormValue } =useContext(EContext)

    useEffect(()=>{
      setValue("FTP_CONFIG_NAME","TGIF")
      setValue("form",defaultFields)
      //alert("TGIF")
    },[])

  return (<Stepper    setCurrentFormValue={setWatch}  setCurrentFormMethods={setCurrentFormMethods}>

    <Step title="Basic Info"  >



        <button onClick={(e)=>{
        e.preventDefault();
        const data =JSON.parse(   localStorage.getItem("data") )
        console.log(data);
        
        setState(data)
        for (const [key, value] of Object.entries(data)) {
          setFormValue(key,value)
        }
        alert("State Loaded")
    

      
   
        
        }}    >Load State From Local Storage</button>

          <HiddenField name="BASE_URL" value="https://resource.itbusinesstoday.com/whitepapers/"/>
          <HiddenField name="YEAR" value={new Date().getFullYear()+""}/>



        <div className='section'>

          <TextBox label="Client Code" name="CLIENT_CODE" required={true} value={campData?.clientCode} width="10%" />
          {(watch["CLIENT_CODE"]==="Hitesh") && <>IT WORKS</>}
          <TextBox label="Campaign Name" name="CAMP_NAME" required={true} value={campData?.campaignName} placeholder="Campaign email subject line here" width="50%" />
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
                e.target.value=e.target.value.replace(/\s+/g, '-');
                e.target.value=e.target.value.replace(/[^a-zA-Z0-9-\.]/g, '');

                const val = e.target.value
                // setValue("THUMBNAIL_NAME",`${val}.png`)
                // setValue("PDF_NAME",`${val}.pdf`)
                // setValue("MP4_NAME",`${val}.mp4`)
                setFormValue("THUMBNAIL_NAME",`${val}.png`)
                setFormValue("PDF_NAME",`${val}.pdf`)
                setFormValue("MP4_NAME",`${val}.mp4`)
               
              }

            } />

</div>


<div className='section'>

      


        <TextBox label="Pixel Link" name="PIXEL_LINK" required={true} />

          {/* <SelectBox label="Asset Type" name="ASSET_TYPE" required={true}
            options={[
              { label: "Select..", value: "" },
              { label: "White Paper", value: "White Paper" },
              { label: "Buyers/Comparision Guide", value: "Buyers/Comparision Guide" },
              { label: "E Book", value: "E Book" },
              { label: "Case Study", value: "Case Study" },
              { label: "Report", value: "Report" },
              { label: "Webinar OnDemand", value: "Webinar OnDemand" },
              { label: "Infographic", value: "Infographic" }
            ]}
          /> */}
          <TextBox label="Text above the logo" name="SPONSORED_BY_TEXT" required={true} value="Sponsored by"/>
          </div>
        </Step>
        <Step title="Abstract & Title">


          <div className='section'>

          <TextBox label="EDM Title" name="EDM_TITLE" required={true} width="60%" />
          <RichTextEditor label="Edm Abstract" name="EDM_ABSTRACT" required={true} />
          <TextBox label="EDM Optin" name="EDM_OPTIN" required={true} value="By clicking/downloading the asset, you agree to allow the sponsor to have your contact information and for the sponsor to contact you." />
          <TextBox label="EDM CTA" name="EDM_CTA" required={true} width="20%" value="Download Now" />
          </div>
          

          <div className='section'>

          <CheckBox label="Same As EDM title" name="SAME_AS_EDM_TITLE" />
          {/* { (watch["SAME_AS_EDM_TITLE"] == true) &&  */}
          <TextBox label="Landing Page Title" name="LANDING_TITLE" required={true} /> 
          {/* } */}
          <CheckBox label="Same As EDM abstract" name="SAME_AS_EDM_ABSTRACT" />
          {/* { (watch["SAME_AS_EDM_ABSTRACT"] == true) && <> */}
          
          <button onClick={(e)=>{
            e.preventDefault();

            //using math random to update value otherwise gives blank result--
           const boxHtml=`<div class="sub" data-key="${Math.random()}" align="center" style="background-color: #e2ebf3;margin-top: 30px;margin-left: 13px;display: inline-flex;padding: 10px;width: 250px;align-items: center;"> <p style="text-align: left; margin-top: 10px;">Please fill this form to get immediate access to this exclusive resource.</p> <p><img src="https://resource.itbusinesstoday.com/whitepapers/Arrow-pr.png" alt="Arrow" style="width: 50px;  " /></p></div>`
         // const boxHtml=`<u>${Math.random()}</u>`
            
            setFormValue("LANDING_ABSTRACT", boxHtml)
            }
            
            }>Add new format</button>
          
          
          <RichTextEditor label="Landing Abstract" name="LANDING_ABSTRACT" required={true} />
          
          </div>

          <div className='section'>
          <RichTextEditor label="Thank You Page" name="THANK_YOU_PAGE" required={true} value={`
          <table width="100%" cellspacing="0" cellpadding="10" border="0" class="content_body">
                            <tbody>
                                <tr>
                                    <td align="left" class="whitepaper" style="align-items: start; display: flex;">
                                        <img   style=" height: auto !important;" alt="##EDM_TITLE##" src="##BASE_URL####LINK_NAME##.png" width="180" style="border: 1px solid #c4c5c600;" />
                                    </td>

                                    <td align="left" valign="top" class="style1 thankyou">
                                        <h1>Thank you...</h1>
        <span>for downloading <strong>"##EDM_TITLE##"</strong><br><br>
        Your download will automatically start in <span id="countdown">10</span> seconds...<br>If your download doesn't start automatically, <a href="##BASE_URL####LINK_NAME##.pdf">click here</a> to start your download.</span>

                                        <script>
                                            var timeleft = 5;
                                            var downloadTimer = setInterval(function () {
                                                if (timeleft <= 0) {
                                                    clearInterval(downloadTimer);
                                                    document.getElementById("countdown").innerHTML = "0";
                                                } else {
                                                    document.getElementById("countdown").innerHTML = timeleft + "";
                                                }
                                                timeleft -= 1;
                                            }, 1000);
                                        </script>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
          `} />




</div>
<div className='section'>
          <TextBox label="Sendmail Subject" name="SENDMAIL_SUBJECT" required={true} width="60%" value="Thank you for requesting Buyers Guide"/>

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
        </div>
 
        </Step>

      


        <Step title="Logo & Assets">
          Assets Logo
          <AssetPicker />
        </Step>


        <Step title="Form">
          Forms
          <FormBuilder defaultFieldsJson={defaultFieldsJson}/>
        </Step>

        <Step title="Preview">
          <Preview  publishHelper={publishHelperRef.current}/>
        </Step>

        <Step title="Publish">
          Publish
          <FTPUpload  publishHelper={publishHelperRef.current}/>
          <ZIPDownload publishHelper={publishHelperRef.current}/>


          
     
        </Step>

 
     </div>
  )
}

export default Editor