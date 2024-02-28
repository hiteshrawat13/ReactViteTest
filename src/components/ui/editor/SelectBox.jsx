import React from 'react'

import './SelectBox.scss'
const SelectBox = ({label,...otherProps}) => {
  return (
    <div className='formField'>
    <label htmlFor="">{label}</label>
    <select type="text"  name="selectbox" {...otherProps} >
    <option value="val1">ssss</option>
    </select>
    </div>
  )
}

export default SelectBox