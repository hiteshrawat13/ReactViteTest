import React, { useEffect, useState } from 'react'

import './MenuItem.scss'

import { useLocation, useNavigate } from 'react-router-dom';
const MenuItem = ({ item, activeItem, handleActiveChange, isSubItem = null }) => {

  const [collapsed, setCollapsed] = useState(true)

  const [active, setActive] = useState(false)

  let location = useLocation();
  useEffect(() => {
    if (item.href == location.pathname) {
      setActive(true)
    } else {
      setActive(false)
    }


  }, [location])
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`${(isSubItem) ? 'menuItem' : 'menuItem'} ${(active) ? 'active' : ''}`}
        onClick={() => {
          handleActiveChange(item);
          setCollapsed(!collapsed);
          console.log(location, "location", item.href);
          if (item.href) navigate(item.href)

        }}
      >
        {item.icon}
        <div className='label'>{item.label}</div>
        
      </div>

 
    </>
  )
}

export default MenuItem