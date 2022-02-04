import MainLayout from "./layouts/mainPage";
import {Navigate, useRoutes} from "react-router-dom";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from './pages/Page404';
import Products from './forRefactoring/pages/Products';
import Blog from "./forRefactoring/pages/Blog";
import PlaySchool from "./pages/PlaySchool";
import UserService, {UserServiceImpl} from "./services/UserService";
import PlaySchoolService, {PlaySchoolServiceImpl} from "./services/PlaySchoolService";
import {useState} from "react";
import LoginSignInService, {LoginSignInServiceImpl} from "./services/LoginSignInService";


import Groups from "./pages/Groups";
import GroupService, {GroupServiceImpl} from "./services/GroupService";
import ChildService, {ChildServiceImpl} from "./services/ChildService";
import Children from "./pages/Children";
import User from "./pages/User";
import user from "./forRefactoring/_mocks_/user";

export default function Router() {

    const STORAGE_KEY = 'JWT';
    const [jwt, setJwt] = useState(localStorage.getItem(STORAGE_KEY) || '');

    async function callBackend(url: string, requestMethod: string, data: {}): Promise<any> {
        const requestInit: RequestInit = {
            method: requestMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt,
            }
        }
        if (requestMethod === 'POST') {
            requestInit.body = JSON.stringify(data)
        }
        const response = await fetch(url, requestInit)
        if (!response.ok) {
            throw new Error("HTTP status " + response.status);
        }
        return response.json();
    }

    const playSchoolService: PlaySchoolServiceImpl = PlaySchoolService(callBackend)
    const userService: UserServiceImpl = UserService(jwt, playSchoolService.getKita, callBackend);
    const loginSignInService: LoginSignInServiceImpl = LoginSignInService(setJwt, userService.refreshUser)

    const groupService: GroupServiceImpl = GroupService(callBackend)
    const childService: ChildServiceImpl = ChildService(callBackend)

    return useRoutes([
        {
            path: '/main',
            element: <MainLayout userService={userService} playSchoolService={playSchoolService}/>,
            children: [
                {path: 'playSchool', element: <PlaySchool playSchoolService={playSchoolService}/>},
                {
                    path: 'groups',
                    element: <Groups groupService={groupService} playSchoolName={playSchoolService.playSchoolItem.name}
                                     playSchoolId={playSchoolService.playSchoolItem.id}/>
                },
                {
                    path: 'children',
                    element: <Children children={childService} groupService={groupService}
                                       playSchoolName={playSchoolService.playSchoolItem.name}
                                       playSchoolId={playSchoolService.playSchoolItem.id}/>
                },
                {
                    path: 'user',
                    element: <User getAllUser={userService.getAllUser()}
                                   playSchoolId={playSchoolService.playSchoolItem.id}
                                   refreshAllUser={userService.refreshAllUser}
                                    playSchoolName={playSchoolService.playSchoolItem.name}/>
                },
                {path: 'products', element: <Products/>},
                {path: 'blog', element: <Blog/>}
            ]
        },
        {
            path: '/',
            element: <LogoOnlyLayout/>,
            children: [
                {path: 'login', element: <Login login={loginSignInService}/>},
                {path: 'register', element: <Register register={loginSignInService}/>},
                {path: '404', element: <NotFound/>},
                {path: '/', element: <Navigate to="/login"/>},
                {path: '*', element: <Navigate to="/404"/>}
            ]
        },
        {path: '*', element: <Navigate to="/404" replace/>}
    ]);
}
