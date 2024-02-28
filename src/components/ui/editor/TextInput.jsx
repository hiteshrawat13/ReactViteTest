import React from 'react'
import { forwardRef } from 'react';

import './TextInput.scss'

const TextInput =forwardRef( (props, ref) => {
const { label, ...otherProps } = props;
  return (
    <div className='formField'>
        <label htmlFor="">{label}</label>
        <input type="text" ref={ref} {...otherProps} />
        <div className='error'></div>
    </div>
  )
}
)


export default TextInput