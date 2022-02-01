
import MainLayout from "./layouts/mainPage";
import {Navigate, useRoutes} from "react-router-dom";
import User from "./pages/User";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from './pages/Page404';
import MainPage from "./pages/MainPage";
import Products from './pages/Products';
import Blog from "./pages/Blog";
import Kita from "./pages/Kita";
import UserInformationService, {IUserInformation} from "./utils/UserInformationService";
import KitaInformationService, {IKitaInformationService} from "./utils/KitaInformationService";
import {useState} from "react";
import LoginSignInService, {ILoginSignInService} from "./utils/LoginSignInService";

export default function Router() {

    const STORAGE_KEY = 'JWT';
    const [jwt, setJwt] = useState(localStorage.getItem(STORAGE_KEY) || '');

    const kitaInformation:IKitaInformationService = KitaInformationService(jwt)
    const userInformation:IUserInformation = UserInformationService(jwt, kitaInformation.getKita);
    const loginSignInService:ILoginSignInService = LoginSignInService(setJwt,userInformation.getUserInformation)

    return useRoutes([
        {
            path: '/main',
            element: <MainLayout userInformation={userInformation}/>,
            children: [
                { path: 'kita', element: <Kita kitaInformation={kitaInformation}/>},
                { path: 'board', element: <MainPage /> },
                { path: 'user', element: <User /> },
                { path: 'products', element: <Products /> },
                { path: 'blog', element: <Blog /> }
            ]
        },
        {
            path: '/',
            element: <LogoOnlyLayout />,
            children: [
                { path: 'login', element: <Login login={loginSignInService}/> },
                { path: 'register', element: <Register register={loginSignInService} /> },
                { path: '404', element: <NotFound /> },
                { path: '/', element: <Navigate to="/login" /> },
                { path: '*', element: <Navigate to="/404" /> }
            ]
        },
        { path: '*', element: <Navigate to="/404" replace /> }
    ]);
}
