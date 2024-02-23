import React from 'react'

import './SideBar.scss'
import AccordionMenu from './AccordionMenu'
import MenuItem from './MenuItem'
const SideBar = () => {
  return (
    <div className='sideBar'>
        <div className='logo'>
            <img src="https://modernize-nextjs.adminmart.com/images/logos/dark-logo.svg" alt="logo" />
        </div>

        <div className='menu'>
            <MenuItem/>
            <AccordionMenu/>
            <MenuItem/>
            <AccordionMenu/>
            <MenuItem/>
            <AccordionMenu/>
            <MenuItem/>
            <AccordionMenu/>
            <MenuItem/>
            <AccordionMenu/>
            <MenuItem/>
            <AccordionMenu/>
            <MenuItem/>
            <AccordionMenu/>
            <MenuItem/>
            <AccordionMenu/>
        </div>

        <div className='logout'>
            Logout
        </div>
    </div>
  )
}

export default SideBar