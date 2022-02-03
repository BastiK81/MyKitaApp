
import MainLayout from "./layouts/mainPage";
import {Navigate, useRoutes} from "react-router-dom";
import User from "./forRefactoring/pages/User";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from './pages/Page404';
import MainPage from "./forRefactoring/pages/MainPage";
import Products from './forRefactoring/pages/Products';
import Blog from "./forRefactoring/pages/Blog";
import Kita from "./pages/Kita";
import UserInformationService, {IUserInformation} from "./services/UserInformationService";
import KitaInformationService, {IKitaInformationService} from "./services/KitaInformationService";
import {useState} from "react";
import LoginSignInService, {ILoginSignInService} from "./services/LoginSignInService";
import Gruppen from "./pages/Gruppen";
import GruppenInformationService, {IGruppenInformationService} from "./services/GruppenInformationService";
import KinderInformationService, {IKinderInformationService} from "./services/KinderInformationService";
import Kinder from "./pages/Kinder";

export default function Router() {

    const STORAGE_KEY = 'JWT';
    const [jwt, setJwt] = useState(localStorage.getItem(STORAGE_KEY) || '');

    const kitaInformation:IKitaInformationService = KitaInformationService(jwt)
    const userInformation:IUserInformation = UserInformationService(jwt, kitaInformation.getKita);
    const loginSignInService:ILoginSignInService = LoginSignInService(setJwt,userInformation.getUserInformation)

    const gruppenInformationService:IGruppenInformationService = GruppenInformationService(jwt)
    const kinderInformationService:IKinderInformationService = KinderInformationService(jwt)

    return useRoutes([
        {
            path: '/main',
            element: <MainLayout userInformation={userInformation} kitaInformation={kitaInformation}/>,
            children: [
                { path: 'kita', element: <Kita kitaInformation={kitaInformation}/>},
                { path: 'gruppen', element: <Gruppen groups={gruppenInformationService} kitaName={kitaInformation.name} kitaId={kitaInformation.kitaId}/>},
                { path: 'kinder', element: <Kinder childs={kinderInformationService} groups={gruppenInformationService} kitaName={kitaInformation.name} kitaId={kitaInformation.kitaId}/>},
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
