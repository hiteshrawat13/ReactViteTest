import App from "../App"
import CreateCampaign from "../pages/campaign/CreateCampaign"
import CreateNewCampaign from "../pages/campaign/CreateNewCampaign"
import MyCampaigns from "../pages/campaign/MyCampaigns"
import TGIF1STTouchEditor from "../pages/editor/TGIF1STTouchEditor"
import Login from "../pages/login/Login"
import UserList from "../pages/user-management/UserList"
import RoleList from "../pages/user-management/RoleList"


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
          element: <UserList/>,
        },
        {
          path: '/roles',
          element: <RoleList/>,
        },
        {
          path: '/modules',
          element: <div>Module Management</div>,
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
      element: <TGIF1STTouchEditor/>,
    }
  
  ]

  export default Router