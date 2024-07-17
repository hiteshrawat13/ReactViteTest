import React from 'react'
 
 
import { useDispatch,useSelector,shallowEqual } from 'react-redux'
import DynamicForm from './MyComponent/DynamicForm';

const MyComponent = () => {

    
   
   
    const campaignData = useSelector(state => state.campaignData  )

     

 



  

 
  return (
    <div>

 <DynamicForm campaignData={campaignData}/>
 

    </div>
  )
}

export default MyComponent