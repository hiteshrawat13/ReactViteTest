import React from 'react'

const TextBox = ({label,...rest}) => {
  return (
    <div>
        <label>{label}</label>
        <input type="text" {...rest}/>
    </div>
  )
}

export default TextBox