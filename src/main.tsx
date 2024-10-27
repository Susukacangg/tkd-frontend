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
        path: "/search/:searchString",
        element: <SearchResult/>,
    },
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
