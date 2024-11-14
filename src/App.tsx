import ProtectedRoute from "./components/ProtectedRoute.tsx";
import LogoutPage from "./pages/LogoutPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import About from "./pages/About.tsx";
import EditContribution from "./pages/EditContribution.tsx";
import MyContributions from "./pages/MyContributions.tsx";
import SearchResult from "./pages/SearchResult.tsx";
import Contribute from "./pages/Contribute.tsx";
import Definition from "./pages/Definition.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Home from "./pages/Home.tsx";
import Report from "./pages/Report";
import {AuthProvider, useAuth} from "./contexts/AuthContext.tsx";
import {useEffect} from "react";
import {setAuthContextFunctions} from "./common/api-client.ts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={"/home"}/>,
    },
    {
        path: "/home",
        element: <Home/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/definition/:wordId",
        element: <Definition/>,
        errorElement: <NotFoundPage/>,
    },
    {
        path: "/contribute/?word=value?",
        element: (
            <ProtectedRoute>
                <Contribute/>
            </ProtectedRoute>
        ),
    },
    {
        path: "/search/?searchString=value?",
        element: <SearchResult/>,
    },
    {
        path: "/my-contributions",
        element: (
            <ProtectedRoute>
                <MyContributions/>
            </ProtectedRoute>
        ),
    },
    {
        path: "/edit/:wordId",
        element: (
            <ProtectedRoute>
                <EditContribution/>
            </ProtectedRoute>
        )
    },
    {
        path: "/about",
        element: <About/>
    },
    {
        path: "*",
        element: <Navigate to={"/not-found"}/>,
    },
    {
        path: "/not-found",
        element: <NotFoundPage/>,
    },
    {
        path: "/logout",
        element: (
            <ProtectedRoute>
                <LogoutPage/>
            </ProtectedRoute>
        ),
    },
    {
        path: "/report/:wordId",
        element: (
            <ProtectedRoute>
                <Report/>
            </ProtectedRoute>
        ),
    }
]);

const Main = () => {
    const {updateIsTokenRefreshed, logoutUser} = useAuth();

    useEffect(() => {
        setAuthContextFunctions(updateIsTokenRefreshed, logoutUser);
    }, [updateIsTokenRefreshed]);

    return (
        <RouterProvider router={router}/>
    );
}

function App() {
    return (
        <AuthProvider>
            <Main/>
        </AuthProvider>
    );
}

export default App;