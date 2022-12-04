import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./context/useContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Invite from "./components/Invite/Invite";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/invite" element={<Invite/>} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
