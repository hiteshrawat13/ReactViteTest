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

const EDMDetails = () => {
          const { setStateValue, getStateValue, watch, setFormValue, filesRef, campData, setError } = useContext(EContext)
    
  return (
    <>
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
    </>
  )
}

export default EDMDetails