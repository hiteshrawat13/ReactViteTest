import React,{useState} from 'react'

import './SideBar.scss'
import MenuItem from './MenuItem'
import Accordion from './Accordion'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowAltCircleDown } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import Divider from './Divider'
import Heading from './Heading'




const SideBar = () => {

    const customizer = useSelector(state => state.customizer)
    const dispatch = useDispatch()

    const items=[
        
        {
            id:7854,
            type:"heading",
            label:"Dashboard",
            
        },
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
                    label:"User Management",
                    href:"/users",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:1,
                    type:"menuItem",
                    label:"Role Management",
                    href:"/roles",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:3,
                    type:"menuItem",
                    label:"Masters",
                    href:"/masters",
                    icon:<FaArrowAltCircleDown/>
                },
                {
                    id:2121,
                    type:"divider",
                    
                },
                {
                    id:4,
                    type:"menuItem",
                    label:"IP List",
                    href:"/ip",
                    icon:<FaArrowAltCircleDown/>
                }
                ,
                {
                    id:5,
                    type:"subMenuItem",
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
                        },
                        {
                            id:5222,
                            type:"menuItem",
                            label:"Create Campaign",
                            href:"/campaigns/create",
                            icon:<FaArrowAltCircleDown/>
                        },
                        {
                            id:5233,
                            type:"menuItem",
                            label:"Create Campaign",
                            href:"/campaigns/create",
                            icon:<FaArrowAltCircleDown/>
                        },
                        {
                            id:52444,
                            type:"menuItem",
                            label:"Create Campaign",
                            href:"/campaigns/create",
                            icon:<FaArrowAltCircleDown/>
                        },
                        {
                            id:52555,
                            type:"menuItem",
                            label:"Create Campaign",
                            href:"/campaigns/create",
                            icon:<FaArrowAltCircleDown/>
                        },
                        {
                            id:52666,
                            type:"menuItem",
                            label:"Create Campaign",
                            href:"/campaigns/create",
                            icon:<FaArrowAltCircleDown/>
                        },
                        {
                            id:52777,
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
                },
                
                {
                    id:9,
                    type:"menuItem",
                    label:"Editor",
                    href:"/editor",
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
            <img src="/ondirect-logo.png" alt="logo" />
        </div>

        <div className='menu'>
            {
                items.map((item,i)=>{
                    if(item.type=="menuItem"){
                        return <MenuItem  key={item.id} item={item} activeItem={active} handleActiveChange={handleActiveChange}/>

                    }else if(item.type=="subMenuItem"){
                        return <Accordion  key={item.id} item={item} activeItem={active} handleActiveChange={handleActiveChange} />
                    }else if(item.type=="divider"){
                        return <Divider key={item.id}/>
                    }else if(item.type=="heading"){
                        return <Heading key={item.id} label={item.label} />
                    }
                })
            }
           
        </div>

        <div className='logout'>
        <CiLogout />
        <div>Logout</div>
            
        </div>
    </div>
  )
}

export default SideBar