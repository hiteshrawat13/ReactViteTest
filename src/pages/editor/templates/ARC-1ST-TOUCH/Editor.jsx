import React from 'react'

import {
    Stepper,
    Step,
    TextBox,
    Form,
    SelectBox,
    RichTextEditor,
    CheckBox,
    FormBuilder,
    AssetPicker,
    FTPUpload,
    Preview,
    ZIPDownload

} from '../../components/form/index'
import { setData, addData, updateData } from '../../../../store/campaign/CampaignSlice'
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

import publishHelper from '../ARC-1ST-TOUCH/TestPublishHelper'
const Editor = () => {
    const dispatch = useDispatch()
    const campaignDataState = useSelector(state => state.campaignData)
    
  return (
    <Stepper publishHelper={new publishHelper(campaignDataState.data)}>

        

        <Step title="Basic Info"  >
          <TextBox label="Client Code" name="CLIENT_CODE" required={true} width="10%" />
          <TextBox label="Campaign Name" name="CAMP_NAME" required={true} width="50%" />
          <TextBox label="Campaign Id" name="CAMP_ID" required={true} width="10%" />
          <TextBox label="Link Name" name="LINK_NAME" required={true} width="50%"
            onChange={
              (e) => {
                console.log(e.target.value);
                const val = e.target.value
                dispatch(updateData({ prop: "THUMBNAIL_NAME", value: `${val}.png` }))
                dispatch(updateData({ prop: "PDF_NAME", value: `${val}.pdf` }))
                dispatch(updateData({ prop: "MP4_NAME", value: `${val}.mp4` }))
              }

            } />
          <SelectBox label="Region" name="REGION" required={true}
            options={[
              { label: "Select..", value: "" },
              { label: "EU", value: "EU" },
              { label: "NON-EU", value: "NON-EU" },
              { label: "CASL", value: "CASL" },
              { label: "Both ( NON-EU & CASL )", value: "BOTH" }
            ]}
            width="10%"
          />

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
            ]}
          />
          <TextBox label="Sponsored By Text" name="SPONSORED_BY_TEXT" required={true} />
        </Step>
        <Step title="Abstract & Title">
          <TextBox label="EDM Title" name="EDM_TITLE" required={true} width="60%" />
          <RichTextEditor label="Edm Abstract" name="EDM_ABSTRACT" required={true} />
          <TextBox label="EDM Optin" name="EDM_OPTIN" required={true} />
          <TextBox label="EDM CTA" name="EDM_CTA" required={true} width="20%" />
          <CheckBox label="Same As EDM title" name="SAME_AS_EDM_TITLE" />
          <TextBox label="Landing Page Title"
            name="LANDING_TITLE"
            required={true}
            watcher="SAME_AS_EDM_TITLE"
            showConditionValue={true}
          />
          <CheckBox label="Same As EDM abstract" name="SAME_AS_EDM_ABSTRACT" />
          <RichTextEditor label="Landing Abstract" name="LANDING_ABSTRACT" required={true} />
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

        <Step title="Preview">
          <Preview />
        </Step>

        <Step title="Publish">
          Publish
          <FTPUpload />
          <ZIPDownload />
        </Step>


      </Stepper>
  )
}

export default Editor