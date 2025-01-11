import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
// import About from "./Pages/About";
import Layout from "./Components/DefaultLayout";
import LandingPage from "./Pages/LandingPage";

const router = createBrowserRouter([
    {
        // Home page
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <LandingPage />
            },
            {
                path: "/dashboard",
                element: <Home />
            }
        ]
    }
]);

export default router;
