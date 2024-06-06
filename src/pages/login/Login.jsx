import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import axios from "axios";

import './Login.scss'
import Config from '../../Config';
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';



const Login = () => {



  const [empId,setEmpId]=useState("")
  const [password,setPassword]=useState("")


 const user= useSelector((state)=>state.user)
 const navigate = useNavigate();
  const handleSubmit= async (e)=>
  {
    e.preventDefault();

    try{
      const response = await axios.post(Config.API_BASE_URL+"/user/login",{'empid':empId,'password':password});
      console.log(response.data);
      Cookies.set("user_name", response.data.name, { expires: 7, path: "/" });
      Cookies.set("user_id", response.data.id, { expires: 7, path: "/" });
      Cookies.set("access_token", response.data.accessToken, { expires: 7, path: "/" });
      Cookies.set("user_permissions",JSON.stringify(response.data.permissions), { expires: 7, path: "/" });

      
      navigate('/');
      window.location.reload();
      
    }catch(e){
      console.log(e);
      console.log(e.response.data.messsage);
    }
   

  }

  return (
 
    <div className='Login'>
    <form onSubmit={handleSubmit}>
    <div className='logoHolder'>
    <img src='./ondirect-logo.png'/>
    </div>
     
    <h1>Login to your account</h1>
      <label >
        <span>Emp Id:</span>
        <input type="text"  onChange={(e)=>setEmpId(e.target.value)} value={empId} />
      </label>
      <label >
        <span>Password:</span>
        <input type="password"  onChange={(e)=>setPassword(e.target.value)} value={password}/>
      </label>

      <input type="submit" defaultValue="Login" style={{'marginTop':'15px'}}/>
    </form>
    </div>
 
  )
}

export default Login