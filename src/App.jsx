import { useEffect, useState } from 'react'


 

import './App.css'
import Dashboard from './pages/dashboard/Dashboard'
import { useNavigate } from 'react-router-dom'

import Cookies from 'js-cookie';

function App() {
  const [count, setCount] = useState(0)

  

  
  const navigate = useNavigate();
  const token = Cookies.get('access_token');
  const userName = Cookies.get('user_id');

  useEffect(() => {
    if (!token) {
      // Redirect to login if no token is found
      navigate("/login");
      
    }
     
  }, []);


  return (
    <>
      
    <Dashboard/> 

  
      
    </>
  )
}

export default App
