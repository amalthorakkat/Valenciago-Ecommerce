import React, { useEffect, useState } from "react";
import ProductsHero from "./ProductsHero";
import BannerHero from "./BannerHero";
import PostersHero from "./PostersHero";
import axiosInstance from "../config/axiosConfig";

const Hero = () => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axiosInstance.get("/posters");
        const poster = response.data.data;
        console.log(response)
        if (poster && poster.length >= 4) {
          
          const post = poster.find((p)=>p.title==="Exclusive Deals Just for You")
          setImage(post);
        }
      } catch (error) {
        console.error("Error fetching image: ", error);
      }
    };
    fetchImage();
  }, []);

  return (
    <div className="flex flex-col justify-center mt-5 sm:mx-10 ">
      <div className=" flex items-center justify-center ">
        <PostersHero />
      </div>

      {/* banner  */}
      <div>{/* <BannerHero /> */}</div>

      {/* products view */}
      <div className=" flex items-center justify-center ">
        <ProductsHero />
      </div>

      {/* poster  */}
      {image && (
        <div className="relative w-full h-[300px] md:h-[500px] lg:h-[400px] overflow-hidden my-20 rounded-[15px] ">
          <div className=" absolute h-full w-full bg-black opacity-15 "></div>
          <img
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105 "
            src={image.image}
            alt="Shop Now"
          />
          <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold">
              {image.title}
            </h1>
            <p className="text-white text-lg md:text-xl mt-2">
              {image.description}
            </p>
            <button className="mt-4 px-6 py-3 bg-white text-black text-lg font-semibold rounded-[30px] shadow-lg  cursorpx-4  cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95 ">
              Shop Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
