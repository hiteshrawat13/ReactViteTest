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

const LinkDetails = () => {
    
      const { setStateValue, getStateValue, watch, setFormValue, filesRef, campData, setError } = useContext(EContext)
  return (
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
  )
}

export default LinkDetails