import React,{useState} from 'react'

import './SideBar.scss'
import MenuItem from './MenuItem'
import Accordion from './Accordion'
import { useSelector, useDispatch } from 'react-redux'
import {toggleSidebar,hideSidebar} from '../../../store/customizer/CustomizerSlice';
import { FaArrowAltCircleDown } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import Divider from './Divider'
import Heading from './Heading'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';


import logo from "../../../ondirect-logo.png"

const SideBar = () => {

    const customizer = useSelector(state => state.customizer)
    const dispatch = useDispatch()
    const navigate = useNavigate();

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
                        }
                    ]
                }
                
                
               
              
          
    ]

    const [active,setActive]=useState(0);




    const handleActiveChange=(item)=>{

        if(item.type=="menuItem"){
            dispatch(toggleSidebar())
        }
      

        setActive(item.id)
        console.log(item);
    }

    const logOutFun =()=>{
        Cookies.remove("user_name");
      Cookies.remove("user_id");
      Cookies.remove("access_token");
      Cookies.remove("user_permissions");

        navigate('/login');
         window.location.reload();
    }

  return (
    <>
       <div className='backdrop' 
       onClick={()=> dispatch(hideSidebar())}
       style={{display:`${(customizer.isCollapse)?'none':'block'}`,position:"absolute",zIndex:"9",background:"#00000052",width:"100%",height:"100%",right:"0"}}>

</div>
    <div className={`sideBar ${(customizer.isCollapse)?'collapsed':'opened'}`} style={{position:"absolute",zIndex:"10"}}>
        <div className='sideBarHolder' >
        {/*  */}

     

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
        <div onClick={logOutFun}>Logout</div>
            
        </div>
        </div>
        
    </div>
    </>
    
  )
}

export default SideBar