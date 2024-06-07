import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './NavBar.scss'



import { RxHamburgerMenu } from "react-icons/rx";
import {toggleSidebar} from '../../../store/customizer/CustomizerSlice';
import DropdownMenu from './DropdownMenu';
import logo from "../../../ondirect-logo.png"

const NavBar = ({title="CB Tool"}) => {


  
  const dispatch =useDispatch();
  return (
    <div className='navBar'>
     

      <button className="btn_hamburger" onClick={()=>{dispatch(toggleSidebar())}}>
        
      


      <RxHamburgerMenu />
      </button>
      <div className='logo' style={{marginRight:"auto"}}>
            <img src={logo} alt="logo" style={{width:"200px"}} />
        </div>
      <div style={{marginRight:"auto"}}>
        <b>{title}</b>
      </div>
      <DropdownMenu/>
    </div>
  )
}

export default NavBar