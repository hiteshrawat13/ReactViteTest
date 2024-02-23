import React,{useState} from 'react'

import './SideBar.scss'
import MenuItem from './MenuItem'

import { FaArrowAltCircleDown } from "react-icons/fa";
const SideBar = () => {

    

    const items=[
        
                {
                    id:0,
                    type:"menuItem",
                    label:"Dashboard",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:1,
                    type:"menuItem",
                    label:"Users",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:2,
                    type:"menuItem",
                    label:"Masters",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:3,
                    type:"menuItem",
                    label:"IP List",
                    icon:<FaArrowAltCircleDown/>
                }
                ,
                {
                    id:4,
                    type:"menuItem",
                    label:"Databases",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:5,
                    type:"menuItem",
                    label:"Campaigns",
                    icon:<FaArrowAltCircleDown/>,
                    items:[
                        {
                            id:51,
                            type:"menuItem",
                            label:"My Campaigns",
                            icon:<FaArrowAltCircleDown/>
                        },
                        {
                            id:52,
                            type:"menuItem",
                            label:"Create Campaign",
                            icon:<FaArrowAltCircleDown/>
                        }
                    ]
                },
                {
                    id:6,
                    type:"menuItem",
                    label:"Reports",
                    icon:<FaArrowAltCircleDown/>,
                    items:[
                        {
                            id:61,
                            type:"menuItem",
                            label:"Daily Attendance",
                            icon:<FaArrowAltCircleDown/>
                        },
                        {
                            id:62,
                            type:"menuItem",
                            label:"Punch Report",
                            icon:<FaArrowAltCircleDown/>
                        },
                        {
                            id:63,
                            type:"menuItem",
                            label:"HR Documents",
                            icon:<FaArrowAltCircleDown/>
                        }
                    ]
                },
                {
                    id:7,
                    type:"menuItem",
                    label:"Password Manager",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:8,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:9,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:10,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:11,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:12,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:13,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:14,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:15,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:16,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:17,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:18,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:19,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:20,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:21,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:22,
                    type:"menuItem",
                    label:"Exit",
                    icon:<FaArrowAltCircleDown/>
                },
              
          
    ]

    const [active,setActive]=useState(0);

    const handleActiveChange=(item)=>{
        setActive(item.id)
        console.log(item);
    }

  return (
    <div className='sideBar'>
        <div className='logo'>
            <img src="https://modernize-nextjs.adminmart.com/images/logos/dark-logo.svg" alt="logo" />
        </div>

        <div className='menu'>
            {
                items.map((item,i)=>{
                    return <MenuItem  key={item.id} item={item} activeItem={active} handleActiveChange={handleActiveChange}/>
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