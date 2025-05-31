import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { HashRouter, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Routes>
      <App />
    </Routes>
  </HashRouter>
);
