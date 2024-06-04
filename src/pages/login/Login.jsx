import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import axios from "axios";

import './Login.scss'
import Config from '../../Config';

const Login = () => {

  const [empId,setEmpId]=useState("")
  const [password,setPassword]=useState("")


 const user= useSelector((state)=>state.user)

  const handleSubmit= async (e)=>
  {
    e.preventDefault();
    const response = await axios.post(Config.API_BASE_URL+"/user/login",{'empid':empId,'password':password});
    console.log(response.data)
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

      <input type="submit" defaultValue="Login" />
    </form>
    </div>
   
  )
}

export default Login