import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../assets/login.png";
import Email from "../assets/email.png";
import Lock from "../assets/lock.png";
import axiosInstance from "../config/axiosConfig";
import toast from "react-hot-toast";


const SignIn = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/login", formData)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data.message);
      });
  };

  return (
    <div className="bg-img" >
      {/* signIn body */}
      <div className="flex justify-center items-center h-[100vh] signInBody">
        {/* signIn card */}
        <form onSubmit={handleSubmit} className="signInCard fadeIn">
          {/* div 1 */}
          <div className="div-1">
            <div className="loginLogo">
              <img className="size-7" src={LoginImg} alt="login logo" />
            </div>
            <div>
              <h1 className="SignInTxt">Sign in with email</h1>
              <p className="SignInP">
                Stay connected. Sign in to explore a world <br /> of
                possibilities
              </p>
            </div>
          </div>

          {/* div 2 */}
          <div className="div-2">
            <div className="inputStyle">
              <img className="size-4" src={Email} alt="email icon" />
              <input
                className="input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="inputStyle">
              <img className="size-4" src={Lock} alt="lock icon" />
              <input
              className="input"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="F-pass">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            {/* Get Started */}
            <button className="button" type="submit ">Get Started</button>
          </div>

          {/* Have an account? */}
          <div className="HaveAnAccount">
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-dashed border-[#3d3d3d]"></div>
              <span className="mx-3 text-[#000000] textSpan">
                {" "}
                Don't have an account?
              </span>
              <div className="flex-1 border-t border-dashed border-[#3d3d3d]"></div>
            </div>

            {/* Sign Up Button */}

            <button className="button" type="button">
              <Link to="/signUp">Sign Up</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;


