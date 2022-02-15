import MainLayout from "./layouts/mainPage";
import {Navigate, useRoutes} from "react-router-dom";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from './pages/Page404';
import Kita from "./pages/kita/Kita";

import Groups from "./pages/groups/Groups";

import Children from "./pages/Children";
import Welcome from "./pages/Welcome";
import UserSettings from "./pages/userSettings/UserSettings";
import ConnectionMainUser from "./pages/connections/ConnectionMainUser";
import ConnectionMainKita from "./pages/connections/ConnectionMainKita";
import GroupSettings from "./pages/groups/GroupSettings";

export default function Router() {

    return useRoutes([
        {
            path: '/main',
            element: <MainLayout/>,
            children: [
                {path: 'welcome', element: <Welcome/>},
                {path: 'playSchool', element: <Kita/>},
                {path: 'groups', element: <Groups/>},
                {path: 'children', element: <Children/>},
                {path: 'kitaConnection', element: <ConnectionMainKita/>},
                {path: 'userConnection', element: <ConnectionMainUser/>},
                {path: 'userSettings', element: <UserSettings/>},
                {path: 'groupSettings', element: <GroupSettings/>},
            ]
        },
        {
            path: '/',
            element: <LogoOnlyLayout/>,
            children: [
                {path: 'login', element: <Login/>},
                {path: 'register', element: <Register/>},
                {path: '404', element: <NotFound/>},
                {path: '/', element: <Navigate to="/login"/>},
                {path: '*', element: <Navigate to="/404"/>}
            ]
        },
        {path: '*', element: <Navigate to="/404" replace/>}
    ]);
}
