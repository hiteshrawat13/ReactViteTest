import React, { useState } from 'react'

import { useSelector } from 'react-redux'

import {get,post} from '../../Api'

const Login = () => {

  const [empId,setEmpId]=useState("103310")
  const [password,setPassword]=useState("12345")


 const user= useSelector((state)=>state.user)

  const handleSubmit=(e)=>
  {
    e.preventDefault();
    console.log(empId,password);

    get()
    
  }

  return (
  
    <div>
    <div>Login</div>
    <form onSubmit={handleSubmit}>
      <label >
        <span>Emp Id:</span>
        <input type="text"  onChange={(e)=>setEmpId(e.target.value)} value={empId} />
      </label>
      <label >
        <span>Password:</span>
        <input type="password"  onChange={(e)=>setPassword(e.target.value)} value={password}/>
      </label>

      <input type="submit" defaultValue="Login"/>
    </form>
    </div>
   
  )
}

export default Login