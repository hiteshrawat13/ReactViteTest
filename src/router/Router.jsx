import App from "../App"
import CreateCampaign from "../pages/campaign/CreateCampaign"
import CreateNewCampaign from "../pages/campaign/CreateNewCampaign"
import MyCampaigns from "../pages/campaign/MyCampaigns"
import TGIF1STTouchEditor from "../pages/TGIF-editor/TGIF1STTouchEditor"
import Login from "../pages/login/Login"
import UserList from "../pages/user-management/UserList"
import RoleList from "../pages/user-management/RoleList"
import AlphaEditor from "../pages/ALPHA-editor/AlphaEditor"
import Auth from '../Auth';
import CampaignDetails from "../pages/campaign/CampaignDetails"




const Router=[
    {
    
      element: Auth()?<App/> : <Login/>,
      children: [
        {
          path: "/",
          element: <div>Dashboard</div>,
          title:"Dashboard"
        },
        {
          path: '/users',
          element: <UserList/>,
          title:"User Management"
        },
        {
          path: '/roles',
          element: <RoleList/>,
          title:"Role Management"
        },
        {
          path: '/modules',
          element: <div>Module Management</div>,
          title:"Module Management"
        },
        {
          path: '/masters',
          element: <div>Masters</div>,
          title:"Masters"
        },
        {
          path: '/ip',
          element: <div>Ip</div>,
          title:"IP"
        },
        {
          path: '/campaigns',
          element: <MyCampaigns/>,
          title:"My Campaigns"
        },
        {
          path: '/campaigns/create',
          element: <CreateCampaign/>,
          title:"Create Campaign"
        },
        {
          path: '/campaigns/create/:campaign',
          element: <CreateNewCampaign/>,
          title:"Create Campaign"
        },
        {
          path: '/campaigns/details',
          element: <CampaignDetails/>,
          title:"Campaign Details"
        },
        {
          path: '/exit',
          element: <div>exit</div>,
          title:"Exit"
        },
        {
          path: '/editor',
          element: <TGIF1STTouchEditor/>,
          title:"TGIF Editor"
        },
        {
          path: '/editor2',
          element: <AlphaEditor/>,
          title:"Alpha Editor"
        }
        
      ]
  
    },
    {
      path: "/login" ,
      element: <Login/> 
    },

 

  
  ]

  export default Router