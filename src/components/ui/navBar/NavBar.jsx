import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './NavBar.scss'



import { RxHamburgerMenu } from "react-icons/rx";
import {toggleSidebar} from '../../../store/customizer/CustomizerSlice';
import DropdownMenu from './DropdownMenu';
const NavBar = ({title="CB Tool"}) => {


  
  const dispatch =useDispatch();
  return (
    <div className='navBar'>
     
      <button className="btn_hamburger" onClick={()=>{dispatch(toggleSidebar())}}>
        
      <RxHamburgerMenu />
      </button>

      <div>
        <b>{title}</b>
      </div>
      <DropdownMenu/>
    </div>
  )
}

export default NavBar