import React, { useState } from 'react'

import './DropdownMenu.scss'
const DropdownMenu = () => {

    const [collapsed,setCollapsed]=useState(true);

  return (
    <div className='dropdown'>
        <button onClick={()=>setCollapsed(!collapsed)}>Buton</button>
        <div className={ `menu ${(collapsed)?'collapsed':''}` }>
            menu here
        </div>
    </div>
  )
}

export default DropdownMenu