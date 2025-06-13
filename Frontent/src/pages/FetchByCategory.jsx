import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { BsCartPlus } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import useCart from "../hooks/useCart";

const FetchByCategory = () => {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(`/${category}`);
        setCategoryProducts(response.data.products);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch men products:", error);
      }
    };
    fetchProducts();
  }, [category]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <>
      <div>
        <div className="mt-8 mb-10 sm:mt-12 md:mt-16 lg:mt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 w-full max-w-7xl mx-auto">
            {categoryProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="bg-white cursor-pointer border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 w-full max-w-[250px] mx-auto"
                data-aos="fade-up"
                data-aos-delay={product.aosDelay}
              >
                {/* Image Section */}
                <div className="relative h-[180px] sm:h-[200px] bg-gray-100 ">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                  />
                  {product.price.discountPercentage && (
                    <span className="absolute top-2 left-2 bg-red-400 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.price.discountPercentage} Off
                    </span>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 h-10 sm:h-12">
                    {product.title}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">
                      {product.rating}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({product.category})
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                      {product.price.discounted}
                    </span>
                    {product.price.original && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        {product.price.original}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product._id, product.price.discounted);
                    }}
                    className="mt-3 w-full flex items-center justify-center gap-2 bg-black text- text-white font-medium py-2 rounded-md transition-colors duration-200 cursor-pointer "
                    aria-label={`Add ${product.title} to cart`}
                  >
                    <BsCartPlus size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FetchByCategory;
