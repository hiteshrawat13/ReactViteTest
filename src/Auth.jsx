import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

 

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const token = Cookies.get('access_token');
  const userName = Cookies.get('user_id');

  

 
  

  return (
    <AuthContext.Provider value={{ token, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
