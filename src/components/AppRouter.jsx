import { createBrowserRouter, Route } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./Home";
import Todo from "./todo/Todo";
import Counter from "./Counter";

function AppRouter() {
    const router = createBrowserRouter([
        {
            path: "/",
            children: [
                {index: true, Component: Home},
                {path: "todo", Component: Todo},
                {path: "counter", Component: Counter},
            ]
        },
    ])
    return <RouterProvider router={router} />;
}

export default AppRouter;