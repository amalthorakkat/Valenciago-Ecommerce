import React from "react";
import LogoWhite from "../assets/valenciago-white.png";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // Send to Admin
    emailjs
      .sendForm(
        "service_319av2s",
        "template_t3eg31t",
        form,
        "E5G6EuziRy2ZogoFM"
      )
      .then((result) => {
        console.log("Admin email sent:", result.text);
      })
      .catch((error) => {
        console.error("Admin email error:", error.text);
      });

    // Send Auto-Reply to User
    emailjs
      .sendForm(
        "service_319av2s",
        "template_g1i4vdp",
        form,
        "E5G6EuziRy2ZogoFM"
      )
      .then((result) => {
        console.log("Auto-reply sent:", result.text);
        // toast.success("Suscribed");


        


        form.reset();
      })
      .catch((error) => {
        console.error("Auto-reply error:", error.text);
        toast.error("Something went wrong, Please try again.");
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" flex-col bg-[#101828] py-15 px-7 flex items-center justify-center "
      >
        <div className="text-white flex flex-col items-center text-center mb-10">
          <h1 className=" text-2xl font-medium mb-1 ">
            Subscribe to Our Newsletter
          </h1>
          <p className=" w-[75%] text-[12px] ">
            Get the latest updates, exclusive offers, and top deals straight to
            your inbox.
          </p>
        </div>
        <div className=" flex items-center w-[350px] h-10 ">
          <input
            className="bg-white outline-none h-full w-full px-2 "
            type="email"
            placeholder="Your email address"
            name="user_email"
            required
          />
          <button className="bg-black text-white h-full px-3 cursor-pointer ">
            <p className="active:scale-90  transition duration-150 ease-in-out" >Subscribe</p>
          </button>
        </div>
      </form>
      <div className="bg-[#141414] px-5 pb-10">
        {/* Main Footer Sections */}
        <div className="flex flex-wrap items-center justify-between xl:justify-center gap-10 p-10 lg:p-15">
          {/* About Us */}
          <div className="w-full lg:w-1/4">
            <h1 className="font-medium mb-2 text-white">About Us</h1>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Who We Are
            </p>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Our Mission
            </p>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Careers
            </p>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Press & Media
            </p>
          </div>

          {/* Customer Service */}
          <div className="w-full lg:w-1/4">
            <h1 className="font-medium mb-2 text-white">Customer Service</h1>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Help Center
            </p>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Shipping Information
            </p>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Returns & Exchanges
            </p>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Track Your Order
            </p>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Contact Support
            </p>
          </div>

          {/* Shop */}
          <div className="w-full lg:w-1/4">
            <h1 className="font-medium mb-2 text-white">Shop</h1>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Men's Fashion
            </p>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Women's Fashion
            </p>
          </div>

          {/* Legal & Policies */}
          <div className="w-full lg:w-1/4">
            <h1 className="font-medium mb-2 text-white">Legal & Policies</h1>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Privacy Policy
            </p>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Terms of Service
            </p>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              Refund Policy
            </p>
            <p className="font-light text-[14px] text-[#8b8b8b] hover:text-white cursor-pointer">
              DMCA Policy
            </p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="px-5 py-4 flex flex-col lg:flex-row justify-between items-center border-t border-[#353535]">
          {/* Logo & Social Icons */}
          <div className="flex items-center gap-5 mb-4 lg:mb-0">
            <img src={LogoWhite} className="h-12 cursor-pointer" alt="Logo" />
            <div className="text-white text-[23px] flex gap-3">
              <RiInstagramFill className="cursor-pointer" />
              <FaFacebook className="cursor-pointer" />
              <FaXTwitter className="cursor-pointer" />
              <FaYoutube className="cursor-pointer" />
            </div>
          </div>

          {/* Copyright Text */}
          <div className="text-[#8b8b8b] text-[13px] text-center lg:text-left">
            <p>
              © 2024 Valenciago LLC All rights reserved • Terms of Use Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
