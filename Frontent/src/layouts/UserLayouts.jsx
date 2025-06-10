import React from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthStatus } from "../features/authSlice";

const UserLayouts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, []);
  return (
    <div>
      <Header />

      <Outlet />

      <Footer />

    </div>
  );
};

export default UserLayouts;
