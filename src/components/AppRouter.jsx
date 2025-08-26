import { createBrowserRouter, Route } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./Home";
import Todo from "./todo/Todo";

function AppRouter() {
    const router = createBrowserRouter([
        {
            path: "/",
            children: [
                {index: true, Component: Home},
                {path: "todo", Component: Todo}
            ]
        },
    ])
    return <RouterProvider router={router} />;
}

export default AppRouter;