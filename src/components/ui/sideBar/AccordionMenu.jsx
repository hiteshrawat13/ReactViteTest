import React, { useState } from 'react'

import './AccordionMenu.scss'

import { FaBeer } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import MenuItem from './MenuItem';
const AccordionMenu = () => {
    const [isPressed,setIsPressed]=useState(false)
  return (
    <div 
    className='accordion'
    
    >
        <div className= {`item ${isPressed?'pressed':''}`} onClick={()=>setIsPressed(!isPressed)}>
            <FaBeer/>
            <div className='label'>Menu 1</div>
            <IoIosArrowDown className={` ${isPressed?'rotate':''}`}/>
        </div>
        <div className={`content ${isPressed?'show':'hidden'}`}>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
        </div>
    </div>
  )
}

export default AccordionMenu