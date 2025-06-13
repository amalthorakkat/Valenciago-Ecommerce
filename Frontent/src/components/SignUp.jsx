import React, { useState } from "react";
import CheckList from "../assets/check-list.png";
import Email from "../assets/email.png";
import Lock from "../assets/lock.png";
import Pen from "../assets/pen.png";
import Contact from "../assets/contact.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import toast from "react-hot-toast";
import Logo from "../assets/valenciago-white.png";
import Footer from "./Footer";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    username: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validation(formData);

    if (Object.keys(error).length === 0) {
      console.log("FORM SUBMITTED SUCCESSFULLY");
      axiosInstance
        .post("/register", formData, { withCredentials: true })
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    } else {
      setFormErrors(error);
      toast.error("error! fill carefully");
    }
  };

  // validation
  const validation = (formValues) => {
    const error = {};

    // email regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // email error
    if (!formValues.email) {
      error.email = "Please enter a email";
    } else if (!emailRegex.test(formValues.email)) {
      error.email = "Enter a email valid email address";
    }

    // password error
    const uppercaseRegex = /(?=.*?[A-Z])/;
    const lowercaseRegex = /(?=.*?[a-z])/;

    if (!formValues.password) {
      error.password = "Please enter a password";
    } else if (formValues.password.length < 8) {
      error.password = "Password must contain atleast 8 charecters";
    } else if (
      !uppercaseRegex.test(formValues.password) ||
      !lowercaseRegex.test(formValues.password)
    ) {
      error.password =
        "Password must contain atleast one uppercase and one lowercase";
    }

    // full name error
    if (!formValues.fullname) {
      error.fullname = "Please enter your full name";
    } else if (formValues.fullname.length < 3) {
      error.fullname = "Name can't be under 3 characters";
    }

    //username error
    if (!formValues.username) {
      error.username = "Please enter a username";
    } else if (formValues.username.length < 3) {
      error.username = "Username can't be under 3 characters";
    }

    return error;
  };

  return (
    <>
      <div className=" relative h-[80px] bg-[#141414] flex items-center justify-center mb-[-30px] z-10">
        <img className=" h-10 " src={Logo} alt="" />
      </div>
      <div className=" bg-img relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-3">
        {/* SignUp Card */}
        <div className="relative z-10 w-full max-w-xs sm:max-w-sm  card">
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-4 sm:p-6 relative overflow-hidden"
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-xl"></div>

            <div className="relative z-10 ">
              {/* Header Section */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-3 sm:mb-4 shadow-lg">
                  <img
                    className="w-5 h-5 sm:w-6 sm:h-6 filter brightness-0 invert"
                    src={CheckList}
                    alt="signup logo"
                  />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                  Get started now
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Sign Up to continue your shopping journey
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5">
                {/* Email Input */}
                <div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <img
                        className="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                        src={Email}
                        alt="email icon"
                      />
                    </div>
                    <input
                      className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm bg-gray-50/80 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:bg-gray-50"
                      onChange={handleChange}
                      value={formData.email}
                      type="email"
                      placeholder="Email"
                      name="email"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <img
                        className="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                        src={Lock}
                        alt="lock icon"
                      />
                    </div>
                    <input
                      className="w-full pl-9 sm:pl-10 pr-10 py-2.5 sm:py-3 text-sm bg-gray-50/80 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:bg-gray-50"
                      onChange={handleChange}
                      value={formData.password}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                    />
                    <button
                      type="button"
                      onClick={handleTogglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                    >
                      {showPassword ? (
                        <svg
                          className="w-4 h-4 cursor-pointer "
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 cursor-pointer"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {formErrors.password}
                    </p>
                  )}
                </div>

                {/* Full Name Input */}
                <div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <img
                        className="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                        src={Pen}
                        alt="pen icon"
                      />
                    </div>
                    <input
                      className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm bg-gray-50/80 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:bg-gray-50"
                      onChange={handleChange}
                      value={formData.fullname}
                      type="text"
                      placeholder="Full Name"
                      name="fullname"
                    />
                  </div>
                  {formErrors.fullname && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {formErrors.fullname}
                    </p>
                  )}
                </div>

                {/* Username Input */}
                <div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <img
                        className="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                        src={Contact}
                        alt="contact icon"
                      />
                    </div>
                    <input
                      className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm bg-gray-50/80 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:bg-gray-50"
                      onChange={handleChange}
                      value={formData.username}
                      type="text"
                      placeholder="Username"
                      name="username"
                    />
                  </div>
                  {formErrors.username && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {formErrors.username}
                    </p>
                  )}
                </div>
              </div>

              {/* Create Account Button */}
              <button
                className="w-full cursor-pointer bg-black text-white font-bold py-3 px-5 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200 shadow-lg"
                type="submit"
              >
                Create My Account
              </button>

              {/* Benefits */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  ✓ Secure checkout ✓ Order tracking ✓ Exclusive deals
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-400"></div>
                <span className="mx-3 text-gray-500 text-sm font-medium bg-white px-2">
                  Have an account?
                </span>
                <div className="flex-1 border-t border-gray-400"></div>
              </div>

              {/* Sign In Button */}
              <Link to="/signIn" className="block w-full">
                <button
                  className="w-full cursor-pointer bg-white text-black font-bold py-3 px-5 rounded-lg border-2 border-black hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200"
                  type="button"
                >
                  Sign In
                </button>
              </Link>

              {/* Trust indicators */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  Join thousands of satisfied customers
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
