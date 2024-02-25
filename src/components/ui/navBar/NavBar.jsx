import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './NavBar.scss'



import { RxHamburgerMenu } from "react-icons/rx";
import {toggleSidebar} from '../../../store/customizer/CustomizerSlice';
import DropdownMenu from './DropdownMenu';
const NavBar = () => {

  const dispatch =useDispatch();
  return (
    <div className='navBar'>
      <button onClick={()=>{dispatch(toggleSidebar())}}>
      <RxHamburgerMenu />
      </button>

      <DropdownMenu/>
    </div>
  )
}

export default NavBar