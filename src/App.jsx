import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import KanbanBoard from "./components/KanbanBoard";
import ErrorPage from "./components/ErrorPage";
import AboutPage from "./components/AboutPage";
import DocumentationPage from "./components/DocumentationPage";

import KBContextProvider from "./store/kanban-boards-store";
import BCContextProvider from "./store/board-contents-store";

import "./components/index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AboutPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "board/:boardID",
    element: <BCContextProvider><KanbanBoard /></BCContextProvider>
  },
  {
    path: "dashboard",
    element: <KBContextProvider><Dashboard /></KBContextProvider>,
    errorElement: <ErrorPage />
  },
  {
    path: "documentation",
    element: <DocumentationPage />,
    errorElement: <ErrorPage />
  }
]);

export default function App(){
    return(
      <RouterProvider router={router} />
    )
}
