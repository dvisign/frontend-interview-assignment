import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import "@/assets/css/App.css";

function App() {
  return (
    <div id="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
