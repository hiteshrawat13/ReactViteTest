import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { MdEdit } from "react-icons/md";



/*
Parent component usage:

 <NumberInput
            {...field}
            label="Enter Value"
            name="numberField"
            required
            value={field.value}
            hasSuffix={true} // Enable suffix dropdown
            suffixOptions={['px', '%', 'em']} // Dynamic suffix options
          />

*/

const NumberInput = ({ label, name, required, width = null, onChange = null, value = null, helpText = null, hasSuffix = false, suffixOptions = ['px', '%'], ...rest }) => {
  const campaignDataState = useSelector(state => state.campaignData)
  const { register, unregister, setValue, formState: { errors }, clearErrors } = useFormContext()
  const [number, setNumber] = useState('') // Store number value
  const [suffix, setSuffix] = useState('') // Initially empty suffix

  useEffect(() => {
    let initialValue = campaignDataState.data[name] || value || ''


    const numPart = initialValue.replace(/[^\d.-]/g, ''); // Extract number part
    let suffixPart = initialValue.replace(/[\d.-]/g, '') || ''; // Extract suffix part or set empty if none
    if(hasSuffix==true){
      
      setSuffix(suffixPart);
    }else{
       suffixPart = ""
      setSuffix("");
    }
    
    setNumber(numPart);
   
    setValue(name, `${numPart}${suffixPart}`);
    
    return () => {
      unregister(name);
    }
  }, [campaignDataState.data[name], value, setValue, name, unregister]);

  const handleNumberChange = (e) => {
    const num = e.target.value;
    setNumber(num);
    setValue(name, `${num}${suffix}`);
    onChange && onChange(`${num}${suffix}`);
    clearErrors(name); // Clear error when editing
  };

  const handleSuffixChange = (e) => {
    const selectedSuffix = e.target.value;
    setSuffix(selectedSuffix);
    setValue(name, `${number}${selectedSuffix}`);
    onChange && onChange(`${number}${selectedSuffix}`);
    clearErrors(name); // Clear error when suffix is changed
  };

  return (
    <div className='form-group'>
      <label>{label}{required && <span style={{ color: "red" }}>*</span>}</label>
      <div className='input-holder' {...(width != null && { style: { width } })}>
        {/* Hidden input to store concatenated value */}
        <input type="hidden" {...register(name, {
          required: required ? "This field is required" : false,
          validate: {
            positiveNumber: (value) => {
              const num = parseFloat(value);
              if (isNaN(num) || num <= 0) {
                return "Number must be greater than zero";
              }
              return true;
            }
          },
          onChange: (e) => { onChange && onChange(e.target.value) }
        })} />
        
        {/* Number input */}
        <input
          autoComplete="off"
          type="number"
          value={number}
          onChange={handleNumberChange}
          {...rest}
        />
        
        {/* Conditionally render the suffix dropdown */}
        {hasSuffix && (
          <select 
          style={{width:"auto"}}
          value={suffix} onChange={handleSuffixChange}>
            <option value="">Select suffix</option>
            {suffixOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}

        {/* Error icon */}
        {errors[name] && <div className='error-icon'>!</div>}
      </div>

      {/* Error message */}
      {errors[name] && errors[name].type !== "custom" && <span className='error'>{errors[name].message}</span>}
      {errors[name] && errors[name].type === "custom" && <span className='error'>{errors[name].message}</span>}

      {/* Help text */}
      {helpText && <div className='help-text'>{helpText}</div>}
    </div>
  );
};

export default NumberInput;
