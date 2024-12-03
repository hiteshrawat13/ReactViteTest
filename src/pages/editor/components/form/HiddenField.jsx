import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
const HiddenField = ({label,name,required=false,width=null,onChange=null,value=null,...rest}) => {
    const campaignDataState = useSelector(state => state.campaignData)
    const {register,unregister,getValues,setValue,watch,formState: { errors }} = useFormContext() 
  
    useEffect(() => {


      if (campaignDataState.data[name] != undefined) {
        setValue(name, campaignDataState.data[name])
      } else {
        setValue(name, value || "")
      }

      //setValue(name, value || "" ) // used to call watch method for checkbox
      return () => {
        unregister(name)
      }
    }, [])
  
  
   
    return (
       <input type="hidden" 
           {...rest} 
           {...register(name, { required: required ,onChange: (e) => { onChange && onChange(e) }})}    /> 
    )
  }

export default HiddenField