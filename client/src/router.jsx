import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
// import About from "./Pages/About";
import Layout from "./Components/DefaultLayout";

const router = createBrowserRouter([
    {
        // Home page
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
        ]
    }
]);

export default router;
