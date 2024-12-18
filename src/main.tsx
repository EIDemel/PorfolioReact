import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/animations.css"; // Import du fichier CSS
import "./index.css"; // Assure-toi que le chemin est correct


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);