import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import Category from "../components/Category";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [menPoster, setMenPoster] = useState(null);
  const [womenPoster, setWomenPoster] = useState(null);
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setProducts(response.data.products);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const res = await axiosInstance.get("/posters");
        const poster = res.data.data;
        console.log(poster);

        const menPoster = poster.find((p) => p.title === "Men");
        const womenPoster = poster.find((p) => p.title === "Women");

        setMenPoster(menPoster);
        setWomenPoster(womenPoster);
      } catch (error) {
        console.error("Error fetching posters: ", error);
      }
    };
    fetchPosters();
  }, []);

  return (
    <div className="min-h-screen pt-10 ">
      <div className="">
        <div className=" lg:px-30 xl:px-78 text-2xl sm:text-3xl lg:text-3xl px-8 font-medium flex justify-between items-center" >
          {/* className="px-78 text-3xl font-medium flex items-center justify-between  " */}
          <h1>Men</h1>
          <button
            onClick={() => navigate("/Men")}
            className="  flex items-center text-[10px] sm:text-[13px] lg:text-[15px] px-3 py-2 bg-black text-white font-medium rounded-md transition-all duration-200 cursor-pointer  hover:scale-105 active:scale-95 group  "
          >
            See more
            <MdOutlineKeyboardArrowRight className="ml-1 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
        <div className="flex items-center justify-center h-[180px] sm:h-full  mb-10 mt-8 lg:px-30 xl:px-78   ">
          <img src={menPoster?.image} className=" h-full w-full object-cover object-left " alt="" />
        </div>
        <Category products={products} category={"Men"} />
      </div>

      <div className="py-13 ">
        <div className=" lg:px-30 xl:px-78 text-2xl px-8 font-medium flex justify-between items-center" >
          {/* className="px-78 text-3xl font-medium flex items-center justify-between  " */}
          <h1>Women</h1>
          <button
            onClick={() => navigate("/Women")}
            className="flex items-center text-[10px] sm:text-[13px] lg:text-[15px] px-3 py-2 bg-black text-white font-medium rounded-md transition-all duration-200 cursor-pointer  hover:scale-105 active:scale-95 group"
          >
            See more
            <MdOutlineKeyboardArrowRight className="ml-1 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
        <div className="flex items-center justify-center h-[180px] sm:h-full  mb-10 mt-8 lg:px-30 xl:px-78  ">
          <img src={womenPoster?.image} className="h-full w-full object-cover object-center  " alt="" />
        </div>
        <Category products={products} category={"Women"} />
      </div>

      {/* <Category products={products} category={"Women"}/> */}
    </div>
  );
};

export default AllProducts;
