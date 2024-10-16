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
import axios, {AxiosResponse} from "axios";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import LoginResponse from "./dto/LoginResponse.ts";
import {IS_AUTHENTICATED_KEY, JWT_TOKEN_KEY} from "./common/CommonConst.ts";
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
                const response: AxiosResponse<LoginResponse, any> = await axios.post('/auth/refresh', {
                    timeout: 1100,
                    timeoutErrorMessage: "Failed to refresh token",
                })

                sessionStorage.setItem(JWT_TOKEN_KEY, response.data.token)

                originalRequest.headers["Authorization"] = "Bearer " + response.data.token;
                return axios(originalRequest);
            } catch (error) {
                throw error;
            }
        } else if (error.status === 500 && error.response.data.message === "No refresh token found") {
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
