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
  } from './index'
  import { EContext } from '../../EditorMain'
  import Speakers from './Speakers'

const SpeakerDetails = () => {
      const { setStateValue, getStateValue, watch, setFormValue, filesRef, campData, setError } = useContext(EContext)
  return (
    <>
        <Section title="Speakers">
      <CheckBox label="Show Speakers" name="SHOW_SPEAKERS" defaultChecked={false} />

       
    
       { (watch["SHOW_SPEAKERS"] === true  || getStateValue("SHOW_SPEAKERS") ==true )   &&
        [<TextBox label="Speaker Heading" name="SPEAKER_HEADING" required={true}   key={36598521} />,
        <Speakers name="SPEAKERS" filesRef={filesRef} key={365985217844}/>,
        <CheckBox label="Show Speakers on Landing Page" name="SHOW_SPEAKERS_ON_LANDING_PAGE" defaultChecked={false} key={365985211425} />
      ]
       }
      { watch["SHOW_SPEAKERS"] === false && [setStateValue("SHOW_SPEAKERS",false)]}
        
      </Section>
    </>
  )
}

export default SpeakerDetails