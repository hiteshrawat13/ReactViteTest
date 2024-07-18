import React from 'react'
import fields from './tgif_form'
import { useForm } from 'react-hook-form';
import { useDispatch,useSelector,shallowEqual } from 'react-redux'
import {setData, addData, updateData } from '../store/campaign/CampaignSlice'

import './DynamicForm.css'
const DynamicForm = ({campaignData}) => {

const { register, handleSubmit, watch, formState } = useForm();
const dispatch=useDispatch()

const form_comp=(fields)=>{
    return  fields.map((field,i)=>{
          switch(field.type){
              case "row":
              return  <div className='row' key={i}>{form_comp(field.children)}</div>

              case "col":
                return <div className='col' key={i}>{form_comp(field.children)}</div>
   
              case "input":
                const showInput=( field.showIfChecked==undefined || (field.showIfChecked && campaignData.data[field.showIfChecked]==true) )
              return  showInput && <div className='field input' key={i}>
                      <span className='label'>{field.label || field.name}</span>
                      <input type="text" 
                      {...register(field.name, { required: true })} 
                      value={campaignData.data[field.name] || field.value || '' }
                      {...(field.style && {style:field.style})}
                      onChange={e => { dispatch(updateData({prop:field.name,value:e.target.value})) }}  />

                    <div>
                   {formState.errors[field.name] && formState.errors[field.name].message}
                    </div>
                  </div>


            case "textarea":
                return  (field.showIfChecked && campaignData.data[field.showIfChecked]==true) && <div className='field textarea' key={i}>
                        <span className='label'>{field.label || field.name}</span>
                        <textarea 
                        {...register(field.name, { required: true })} 
                        value={campaignData.data[field.name] || '' }
                        onChange={e => { dispatch(updateData({prop:field.name,value:e.target.value})) }} ></textarea>
                    </div>
       

              case "select":
              return <div className='field select' key={i}>
                      <span className='label'>{field.label || field.name}</span>
                      <select {...register(field.name, { required: true })} 
                      value={campaignData.data[field.name] || ''}
                      onChange={e => { dispatch(updateData({prop:field.name,value:e.target.value})) }} >
                          {field.options && field.options.map((option,i)=>{
                              return <option key={i} value={option.value}>{option.label}</option>
                          })}
                      </select>
                  </div>
           

              case "checkbox":
              return  <div className='field checkbox' key={i}>
                     <label>
                      <input type="checkbox" 
                      {...register(field.name, { required: false })} 
                      checked={campaignData.data[field.name] || false} 
                      onChange={e => { 
                          if(field.onChange){func(field.onChange)} dispatch(updateData({prop:field.name,value:e.target.checked})) 
                      }}
                      /> 
                        <span className='label'>{field.label || field.name}</span>
                    </label>

                  </div>
            case "switch":
                return <div className='field switch' key={i}>  
                <label className="switch">
                
                <input type="checkbox"
                  {...register(field.name, { required: false })} 
                  checked={campaignData.data[field.name] || false} 
                  onChange={e => { 
                      if(field.onChange){func(field.onChange)} dispatch(updateData({prop:field.name,value:e.target.checked})) 
                  }}
                
                />
                <span className="slider round"></span>
                </label>
                <span className='label'>{field.name}</span>
                </div>
            
              case "button":
              return  <div className='field button' key={i}>
                      <button>{field.label}</button>
                  </div>
             
          }
     })
  }


  const func=(funcBody)=>{
        
    let sayHi = new Function(funcBody);
    sayHi()
    return sayHi;
}

  const onSubmit = data =>  {
    dispatch(setData(data))
    console.log(data );
  
 };

  return (
    <div className='container'>
       <form action="" onSubmit={handleSubmit(onSubmit)}>{form_comp(fields)}</form> 
        
{campaignData?.data && JSON.stringify(campaignData.data)}


<button onClick={()=>{
dispatch(addData({"CAMP_NAME":new Date().toISOString(),"EDM_ABSTRACT":Math.random(),"ASSET_TYPE":"Whitepaper","SAME_AS_EDM":true}))

// dispatch(updateData({prop:"CAMP_NAME",value:new Date().toISOString()}))

}}>Update Data</button>



        </div>
  )
}

export default DynamicForm


