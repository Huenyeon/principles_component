import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from "@mantine/core";
import './index.css'
// import App from './App.tsx'
import "./index.css";
import EMS from "./Ems";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <MantineProvider>
      <EMS/>
    </MantineProvider>
  </StrictMode>,
)
