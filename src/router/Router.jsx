import App from "../App"
import CreateCampaign from "../pages/campaign/CreateCampaign"
import CreateNewCampaign from "../pages/campaign/CreateNewCampaign"
import MyCampaigns from "../pages/campaign/MyCampaigns"
import Editor from "../pages/editor/Editor"
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
          element: <MyCampaigns/>,
        },
        {
          path: '/campaigns/create',
          element: <CreateCampaign/>,
        },
        {
          path: '/campaigns/create/:campaign',
          element: <CreateNewCampaign/>,
        },
        {
          path: '/exit',
          element: <div>exit</div>,
        }
        
      ]
  
    },
    {
      path: "/login" ,
      element: <Login/> 
    },
    {
      path: '/editor',
      element: <Editor/>,
    }
  
  ]

  export default Router