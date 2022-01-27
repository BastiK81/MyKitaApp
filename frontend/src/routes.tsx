
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

export default function Router() {
    return useRoutes([
        {
            path: '/main',
            element: <MainLayout />,
            children: [
                { element: <Navigate to="/main/board" replace /> },
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
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> },
                { path: '404', element: <NotFound /> },
                { path: '/', element: <Navigate to="/login" /> },
                { path: '*', element: <Navigate to="/404" /> }
            ]
        },
        { path: '*', element: <Navigate to="/404" replace /> }
    ]);
}
