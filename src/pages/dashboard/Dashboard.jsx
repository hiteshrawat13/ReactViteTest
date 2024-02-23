import React from 'react'
import NavBar from '../../components/ui/navBar/NavBar'
import SideBar from '../../components/ui/sideBar/SideBar'

import './Dashboard.scss'
const Dashboard = () => {
  return (
    <div className='container'>
       
            <SideBar/>
        
        <div style={{flexBasis:"80%"}}>
            <NavBar/>
            <div>Content</div>
        </div>
        
    </div>
  )
}

export default Dashboard