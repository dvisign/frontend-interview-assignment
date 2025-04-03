import { createRoot } from "react-dom/client";
import App from "@/App";
import { initMsw } from "@/mock";
import "@/assets/css/main.css";

initMsw().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
