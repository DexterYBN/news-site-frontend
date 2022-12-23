import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
