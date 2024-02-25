import App from "../App"
import Login from "../pages/login/Login"



const Router=[
    {
    
      element: <App/>,
      children: [
        {
          path: "/",
          element: <div>Dashboard</div>,
        },
        {
          path: '/users',
          element: <div>Users</div>,
        },
        {
          path: '/masters',
          element: <div>Masters</div>,
        },
        {
          path: '/ip',
          element: <div>Ip</div>,
        },
        {
          path: '/campaigns',
          element: <div>Campaigns</div>,
        },
        {
          path: '/campaigns/create',
          element: <div>Create Campaign</div>,
        },
        {
          path: '/exit',
          element: <div>exit</div>,
        }
      ]
  
    },
    {
      path:"/login",
      element:<Login/> 
    }
  
  ]

  export default Router