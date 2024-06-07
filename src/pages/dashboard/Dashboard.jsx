import React from 'react'
import NavBar from '../../components/ui/navBar/NavBar'
import SideBar from '../../components/ui/sideBar/SideBar'

import './Dashboard.scss'
import { Outlet, useLocation } from 'react-router-dom'
import Router from "../../router/Router"
const Dashboard = () => {
  const path=useLocation()
  return (
    <div >
       
           
            <NavBar title={Router[0].children.filter(route=>route.path==path.pathname)[0].title}/>
        <div style={{flex:"1 1 0%",width:"100%"}} className='container'>
             <SideBar/>
            <div className='outletHolder' style={{width:"100%"}}>
            <Outlet/>
            </div>

        
           
        </div>
        
    </div>
  )
}

export default Dashboard