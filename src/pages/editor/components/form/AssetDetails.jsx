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
} from '../form/index'
import { EContext } from '../../EditorMain'

const AssetDetails = () => {
    const { setStateValue, getStateValue, watch, setFormValue, filesRef, campData, setError } = useContext(EContext)
    return (
        <>
            <Section title="Asset">

                <TextBox label="Asset Title" name="ASSET_TITLE" required={true}  />


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
        </>
    )
}

export default AssetDetails