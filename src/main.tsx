import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Home from './pages/Home.tsx'
import './index.css'
import Register from "./pages/Register.tsx";
import {ThemeProvider} from "@material-tailwind/react";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Login from "./pages/Login.tsx";

library.add(faSearch);

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
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
          <RouterProvider router={router}/>
      </ThemeProvider>
  </StrictMode>,
)
