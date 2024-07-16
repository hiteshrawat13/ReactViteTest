import React from 'react'
 
import {setData, addData, updateData } from './store/campaign/CampaignSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
const MyComponent = () => {

    const fields=[
        {
            type:"row",
            children:[
                {
                    type:"input",
                    name:"CAMP_NAME",
                    required:true,

                },
                {
                    type:"input",
                    name:"PRIVACY_POLICY",
                    required:true,

                },
                {
                    type:"input",
                    name:"REGION",
                    required:true,

                },
                {
                    type:"input",
                    name:"EDM_TITLE",
                    required:true,

                },
                {
                    type:"input",
                    name:"EDM_ABSTRACT",
                    required:true,

                },
                {
                    type:"checkbox",
                    name:"SAME_AS_EDM",
                    required:true,
                    onChange:`alert("Hi")`
                }
            ]
        },
        {
            type:"row",
            children:[
                {
                    type:"button",
                    name:"ASSET_TYPE",
                    required:true,
                     
                }
            ]
        },
    ]
    const dispatch=useDispatch()
    const campaignData = useSelector(state => state.campaignData )

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data =>  {
    dispatch(setData(data))
    console.log(data );

        
    };

    const func=(funcBody)=>{
        let sayHi = new Function(funcBody);
        return sayHi;
    }


    const gg=(fields)=>{
      return  fields.map((field,i)=>{
            switch(field.type){
                case "row":
                return  gg(field.children)
                break;

                case "input":
                return <div className='field input' key={i}>
                        <span>{field.name}</span>
                        <input type="text" {...register(field.name, { required: true })} defaultValue={campaignData[field.name]}/>
                    </div>
                break;

                case "select":
                return <div className='field select' key={i}>
                        <span>{field.name}</span>
                        <select {...register(field.name, { required: true })}>
                            <option value="en-us">en-us</option>
                        </select>
                    </div>
                break

                case "checkbox":
                return  <div className='field checkbox' key={i}>
                        <span>{field.name}</span>
                        <input type="checkbox" {...register(field.name, { required: false })} {...(field.onChange && { onChange: func(field.onChange) })} />  
                    </div>
                break

                case "button":
                return  <div className='field button' key={i}>
                        <span></span>
                        <button>Ok</button>
                    </div>
                break;
            }
       })
    }

  

 
  return (
    <div>
<form action="" onSubmit={handleSubmit(onSubmit)}>
{gg(fields)}
</form>
{campaignData?.data && JSON.stringify(campaignData.data)}


<button onClick={()=>{

dispatch(updateData({prop:"CAMP_NAME",value:new Date().toDateString()}))

}}>Update Data</button>
    </div>
  )
}

export default MyComponent