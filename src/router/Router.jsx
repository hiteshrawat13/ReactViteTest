import App from "../App"
import CreateCampaign from "../pages/campaign/CreateCampaign"

import MyCampaigns from "../pages/campaign/MyCampaigns"
import TGIF1STTouchEditor from "../pages/TGIF-editor/TGIF1STTouchEditor"
import Login from "../pages/login/Login"
import UserList from "../pages/user-management/UserList"
import RoleList from "../pages/user-management/RoleList"
import AlphaEditor from "../pages/ALPHA-editor/AlphaEditor"
import Auth from '../Auth';
import CampaignDetails from "../pages/campaign/CampaignDetails"
import Test from "../Test/Test"
 
import CreateCampaignPage from "../pages/new/CreateCampaignPage"
import EditorMain from "../pages/editor/EditorMain"
import CampaignList from "../pages/new/CampaignList"
import LinkList from "../pages/new/LinkList"





const Router=[
    {
    
      //element: Auth()?<App/> : <Login/>,
      element: <App/>  ,
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
          element: <EditorMain/>,
          title:"Editor"
        },
        {
          path: '/editor/TGIF',
          element: <TGIF1STTouchEditor/>,
          title:"TGIF Editor"
        },
        {
          path: '/editor/ALPHA',
          element: <AlphaEditor/>,
          title:"Alpha Editor"
        },

        {
          path: "/new" ,
          element: <CreateCampaignPage/>
        },
    
        {
          path: "/campaignlist" ,
          element: <CampaignList/>
        },
    
        {
          path: "/linklist" ,
          element: <LinkList/>
        },
      ]
    },
    {
      path: "/login" ,
      element: <Login/> 
    },

    {
      path: "/test" ,
      element: <Test/> 
    },



 

  
  ]

  export default Router