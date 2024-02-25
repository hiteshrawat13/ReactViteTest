import React from 'react'
import NavBar from '../../components/ui/navBar/NavBar'
import SideBar from '../../components/ui/sideBar/SideBar'

import './Dashboard.scss'
import { Outlet, useLocation } from 'react-router-dom'
const Dashboard = () => {
  
  return (
    <div className='container'>
       
            <SideBar/>
        
        <div style={{flex:"1"}}>
            <NavBar/>
            <Outlet/>
        </div>
        
    </div>
  )
}

export default Dashboard