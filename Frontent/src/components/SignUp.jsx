import React, { useState } from "react";
import CheckList from "../assets/check-list.png";
import Email from "../assets/email.png";
import Lock from "../assets/lock.png";
import Pen from "../assets/pen.png";
import Contact from "../assets/contact.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import toast from "react-hot-toast";

const SignUp = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [fullname, setFullname] = useState("");
  // const [username, setUsername] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    username: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const error = validation(formData);
  //   console.log(Object.keys(error).length);

  //   if (Object.keys(error).length === 0) {
  //     console.log("FORM SUBMITTED");
  //     console.log(formData);
  //     setFormErrors({});
  //   } else {
  //     setFormErrors(error);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validation(formData);

    if (Object.keys(error).length === 0) {
      console.log("FORM SUBMITTED SUCCESSFULLY");
      axiosInstance
        .post("/register", formData,{withCredentials:true})
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          navigate("/")
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
        "Password must contain atleast one  uppercase and one lowercase ";
    }

    // full name error

    if (!formValues.fullname) {
      error.fullname = "Please enter your full name";
    } else if (formValues.fullname.length < 3) {
      error.fullname = "Name can't be under 3  characters";
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
    <div className="bg-img">
      {/* signUp body */}
      <div className="flex justify-center items-center signInBody">
        {/* signUp card */}
        <form onSubmit={handleSubmit} className="signInCard">
          {/* div 1 */}
          <div className="div-1">
            <div className="loginLogo">
              <img className="size-7  " src={CheckList} alt="login logo" />
            </div>
            <div>
              <h1 className="SignInTxt">Get started now</h1>
              <p className="SignInP">
                Join us today. Create an account and unlock <br /> endless
                opportunities
              </p>
            </div>
          </div>

          {/* div 2 */}

          {/* email  */}
          <div className="div-2">
            <div className="inputStyle">
              <img className="size-4" src={Email} alt="" />
              <input
                className="input"
                onChange={handleChange}
                value={formData.email}
                type="email"
                placeholder="Email"
                name="email"
              />
            </div>

            <div className="error">
              {formErrors.email && <p>{formErrors.email} </p>}
            </div>

            {/* password */}
            <div className="inputStyle">
              <img className="size-4" src={Lock} alt="" />
              <input
                className="input"
                onChange={handleChange}
                value={formData.password}
                type="password"
                placeholder="Password"
                name="password"
              />
            </div>

            <div className="error">
              {formErrors.password && <p>{formErrors.password} </p>}
            </div>

            {/* full name  */}
            <div className="inputStyle">
              <img className="size-4" src={Pen} alt="" />
              <input
                className="input"
                onChange={handleChange}
                value={formData.fullname}
                type="text"
                placeholder="Full Name"
                name="fullname"
              />
            </div>
            <div className="error">
              {formErrors.fullname && <p>{formErrors.fullname} </p>}
            </div>

            {/* username  */}
            <div className="inputStyle">
              <img className="size-4" src={Contact} alt="" />
              <input
                className="input"
                onChange={handleChange}
                value={formData.username}
                type="text"
                placeholder="Username"
                name="username"
              />
            </div>

            <div className="error">
              {formErrors.username && <p>{formErrors.username} </p>}
            </div>

            {/* <div className="F-pass ">
                <a href="">Forgot password?</a>
            </div> */}
            {/* get started */}
            <div className="creatMyAcc">
              <button className=" button hover:cursor-pointer ">
                Create My Account
              </button>
            </div>
          </div>

          {/* have an account? */}
          <div className="HaveAnAccount">
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-dashed border-[#3d3d3d]"></div>
              <span className="mx-3 text-[#000000] textSpan">
                Have an account?{" "}
              </span>
              <div className="flex-1 border-t border-dashed border-[#3d3d3d]"></div>
            </div>
            {/* button */}
            {/* <button onClick={()=>navigate("/signIn")}  className="signUpBtn">Sign In</button> */}
            <button type="button" className=" button signUpBtn">
              <Link to={"/"}> Sign In</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
