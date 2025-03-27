import App from "../App"
import UserList from "../pages/user-management/UserList"
import RoleList from "../pages/user-management/RoleList"
import AuthProvider from '../Auth';
import CreateCampaignPage from "../pages/new/CreateCampaignPage"
import EditorMain from "../pages/editor/EditorMain"
import CampaignList from "../pages/new/CampaignList"
import LinkList from "../pages/new/LinkList"
import Login from "../pages/login/Login"
import UserHome from "../pages/dashboard/UserHome";

 

const Router = [
  {

    // element: <AuthProvider> <App/> </AuthProvider> ,
    element: <App />,
    children: [
   
      {
        path: "/",
        element: <UserHome/>,
        title: "Campaign Builder Tool"
      },
      {
        path: '/users',
        element: <UserList />,
        title: "User Management"
      },
      {
        path: '/roles',
        element: <RoleList />,
        title: "Role Management"
      },
      {
        path: '/modules',
        element: <div>Module Management</div>,
        title: "Module Management"
      },
      {
        path: '/masters',
        element: <div>Masters</div>,
        title: "Masters"
      },
      {
        path: '/exit',
        element: <div>exit</div>,
        title: "Exit"
      },
      {
        path: '/editor',
        element: <EditorMain />,
        title: "Editor"
      },

      {
        path: "/new",
        element: <CreateCampaignPage />,
        title: "New Campaign"
      },

      {
        path: "/campaignlist",
        element: <CampaignList />,
        handle: {
          crumb: () => <div>CampaignListCrumb</div>,
        }
      },

      {
        path: "/linklist",
        element: <LinkList />,
        handle: {
          crumb: (data) => <div>{JSON.stringify(data)}</div>,
          data: { dd: "WW" }
        },

      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  }

]

export default Router