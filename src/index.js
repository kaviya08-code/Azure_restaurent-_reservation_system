import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MenuProvider } from "./context/MenuContext"; // ✅ correct path

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MenuProvider>
    <App />
  </MenuProvider>
);
