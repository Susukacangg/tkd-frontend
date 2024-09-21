import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Home from './pages/Home.tsx'
import './index.css'
import Register from "./pages/Register.tsx";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowRight, faSearch, faLanguage, faQuoteLeft, faCircleXmark, faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import Login from "./pages/Login.tsx";
import Definition from "./pages/Definition.tsx";
import Contribute from "./pages/Contribute.tsx";
import {createTheme, StyledEngineProvider, ThemeProvider} from "@mui/material";

library.add(faSearch, faArrowRight, faLanguage, faQuoteLeft, faCircleXmark, faCirclePlus);

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
        fontFamily: ['"Playfair Display"', 'Cambria', 'Georgia', 'Times', 'serif'].join(','),
    },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
              <RouterProvider router={router}/>
          </StyledEngineProvider>
      </ThemeProvider>
  </StrictMode>,
)
