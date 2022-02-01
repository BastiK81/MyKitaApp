
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
import {useState} from "react";

export default function Router() {

    const STORAGE_KEY = 'JWT';
    const [jwt, setJwt] = useState(localStorage.getItem(STORAGE_KEY) || '');

    return useRoutes([
        {
            path: '/main',
            element: <MainLayout />,
            children: [
                { element: <Navigate to="/main/board" replace /> },
                { path: 'kita', element: <Kita jwt={jwt} setJwt={setJwt}/>},
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
                { path: 'login', element: <Login setJwt={setJwt}/> },
                { path: 'register', element: <Register setJwt={setJwt}/> },
                { path: '404', element: <NotFound /> },
                { path: '/', element: <Navigate to="/login" /> },
                { path: '*', element: <Navigate to="/404" /> }
            ]
        },
        { path: '*', element: <Navigate to="/404" replace /> }
    ]);
}
