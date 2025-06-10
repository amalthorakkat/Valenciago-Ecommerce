import React from "react";
import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const AppData = () => {
  return (
    <div>
      <div className=" lg:mx-30">
        <Hero />
      </div>
    </div>
  );
};

export default AppData;
