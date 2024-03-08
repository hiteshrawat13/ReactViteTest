import React, { useRef } from 'react'


import "./Editor.scss"

import server_data from './server_data.js'

import { useForm} from "react-hook-form"


import FormBuilder from '../../components/formBuilder/FormBuilder.jsx'
import Stepper from '../../components/ui/stepper/Stepper.jsx'
import Step from '../../components/ui/stepper/Step.jsx'


const Editor = () => {

  const onSubmit = (data) =>{
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEESUBMIT");
    alert(data)

    console.log("DATA",data);
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()



  return (
    <>


<form action="" onSubmit={handleSubmit(onSubmit)}>



<Stepper>
  
  <Step title="Basic Info">
    
   {/* Step 1 */}
   <label>
      <span>Pixel Link</span>
      <input type="text"  {...register("pixelLink",{ required:true })} className={`${(errors.pixelLink)?'error':''}`}/>
      {errors.pixelLink && <span>This field is required</span>}
    </label>

    <label>
      <span>Link Name</span>
      <input type="text" {...register("linkName",{ required:true })}  className={`${(errors.linkName)?'error':''}`}/>
      {errors.linkName && <span>This field is required</span>}
    </label>

    <label>
      <span>Camp Id</span>
      <input type="text" {...register("campId",{ required:true })}  className={`${(errors.campId)?'error':''}`}/>
      {errors.campId && <span>This field is required</span>}
    </label>



    <label>
      <span>Asset Type</span>
      <select {...register("assetType",{ required:true })} className={`${(errors.assetType)?'error':''}`}>
        <option value="">Select...</option>
        <option value="White Paper">White Paper</option>
        <option value="Buyers/Comparision Guide">Buyers/Comparision Guide</option>
        <option value="E Book">E Book</option>
        <option value="Case Study">Case Study</option>
        <option value="Report">Report</option>
        <option value="Webinar OnDemand">Webinar OnDemand</option>
        <option value="Infographic">Infographic</option>
      </select>
      {errors.assetType && <span>This field is required</span>}
    </label>

    <label>
      <span>Privacy Policy</span>
      <input  {...register("privacyPolicy",{ required:true })} className={`${(errors.privacyPolicy)?'error':''}`} />
      {errors.privacyPolicy && <span>This field is required</span>}
    </label>

    <label>
      <span>Sponsored By Text</span>
      <input  {...register("sponsoredByText",{ required:true })}  className={`${(errors.sponsoredByText)?'error':''}`} />
      {errors.sponsoredByText && <span>This field is required</span>}
    </label>
   {/* Step 1 end */}
    
  </Step>

  <Step title="Content">
  {/* Step 2 */}
  <label>
      <span>EDM Page Title</span>
      <input  {...register("edmTitle",{ required:true })}  className={`${(errors.edmTitle)?'error':''}`} />
      {errors.edmTitle && <span>This field is required</span>}
    </label>


      

    <label>
      <span>EDM Page Abstract</span>
      <input  {...register("edmAbstract",{ required:true })} className={`${(errors.edmAbstract)?'error':''}`} />
      {errors.edmAbstract && <span>This field is required</span>}
    </label>


    <label>
      <span>Landing Page Title</span>
      <input  {...register("landingTitle",{ required:true })} className={`${(errors.landingTitle)?'error':''}`} />
      {errors.landingTitle && <span>This field is required</span>}
    </label>

    <label>
      <span>Landing Page Abstract</span>
      <input  {...register("landingAbstract",{ required:true })} className={`${(errors.landingAbstract)?'error':''}`}/>
      {errors.landingAbstract && <span>This field is required</span>}
    </label>

    <label>
      <span>EDM CTA</span>
      <input   {...register("edmCTA",{ required:true })} className={`${(errors.edmCTA)?'error':''}`} />
      {errors.edmCTA && <span>This field is required</span>}
    </label>


    <label>
      <span>Landing CTA</span>
      <input   {...register("landingCTA",{ required:true })}  className={`${(errors.landingCTA)?'error':''}`}/>
      {errors.landingCTA && <span>This field is required</span>}
    </label>
  {/* Step 2 end*/}
  </Step>

  <Step title="Assets & Logo">
  {/* Step 3 */}

  <label>
      <span>Logo</span>
      <input type="text"/><br/>
      
      <input type="file" name="pdf"  />
    </label>
    <label>
      <span>Thumbnail</span>
      <input type="text"/><br/>
      <input type="file" name="pdf"  />
    </label>
    <hr/>
    <label>
      <span>Asset Type</span>
      <select  {...register("assetFormat",{ required:true })} className={`${(errors.assetFormat)?'error':''}`} >
      <option value="">Select...</option>
        <option value="PDF">PDF</option>
        <option value="MP4">MP4</option>
        <option value="Client Link">Client Link</option>
        <option value="IFRAME Html">IFRAME Html</option>
      </select>
      {errors.assetFormat && <span>This field is required</span>}
    </label>

    

    <label>
      <span>Asset PDF</span>
      <input type="text" /><br/>
      <input type="file" name="pdf" />
    </label>

    <label>
      <span>MP4</span>
      <input type="text"/><br/>
      <input type="file" name="pdf" />
    </label>

    <label>
      <span>Client Link</span>
      <input type="text" name="clientLink" />
    </label>

    <label>
      <span>Iframe Html</span>
      <input type="text" name="clientLink" />
    </label>

  {/* Step 3 end */}
  </Step>

  <Step title="Form">
    {/* Step 4 */}
    <FormBuilder/>
    {/* Step 4 end */}
  </Step>

  <Step title="Finish">
    {/* Step 5 */}
    <input type="submit" value="Submit" />
    {/* Step 5 end */}
  </Step>

</Stepper>
    
</form>

    
    </>
  )
}

export default Editor