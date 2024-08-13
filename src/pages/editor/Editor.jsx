import React, { useEffect, useRef } from 'react'


import Stepper from './components/stepper/Stepper';
import Step from './components/stepper/Step';
import TextBox from './components/form/TextBox';
import Form from './components/form/Form';
import SelectBox from './components/form/SelectBox';
import RichTextEditor from './components/form/RichTextEditor';
import CheckBox from './components/form/CheckBox';
import FormBuilder from './components/form/formBuilder/FormBuilder';
import AssetPicker from './components/AssetPicker'
import FTPUpload from './components/form/FTPUpload';
import Preview from './components/Preview';



const Editor = () => {


  const stepperRef = useRef()
  

 





 

  return (
    <div>
      {/* TESTING THIS EDITOR PAGE NOT USABLE NOW */}
      
    { <Stepper ref={stepperRef}  >
      
    <Step title="Preview">
          <Preview/>
        </Step>
       
        <Step title="Basic Info"  >

          <TextBox label="Client Code" name="CLIENT_CODE" required={true} />
          <TextBox label="Campaign Name" name="CAMP_NAME" required={true} />
          <TextBox label="Campaign Id" name="CAMP_ID" required={true} />
          <TextBox label="Link Name" name="LINK_NAME" required={true} />
          <SelectBox label="Region" name="REGION" required={true}
            options={[
              { label: "Select..", value: "" },
              { label: "EU", value: "EU" },
              { label: "NON-EU", value: "NON-EU" },
              { label: "CASL", value: "CASL" },
              { label: "Both ( NON-EU & CASL )", value: "BOTH" }
            ]} />

          <SelectBox label="Asset Type" name="ASSET_TYPE" required={true}
            options={[
              { label: "Select..", value: "" },
              { label: "White Paper", value: "White Paper" },
              { label: "Buyers/Comparision Guide", value: "Buyers/Comparision Guide" },
              { label: "E Book", value: "E Book" },
              { label: "Case Study", value: "Case Study" },
              { label: "Report", value: "Report" },
              { label: "Webinar OnDemand", value: "Webinar OnDemand" },
              { label: "Infographic", value: "Infographic" }

            ]} />
          <TextBox label="Sponsored By Text" name="SPONSORED_BY_TEXT" required={true} />

        </Step>
        <Step title="Abstract & Title">

          <TextBox label="EDM Title" name="EDM_TITLE" required={true} />
          <RichTextEditor name="EDM_ABSTRACT" />
          <TextBox label="EDM Optin" name="EDM_OPTIN" required={true} />
          <TextBox label="EDM CTA" name="EDM_CTA" required={true} />

          <CheckBox label="Same As EDM title" name="SAME_AS_EDM_TITLE" />
          <TextBox label="Landing Page Title" name="LANDING_TITLE" required={true} />

          <CheckBox label="Same As EDM abstract" name="SAME_AS_EDM_ABSTRACT" />
          <TextBox label="Landing Page abstract" name="LANDING_ABSTRACT" required={true} />

          <CheckBox label="New Landing Page Format" name="NEW_LANDING_PAGE_FORMAT" />
          <TextBox label="BOX TEXT" name="NEW_LANDING_PAGE_FORMAT_BOX_TEXT" required={true} />



        </Step>
        <Step title="Form">
          Forms
          <FormBuilder />
        </Step>
     

        <Step title="Logo & Assets">
          Assets Logo
          <AssetPicker />
        </Step>

        

        

        <Step title="Publish">
          Publish
          <FTPUpload/>
        </Step>
      
        
      </Stepper>}

    </div>
  )
}

export default Editor