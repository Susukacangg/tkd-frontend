import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Home from './pages/Home.tsx'
import './index.css'
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Definition from "./pages/Definition.tsx";
import Contribute from "./pages/Contribute.tsx";
import {createTheme, StyledEngineProvider, ThemeProvider} from "@mui/material";
import {Toaster} from "sonner";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import SearchResult from "./pages/SearchResult.tsx";
import MyContributions from "./pages/MyContributions.tsx";
import EditContribution from "./pages/EditContribution.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import About from "./pages/About.tsx";
import LogoutPage from "./pages/LogoutPage.tsx";

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
        element: <LogoutPage/>,
    }
]);

const theme = createTheme({
    palette: {
        primary: {
            light: "#ffd238",
            main: "#f5bd02",
            dark: "#e1aa04",
            contrastText: "#fff",
        },
        secondary: {
            main: "#fff",
            contrastText: "#000",
        },
    },
    typography: {
        fontFamily: ['Enriqueta', 'Cambria', 'Georgia', 'Times', 'serif'].join(','),
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
              <Toaster richColors
                       position="top-center"
                       offset={100}
                       toastOptions={{
                           classNames: {
                               cancelButton: "bg-transparent text-black"
                           },
                       }}/>
              <AuthProvider>
                  <RouterProvider router={router}/>
              </AuthProvider>
          </StyledEngineProvider>
      </ThemeProvider>
    </StrictMode>
)
