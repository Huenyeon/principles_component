import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import App from './App.tsx'  
import "./index.css";
import EMS from "./Ems";
import Activity from "./Activity";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Midterm } from "./Midterms.tsx";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <MantineProvider>
        {/* <Activity /> */}
        {/* <Midterm/> */}
        {/* <App/> */}
        {/* <EMS/> */}
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
