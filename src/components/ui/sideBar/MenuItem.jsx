import React, { useEffect, useState } from 'react'
import { FaBeer } from 'react-icons/fa';
import './MenuItem.scss'
import { IoIosArrowDown } from "react-icons/io";
import { useLocation ,useNavigate} from 'react-router-dom';
const MenuItem = ({item,activeItem,handleActiveChange,isSubItem=null}) => {

  const [collapsed,setCollapsed]=useState(true)

  const [active,setActive]=useState(false)
  
  let location = useLocation();
  useEffect(()=>{
    if(item.href==location.pathname){
      setActive(true)
    }else if(item.items?.some(e=>e.href==location.pathname)){
      setActive(true)
    }else{
      setActive(false)
    }

    
  },[location])
  const navigate = useNavigate();
  return (
    <>
    <div 
    className= {`${(isSubItem)?'subMenuItem':'menuItem'} ${(active)?'active':''}`} 
    onClick={()=>{
      handleActiveChange(item);
      setCollapsed(!collapsed);
      console.log(location,"location",item.href);
      if(item.href)navigate(item.href)
      
    }}
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