// import React from 'react';
 import Cookies from 'js-cookie';
 import './App.css'
 import Login from "./pages/login/Login"
 



import React, { createContext, useContext } from 'react'


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const token = Cookies.get('access_token');
  const userName = Cookies.get('user_id');
  if (!token) {
    // User is authenticated, render the component
    return (<><Login/></>)
} 
  return <AuthContext.Provider  value={{ token ,userName}} >{children}</AuthContext.Provider>;
};

export default AuthProvider;


export const useAuth = () => {
  return useContext(AuthContext);
};



 

 
 
 