import React from 'react'
import { FaBeer } from 'react-icons/fa';
import './MenuItem.scss'
const MenuItem = ({icon}) => {
  return (
    <div className= "menuItem">
            {icon}
            <div className='label'>Menu 1</div>
           
    </div>
  )
}

export default MenuItem