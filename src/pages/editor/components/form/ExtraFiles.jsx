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

const ExtraFiles = () => {
  const { setStateValue, getStateValue, watch, setFormValue, filesRef, campData, setError } = useContext(EContext)
  return (
    <>
      {/* Extra Files Upload Section Start*/}
      <Section title="Extra files to upload">

        <Row>
          <Col>
            <CheckBox label="Upload Extra File [EXTRA_FILE_1]" name="ADD_EXTRA_FILE_1" defaultChecked={false} />
            <div style={{margin:"15px"}}>

            {(watch["ADD_EXTRA_FILE_1"] == true) &&
              <FileInput name="EXTRA_FILE_1" label="Extra File 1" tag="file"
                fileRef={filesRef.current.fileInput4}
                onFileChange={(filename) => { setFormValue("EXTRA_FILE_1", filename) }}

              />
            }
            </div>
            
          </Col>
        </Row>
        <Row>
          <Col>
            <CheckBox label="Upload Extra File [EXTRA_FILE_2]" name="ADD_EXTRA_FILE_2" defaultChecked={false} />
            <div style={{margin:"15px"}}>
            {(watch["ADD_EXTRA_FILE_2"] == true) &&
              <FileInput name="EXTRA_FILE_2" label="Extra File 2" tag="file" fileRef={filesRef.current.fileInput5}
                onFileChange={(filename) => { setFormValue("EXTRA_FILE_2", filename) }}
              />
            }
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <CheckBox label="Upload Extra File [EXTRA_FILE_3]" name="ADD_EXTRA_FILE_3" defaultChecked={false} />
            <div style={{margin:"15px"}}>
            {(watch["ADD_EXTRA_FILE_3"] == true) &&
              <FileInput name="EXTRA_FILE_3" label="Extra File 3" tag="file" fileRef={filesRef.current.fileInput6}

                onFileChange={(filename) => { setFormValue("EXTRA_FILE_3", filename) }}
              />
            }
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <CheckBox label="Upload Extra File [EXTRA_FILE_4]" name="ADD_EXTRA_FILE_4" defaultChecked={false} />
            <div style={{margin:"15px"}}>
            {(watch["ADD_EXTRA_FILE_4"] == true) &&
              <FileInput name="EXTRA_FILE_4" label="Extra File 4" tag="file" fileRef={filesRef.current.fileInput7}

                onFileChange={(filename) => { setFormValue("EXTRA_FILE_4", filename) }}
              />
            }
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <CheckBox label="Upload Extra File [EXTRA_FILE_5]" name="ADD_EXTRA_FILE_5" defaultChecked={false} />
            <div style={{margin:"15px"}}>
            {(watch["ADD_EXTRA_FILE_5"] == true) &&
              <FileInput name="EXTRA_FILE_5" label="Extra File 5" tag="file" fileRef={filesRef.current.fileInput8}
                onFileChange={(filename) => { setFormValue("EXTRA_FILE_5", filename) }}
              />
            }
            </div>
          </Col>
        </Row>


      </Section>
      {/* Extra Files Upload Section End */}
    </>
  )
}

export default ExtraFiles