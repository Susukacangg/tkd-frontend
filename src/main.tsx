import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createTheme, StyledEngineProvider, ThemeProvider} from "@mui/material";
import {Toaster} from "sonner";
import App from "./App.tsx";


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
              <App/>
          </StyledEngineProvider>
      </ThemeProvider>
    </StrictMode>
)
