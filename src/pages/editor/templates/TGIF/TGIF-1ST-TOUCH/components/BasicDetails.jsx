import React, { useContext } from 'react'
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
} from '../../../../components/form/index'
import { EContext } from '../../../../EditorMain'

import translations from '../translations'

const BasicDetails = () => {
  const { setStateValue, getStateValue, watch, getFormValue,setFormValue, filesRef, campData, setError,reactHookFormMethods } = useContext(EContext)
  return (
    <>
      <Section title="Details" >

        {
          (getStateValue("LINK_TYPE") == "1st_touch" || getStateValue("LINK_TYPE") == "2nd_touch") &&
          <TextBox label="Pixel Link"
            helpText='Example like https://api.anteriad.com/track/pixel?c=NTQ2MDc=&p=Njc=&ev=1&e='
            name="PIXEL_LINK" required={true} />

        }

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
                { label: "Video", value: "Video" },
                { label: "Infographic", value: "Infographic" }
              ]}
 
              onChange={(e) => {
                

                const selectedLanguage=reactHookFormMethods.getValues("LANGUAGE")
                const translation=translations.find((element) => element.language.toLowerCase() == selectedLanguage.toLowerCase() )

             
                setStateValue("SENDMAIL_BODY",translation.mailBody1.trim() )
                
                if((e.target.value!="Webinar") && (e.target.value!="Video")  ){
                  setStateValue("NORMAL_THANK_YOU_PAGE_TEXT",translation.tyPage )
                }

                switch (e.target.value) {
                  case "White Paper":
                    setStateValue("SENDMAIL_SUBJECT",translation.sub1 )
                    break;
                  case "Buyers Guide":
                    setStateValue("SENDMAIL_SUBJECT",translation.sub2 )
                    break;
                  case "E Book":
                    setStateValue("SENDMAIL_SUBJECT",translation.sub3 )
                    break;
                  case "Case Study":
                    setStateValue("SENDMAIL_SUBJECT",translation.sub4 )
                    break;
                  case "Report":
                    setStateValue("SENDMAIL_SUBJECT",translation.sub5 )
                    break;
                  case "Webinar":
                    setStateValue("SENDMAIL_SUBJECT",translation.sub6 )
                    break;
                  case "Video":
                    setStateValue("SENDMAIL_SUBJECT",translation.sub7 )
                    break;
                  case "Infographic":
                    setStateValue("SENDMAIL_SUBJECT",translation.sub8 )
                    break;

                }

              }}
            />


          </Col>
          <Col>
            <TextBox label="Text above the logo" name="SPONSORED_BY_TEXT" required={true} value="Sponsored by" />
          </Col>

          {
            (getStateValue("LINK_TYPE") == "1st_touch" || getStateValue("LINK_TYPE") == "2nd_touch") &&
            <Col>
              <SelectBox label="EDM Layout" name="EDM_LAYOUT" required={true}
                options={[
                  { label: "Select..", value: "" },
                  { label: "Traditional", value: "Traditional" },
                  { label: "Full width thumbnail and abstract", value: "Full width thumbnail and abstract" },

                ]}
              /></Col>

          }

          {
            (getStateValue("LINK_TYPE") == "1st_touch") &&
            <Col><SelectBox label="Landing Layout" name="LANDING_LAYOUT" required={true}
              options={[
                { label: "Select..", value: "" },
                { label: "Traditional", value: "Traditional" },
                { label: "Thumbnail below abstract", value: "Thumbnail below abstract" },

              ]}
            /></Col>

          }
        </Row>





      </Section>


      <Section title="Advanced Options" >
        <Row>
          <Col>
            <CheckBox label="Use Custom Footer" name="USE_CUSTOM_FOOTER" defaultChecked={false} />

            {(watch["USE_CUSTOM_FOOTER"] == true || getStateValue("USE_CUSTOM_FOOTER") == true) &&

              <RichTextEditor label="Custom Footer" name="FOOTER" required={true} value={`<p><a href="##BASE_URL##unsubscribed.html" style="">Unsubscribe</a> | ##PRIVACY_POLICY##<br /> Copyright &#169; ##YEAR## XDBS Corporation <br /> Hawthorne, CA 90250 USA<br /> 3501, Jack Northorp Ave, Ste C3873<br /></p>`} />
            }
            {(watch["USE_CUSTOM_FOOTER"] == false || getStateValue("USE_CUSTOM_FOOTER") == false) && [
              setStateValue("USE_CUSTOM_FOOTER", false),

              setStateValue("FOOTER", `<p><a href="##BASE_URL##unsubscribed.html" style="">Unsubscribe</a> | ##PRIVACY_POLICY##<br /> Copyright &#169; ##YEAR## XDBS Corporation <br /> Hawthorne, CA 90250 USA<br /> 3501, Jack Northorp Ave, Ste C3873<br /></p>`)
            ]}
            {/* {(getStateValue("FOOTER") == null)&& setFormValue( "FOOTER" , `<p><a href="##BASE_URL##unsubscribed.html" style="color: #3673b5;">Unsubscribe</a> | ##PRIVACY_POLICY##<br /> Copyright &#169; ##YEAR## XDBS Corporation <br /> Hawthorne, CA 90250 USA<br /> 3501, Jack Northorp Ave, Ste C3873</p>`)} */}
          </Col>
        </Row>
      </Section>
    </>
  )
}

export default BasicDetails