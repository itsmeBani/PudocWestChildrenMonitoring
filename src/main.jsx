import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ThemeProvider} from "@material-tailwind/react"
import AuthProvider from "./Context/AuthProvider.jsx";
import {CookiesProvider} from "react-cookie";

createRoot(document.getElementById('root')).render(
    <StrictMode>

        <ThemeProvider>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <AuthProvider>


                    <App />


            </AuthProvider>
            </CookiesProvider>
        </ThemeProvider>
    </StrictMode>,
)
