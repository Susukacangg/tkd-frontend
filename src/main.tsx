import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Home from './pages/Home.tsx'
import './index.css'
import Register from "./pages/Register.tsx";
import {ThemeProvider} from "@material-tailwind/react";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowRight, faSearch, faLanguage, faQuoteLeft} from "@fortawesome/free-solid-svg-icons";
import Login from "./pages/Login.tsx";
import Definition from "./pages/Definition.tsx";
import Contribute from "./pages/Contribute.tsx";

library.add(faSearch, faArrowRight, faLanguage, faQuoteLeft);

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
    },
    {
        path: "/definition/:wordId",
        element: <Definition/>,
    },
    {
        path: "contribute",
        element: <Contribute/>,
    }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
          <RouterProvider router={router}/>
      </ThemeProvider>
  </StrictMode>,
)
