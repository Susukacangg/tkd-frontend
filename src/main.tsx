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
import axios from "axios";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import {IS_AUTHENTICATED_KEY} from "./common/CommonConst.ts";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

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
        path: "contribute",
        element: (
            <ProtectedRoute>
                <Contribute/>
            </ProtectedRoute>
        ),
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

axios.defaults.baseURL = "http://localhost:8081/api";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if(error.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axios.post('/auth/refresh', {
                    withCredentials: true,
                    timeout: 1100,
                    timeoutErrorMessage: "Failed to refresh token",
                })

                return axios(originalRequest);
            } catch (error) {
                // do nothing
            }
        } else if (error.status === 500 && error.response.data.message === "Refresh token error") {
            localStorage.removeItem(IS_AUTHENTICATED_KEY);
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

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
