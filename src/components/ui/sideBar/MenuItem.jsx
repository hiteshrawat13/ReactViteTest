import React from 'react'
import { FaBeer } from 'react-icons/fa';
import './MenuItem.scss'
const MenuItem = () => {
  return (
    <div className= "menuItem">
            <FaBeer/>
            <div className='label'>Menu 1</div>
           
    </div>
  )
}

export default MenuItem