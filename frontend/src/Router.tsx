
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
import UserInformationService, {IUserInformation} from "./services/UserInformationService";
import KitaInformationService, {IKitaInformationService} from "./services/KitaInformationService";
import {useState} from "react";
import LoginSignInService, {ILoginSignInService} from "./services/LoginSignInService";
import Gruppen from "./pages/Gruppen";
import GruppenInformationService, {IGruppenInformationService} from "./services/GruppenInformationService";

export default function Router() {

    const STORAGE_KEY = 'JWT';
    const [jwt, setJwt] = useState(localStorage.getItem(STORAGE_KEY) || '');

    const gruppenInformationService:IGruppenInformationService = GruppenInformationService(jwt)
    const kitaInformation:IKitaInformationService = KitaInformationService(jwt, gruppenInformationService.getItemsFromBackend)
    const userInformation:IUserInformation = UserInformationService(jwt, kitaInformation.getKita);
    const loginSignInService:ILoginSignInService = LoginSignInService(setJwt,userInformation.getUserInformation)

    return useRoutes([
        {
            path: '/main',
            element: <MainLayout userInformation={userInformation} kitaInformation={kitaInformation}/>,
            children: [
                { path: 'kita', element: <Kita kitaInformation={kitaInformation}/>},
                { path: 'gruppen', element: <Gruppen groups={gruppenInformationService} kitaName={kitaInformation.name} kitaId={kitaInformation.kitaId}/>},
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
