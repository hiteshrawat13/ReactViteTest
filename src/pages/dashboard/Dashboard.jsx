import React from 'react'
import NavBar from '../../components/ui/navBar/NavBar'
import SideBar from '../../components/ui/sideBar/SideBar'

import './Dashboard.scss'
import { Outlet, useLocation } from 'react-router-dom'
import Router from "../../router/Router"
const Dashboard = () => {
  const path=useLocation()
  return (
    <div className='container'>
       
            <SideBar/>
        
        <div style={{flex:"1 1 0%",width:"84%"}}>
            <NavBar title={Router[0].children.filter(route=>route.path==path.pathname)[0].title}/>
            <div className='outletHolder'>
            <Outlet/>
            </div>
           
        </div>
        
    </div>
  )
}

export default Dashboard