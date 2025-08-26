import { createBrowserRouter, Route } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./Home";

function AppRouter() {
    const router = createBrowserRouter([
        {
            path: "/",
            children: [
                {index: true, Component: Home}
            ]
        },
    ])
    return <RouterProvider router={router} />;
}

export default AppRouter;