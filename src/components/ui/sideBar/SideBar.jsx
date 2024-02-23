import React from 'react'

import './SideBar.scss'
import AccordionMenu from './AccordionMenu'
import MenuItem from './MenuItem'

import { FaArrowAltCircleDown } from "react-icons/fa";
const SideBar = () => {

    const items=[
        
                {
                    type:"menuItem",
                    label:"Dashboard",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    type:"menuItem",
                    label:"Dashboard",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    type:"menuItem",
                    label:"Dashboard",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    type:"menuItem",
                    label:"Dashboard",
                    icon:<FaArrowAltCircleDown/>
                }
                ,
                {
                    type:"menuItem",
                    label:"Dashboard",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    type:"accordion",
                    label:"Dashboard",
                    items:[]
                }
          
    ]
  return (
    <div className='sideBar'>
        <div className='logo'>
            <img src="https://modernize-nextjs.adminmart.com/images/logos/dark-logo.svg" alt="logo" />
        </div>

        <div className='menu'>
            {
                items.map((item,i)=>{
                    if(item.type=="menuItem"){
                        return <MenuItem icon={item.icon}/>
                    }else if(item.type=="accordion"){
                        return <AccordionMenu/>
                    }
                    
                   
                })
            }
           
        </div>

        <div className='logout'>
            Logout
        </div>
    </div>
  )
}

export default SideBar