import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SingUp";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="text-primary flex gap-3 items-center justify-center mt-10">
              This is my app
            </div>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
