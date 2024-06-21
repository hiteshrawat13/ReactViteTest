import React ,{useState,useEffect} from 'react'
import { IoIosArrowDown } from "react-icons/io";
import MenuItem from './MenuItem';

import './Accordion.scss'
import { useLocation } from 'react-router-dom';


const Accordion = ({ item, activeItem, handleActiveChange, isSubItem = null }) => {

  const [collapsed, setCollapsed] = useState(true)
  const [active, setActive] = useState(false)
  
  let location = useLocation();
  useEffect(() => {
      if (item.items?.some(e => e.href == location.pathname)) {
          setActive(true)
      }else {
          setActive(false)
      }


  }, [location])

  return <div className='accordionHolder'>
  <div
    className={`accordion ${(active)?'active':''}`}
    onClick={() => {
      handleActiveChange(item);
      setCollapsed(!collapsed);
     
      if (item.href) navigate(item.href)

    }}  >
    {item.icon}
    <div className='label'>{item.label}</div>
    {(item.items) ? <IoIosArrowDown className="arrow" style={{transform:`${(collapsed)?'rotate(-90deg)':'rotate(0deg)'}`,transition:"all 0.3s"}}/> : null}
  </div>

  {
    (item.items) ?
      <div className={`subMenu ${(collapsed == false) ? 'show' : 'hide'}`} >

        {
          item.items.map((subItem) => {
            return <MenuItem key={subItem.id} isSubItem={true} item={subItem} activeItem={activeItem} handleActiveChange={() => handleActiveChange(subItem)} />
          }
          )}
      </div>
      : null
  }
</div>
}

export default Accordion