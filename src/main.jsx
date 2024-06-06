import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Router from './router/Router.jsx';

const router = createBrowserRouter(Router ,{ basename: "/CAMPAIGN_TOOL_V1/ReactViteTest/dist" });


import { Provider } from 'react-redux';
import store from './store/Store.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     
        <RouterProvider router={router} />
      
    </Provider>
  </React.StrictMode>,
)
