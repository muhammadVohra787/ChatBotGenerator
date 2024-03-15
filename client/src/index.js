import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider, Container } from "@mui/material";
import Footer from "./components/Footer";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { theme } from "./assets/theme";
import AuthProvider from "react-auth-kit";
import { store } from "./assets/store";
import { LastLocationProvider } from "./PrivateRoutes";
import ShowLocation from "./components/ShowLocation";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <LastLocationProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider store={store}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Navbar />
              <ShowLocation />
              <App />
              <Footer />
            </ThemeProvider>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </LastLocationProvider>
  </React.StrictMode>
);

reportWebVitals();
