import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const MainPage = lazy(() => import("@/pages/Main"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

export default router;
