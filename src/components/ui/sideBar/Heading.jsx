import React from 'react'

import './Heading.scss'

import { BsThreeDots } from "react-icons/bs";
const Heading = ({label}) => {
  return (
    <div className='Heading'><div className='text'>{label}</div><BsThreeDots className='threeDots' /></div>
  )
}

export default Heading