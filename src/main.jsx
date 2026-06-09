import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { F1DataProvider } from "./context/F1DataContext.jsx";

import "./i18n";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <F1DataProvider>
            <App />
        </F1DataProvider>
    </BrowserRouter>,
);
