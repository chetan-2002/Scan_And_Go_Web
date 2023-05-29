import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import ScanQr from "../Components/ScanQr";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} exact />
      <Route path="/signup" element={<Signup />} exact />
      <Route path="/scan" element={<ScanQr />} exact />
    </Routes>
  );
};

export default AppRoutes;
