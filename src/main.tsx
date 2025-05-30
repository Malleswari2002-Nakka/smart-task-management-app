import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/smart-task-management-app">
    <App />
  </BrowserRouter>
);
