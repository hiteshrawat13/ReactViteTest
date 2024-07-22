import React ,{forwardRef, useImperativeHandle} from 'react'

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setData, addData, updateData } from '../store/campaign/CampaignSlice'

import './DynamicForm.css'
const DynamicForm = forwardRef( ({ campaignData ,fields},ref) => {

  const { register, setValue, handleSubmit, watch, formState: { errors }, reset ,trigger} = useForm();
  const dispatch = useDispatch()

  const form_comp = (fields) => {
    return fields.map((field, i) => {
      switch (field.type) {
        case "row":
          return <div className='row' key={i}>{form_comp(field.children)}</div>

        case "col":
          return <div className='col' key={i}>{form_comp(field.children)}</div>

        case "input":
          const showInput = (field.showIfChecked == undefined || (field.showIfChecked && campaignData.data[field.showIfChecked] == true))
          return showInput && <div className='field input' key={i}>
            <span className='label'>{field.label || field.name}</span>
            <input type="text"
              className={`${(errors[field.name]) ? "field-error" : ""}`}
              {...register(field.name, { required: field.required || false })}
              //  defaultValue={campaignData.data[field.name] || field.value || '' }
              {...(field.style && { style: field.style })}
              onChange={e => {

                if (field.onChange) {
                  func(field.name, field.onChange)
                }
                setValue(field.name, e.target.value, { shouldValidate: true });
                //dispatch(updateData({prop:field.name,value:e.target.value}))
              }}

            />

            <div className='error'>
              {errors[field.name] && <p>{field.label} is required</p>}
            </div>
          </div>

        case "file":
          return  <div className='field file' key={i}>
            <span className='label'>{field.label || field.name}</span>
            <input type="file"
              className={`${(errors[field.name]) ? "field-error" : ""}`}
              {...register(field.name, { required: field.required || false})}
              //  defaultValue={campaignData.data[field.name] || field.value || '' }
              {...(field.style && { style: field.style })}
              onChange={e => {
                trigger(field.name)
              
              // setValue(field.name, e.target.files, { shouldValidate: true });
                //dispatch(updateData({prop:field.name,value:e.target.value}))
              }}

            />

            <div className='error'>
              {errors[field.name] && <p>{field.label} is required</p>}
            </div>
          </div>


        case "textarea":
          return <div className='field textarea' key={i}>
            <span className='label'>{field.label || field.name}</span>
            <textarea
              className={`${(errors[field.name]) ? "field-error" : ""}`}
              {...register(field.name, { required: field.required || false })}
              // value={campaignData.data[field.name] || '' }
              {...(field.style && { style: field.style })}
              onChange={e => {
                setValue(field.name, e.target.value, { shouldValidate: true });
                // dispatch(updateData({prop:field.name,value:e.target.value})) 
              }} ></textarea>

            <div className='error'>
              {errors[field.name] && <p>{field.label} is required</p>}
            </div>
          </div>


        case "select":
          return <div className='field select' key={i}>
            <span className='label'>{field.label || field.name}</span>
            <select
              className={`${(errors[field.name]) ? "field-error" : ""}`}
              {...register(field.name, { required: field.required || false })}
              //value={campaignData.data[field.name] || ''}
              {...(field.style && { style: field.style })}
              onChange={e => {
                setValue(field.name, e.target.value, { shouldValidate: true });
                //dispatch(updateData({prop:field.name,value:e.target.value})) 
              }} >
              {field.options && field.options.map((option, i) => {
                return <option key={i} value={option.value}>{option.label}</option>
              })}
            </select>

            <div className='error'>
              {errors[field.name] && <p>{field.label} is required</p>}
            </div>
          </div>


        case "checkbox":
          return <div className='field checkbox' key={i}>
            <label>
              <input type="checkbox"
                className={`${(errors[field.name]) ? "field-error" : ""}`}
                {...register(field.name, { required: field.required || false })}
                //checked={campaignData.data[field.name] || false} 
                {...(field.style && { style: field.style })}
                onChange={e => {
                  //if(field.onChange){func(field.onChange)} 
                  setValue(field.name, e.target.checked, { shouldValidate: true });
                  //dispatch(updateData({prop:field.name,value:e.target.checked})) 
                }}
              />
              <span className='label'>{field.label || field.name}</span>
            </label>
            <div className='error'>
              {errors[field.name] && <p>{field.label} is required</p>}
            </div>

          </div>
        case "switch":
          return <div className='field switch' key={i}>
            <label className="switch">

              <input type="checkbox"
                className={`${(errors[field.name]) ? "field-error" : ""}`}
                {...register(field.name, { required: field.required || false })}
                //checked={campaignData.data[field.name] || false} 
                {...(field.style && { style: field.style })}
                onChange={e => {
                  //if(field.onChange){func(field.onChange)} 
                  setValue(field.name, e.target.checked);
                  //dispatch(updateData({prop:field.name,value:e.target.checked})) 
                }}

              />
              <span className="slider round"></span>
            </label>
            <span className='label'>{field.name}</span>
          </div>

        case "button":
          return <div className='field button ' key={i}>
            <button className='cta'>{field.label}</button>
          </div>
        case "step":
            return   <div className='step' key={i}><form  onSubmit={handleSubmit(onSubmit)}>{form_comp(field.children)}</form></div>

      }
    })
  }


  const func = (field, funcBody) => {

    let sayHi = new Function(["field"], funcBody);
    sayHi(field)
    return sayHi;
  }



  const onSubmit = data => {
    dispatch(setData(data))

    alert(JSON.stringify(data))
    console.log(data);

  };

  return (
    <div className='container'>
     {/* {form_comp(fields)} */}

     <form  onSubmit={handleSubmit(onSubmit)}>{form_comp(fields)}</form>

  


      <button onClick={() => {

        reset((prev) => ({ ...prev, ...{ CAMP_NAME: '13Test', CAMP_ID: '24Test' } }));
        //dispatch(addData({"CAMP_NAME":new Date().toISOString(),"EDM_ABSTRACT":Math.random(),"ASSET_TYPE":"Whitepaper","SAME_AS_EDM":true}))

        // dispatch(updateData({prop:"CAMP_NAME",value:new Date().toISOString()}))

      }}>Update Data</button>



    </div>
  )
})

export default DynamicForm


