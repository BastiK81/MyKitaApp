import MainLayout from "./layouts/mainPage";
import {Navigate, useRoutes} from "react-router-dom";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from './pages/Page404';
import PlaySchool from "./pages/playSchool/PlaySchool";

import Groups from "./pages/Groups";

import Children from "./pages/Children";
import Welcome from "./pages/Welcome";
import UserConnections from "./pages/userConnections/UserConnections";
import UserSettings from "./pages/userSettings/UserSettings";

export default function Router() {

    return useRoutes([
        {
            path: '/main',
            element: <MainLayout/>,
            children: [
                {path: 'welcome', element: <Welcome/>},
                {path: 'playSchool', element: <PlaySchool/>},
                {path: 'groups', element: <Groups/>},
                {path: 'children', element: <Children/>},
                {path: 'user', element: <UserConnections/>},
                {path: 'userSettings', element: <UserSettings/>},
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
