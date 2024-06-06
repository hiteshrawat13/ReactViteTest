import React from 'react';
import Cookies from 'js-cookie';
import './App.css'

const Auth = () => {
    
        // Check if the user is authenticated
        const token = Cookies.get('access_token');

        if (token) {
            // User is authenticated, render the component
            return true;
        } else {
            // User is not authenticated, redirect to login page
            return false;
        }
   
};

export default Auth;