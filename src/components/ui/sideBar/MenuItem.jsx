import React, { useState } from 'react'
import { FaBeer } from 'react-icons/fa';
import './MenuItem.scss'
import { IoIosArrowDown } from "react-icons/io";
const MenuItem = ({item,activeItem,handleActiveChange,isSubItem=null}) => {

  const [collapsed,setCollapsed]=useState(true)

  return (
    <>
    <div 
    className= {`${(isSubItem)?'subMenuItem':'menuItem'} ${(item.id==activeItem || item?.items?.some(e=>e.id==activeItem))?'active':''}`} 
    onClick={()=>{handleActiveChange(item);setCollapsed(!collapsed)}}
    >
            {item.icon}
            <div className='label'>{item.label}</div>
            {(item.items)?<IoIosArrowDown/>:null}
    </div>
   
    {
      (item.items)?
      <div 
      className={`subMenu ${(  collapsed==false )?'show':'hide'}`}
      >
        
        {
          item.items.map((subItem)=>{ 
            return <MenuItem key={subItem.id} isSubItem={true} item={subItem} activeItem={activeItem} handleActiveChange={()=>handleActiveChange(subItem)}/>
          }
        )}
      </div>
      :null
    }
    </>
  )
}

export default MenuItem