import React,{useState} from 'react'

import './SideBar.scss'
import MenuItem from './MenuItem'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowAltCircleDown } from "react-icons/fa";
const SideBar = () => {

    const customizer = useSelector(state => state.customizer)
    const dispatch = useDispatch()

    console.log(customizer,"EE");
    const items=[
        
                {
                    id:0,
                    type:"menuItem",
                    label:"Dashboard",
                    href:"/",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:1,
                    type:"menuItem",
                    label:"Users",
                    href:"/users",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:2,
                    type:"menuItem",
                    label:"Masters",
                    href:"/masters",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:3,
                    type:"menuItem",
                    label:"IP List",
                    href:"/ip",
                    icon:<FaArrowAltCircleDown/>
                }
                ,
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
                            href:"/campaigns",
                            icon:<FaArrowAltCircleDown/>
                        },
                        {
                            id:52,
                            type:"menuItem",
                            label:"Create Campaign",
                            href:"/campaigns/create",
                            icon:<FaArrowAltCircleDown/>
                        }
                    ]
                },
                
                {
                    id:8,
                    type:"menuItem",
                    label:"Exit",
                    href:"/exit",
                    icon:<FaArrowAltCircleDown/>
                }
              
          
    ]

    const [active,setActive]=useState(0);
    const handleActiveChange=(item)=>{
        setActive(item.id)
        console.log(item);
    }

  return (
    <div className={`sideBar ${(customizer.isCollapse)?'collapsed':''}`}>
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