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
const HiddenData = () => {
      const { setStateValue, getStateValue, watch, setFormValue, filesRef, campData, setError } = useContext(EContext)
  return (
    <>
          <HiddenField name="FTP_CONFIG_NAME" value="TGIF" />
          <HiddenField name="LOGO_FOLDER" value="logo/" />
          <HiddenField name="LOGO_WIDTH" value={`${(campData?.jsonObject?.LOGO_WIDTH) ? campData?.jsonObject?.LOGO_WIDTH : "90"}`} />
          <HiddenField name="BASE_URL" value="https://resource.itbusinesstoday.com/whitepapers/" />
          <HiddenField name="YEAR" value={new Date().getFullYear() + ""} />
    </>
  )
}

export default HiddenData