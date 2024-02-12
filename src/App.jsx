import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import KanbanBoard from "./components/KanbanBoard";
import ErrorPage from "./components/ErrorPage";

import KBContextProvider from "./store/kanban-boards-store";
import BCContextProvider from "./store/board-contents-store";

import "./components/index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <KBContextProvider><Dashboard /></KBContextProvider>,
    errorElement: <ErrorPage />
  },
  {
    path: "board/:boardID",
    element: <BCContextProvider><KanbanBoard /></BCContextProvider>
  }
]);

export default function App(){
    return(
      <RouterProvider router={router} />
    )
}
