import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import { BsCartPlus } from "react-icons/bs";
import useCart from "../hooks/useCart";
import toast from "react-hot-toast"; 

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const navigate = useNavigate();
  const { handleAddToCart } = useCart();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        console.log("Fetching search results for query:", query);
        const response = await axiosInstance.get(`/products/search?q=${encodeURIComponent(query)}`);
        console.log("Search response:", response.data);
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (err) {
        console.error("Search error:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        setError("Failed to load search results. Please try again.");
        toast.error(err.response?.data?.message || "Failed to load search results.");
        setLoading(false);
      }
    };
    if (query) {
      fetchSearchResults();
    } else {
      setError("Please enter a search query.");
      setLoading(false);
    }
  }, [query]);

  const handleProductClick = (productId) => {
    console.log("Navigating to product:", productId); 
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (error || !query) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">{error || "Please enter a search query."}</h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-black text-white px-6 py-2 rounded-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Search Results for "{query}"
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="bg-white cursor-pointer border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 w-full max-w-[250px] mx-auto"
              >
                <div className="relative h-[180px] sm:h-[200px] bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                  />
                  {product.price.discountPercentage && (
                    <span className="absolute top-2 left-2 bg-red-400 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.price.discountPercentage}% Off
                    </span>
                  )}
                </div>
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
                      ${product.price.discounted}
                    </span>
                    {product.price.original && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        ${product.price.original}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product._id, product.price.discounted);
                    }}
                    className="mt-3 w-full flex items-center justify-center gap-2 bg-black text-white font-medium py-2 rounded-md transition-colors duration-200 cursor-pointer"
                    aria-label={`Add ${product.title} to cart`}
                  >
                    <BsCartPlus size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;