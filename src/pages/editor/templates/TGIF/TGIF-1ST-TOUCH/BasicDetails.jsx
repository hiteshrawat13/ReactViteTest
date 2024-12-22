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
  } from '../../../components/form/index'
import { EContext } from '../../../EditorMain'
const BasicDetails = () => {
      const { setStateValue, getStateValue, watch, setFormValue, filesRef, campData, setError } = useContext(EContext)
  return (
    <>
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
    </>
  )
}

export default BasicDetails