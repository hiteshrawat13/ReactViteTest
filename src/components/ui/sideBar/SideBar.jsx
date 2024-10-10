import React,{useState} from 'react'

import './SideBar.scss'
import MenuItem from './MenuItem'
import Accordion from './Accordion'
import { useSelector, useDispatch } from 'react-redux'
import {toggleSidebar,hideSidebar} from '../../../store/customizer/CustomizerSlice';
import { FaArrowAltCircleDown } from "react-icons/fa";

import { GoDot } from "react-icons/go";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { SiTask } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";

import { CiLogout } from "react-icons/ci";
import Divider from './Divider'
import Heading from './Heading'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';


import logo from "../../../ondirect-logo.png"


import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

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
                    icon:<MdSpaceDashboard  size={"1.5em"} />
                },
                {
                    id:1,
                    type:"menuItem",
                    label:"User Management",
                    href:"/users",
                    icon:<FaUser size={"1.5em"} />
                },
                {
                    id:1,
                    type:"menuItem",
                    label:"Role Management",
                    href:"/roles",
                    icon:<MdOutlineSecurity size={"1.5em"} />
                },
                {
                    id:3,
                    type:"menuItem",
                    label:"Masters",
                    href:"/masters",
                    icon:<FaDatabase size={"1.5em"} />
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
                    icon:<SiTask  size={"1.5em"} />,
                    items:[
                        {
                            id:51,
                            type:"menuItem",
                            label:"My Campaigns",
                           // href:"/campaigns",
                            href:"/campaignlist",
                            icon:<GoDot size={"1.5em"}/>
                        },
                        {
                            id:52,
                            type:"menuItem",
                            label:"Create Campaign",
                            // href:"/campaigns/create",
                            href:"/new",
                            icon:<GoDot size={"1.5em"} />
                        }
                    ]
                }
                
                
               
              
          
    ]

    const [active,setActive]=useState(0);




    const handleActiveChange=(item)=>{

        // if(item.type=="menuItem"){
        //     dispatch(toggleSidebar())
        // }
      

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
     
       {/* <div className='backdrop' 
       onClick={()=> dispatch(hideSidebar())}
       style={{display:`${(customizer.isCollapse)?'none':'block'}`,position:"absolute",zIndex:"9",background:"#00000052",width:"100%",height:"100%",right:"0"}}>

</div> */}
    <div className={`sideBar ${(customizer.isCollapse)?'collapsed':'opened'}`} >
    <SimpleBar style={{ maxHeight: "100%" }} forceVisible={ 'y' }>
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

    
        </div>
        </SimpleBar>
    </div>


    
    </>
    
  )
}

export default SideBar