import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import for URL params and navigation
import axiosInstance from "../config/axiosConfig"; // Axios instance for API calls
import { BsCartPlus } from "react-icons/bs"; // Cart icon
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { addToCart } from "../features/cartSlice"; // Cart action
import useCart from "../hooks/useCart"; // Custom cart hook

const ProductDetails = () => {
  // State to store product data
  const [product, setProduct] = useState(null);
  // State for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Get productId from URL
  const { productId } = useParams();
  // Redux dispatch and user state
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // Custom cart hook
  const { handleAddToCart } = useCart();
  // Navigation hook
  const navigate = useNavigate();

  // Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log("Fetching product with ID:", productId);
        const response = await axiosInstance.get(`/products/${productId}`);
        console.log("Product response:", response.data);
        setProduct(response.data.product);
        setLoading(false);
      } catch (err) {
        console.error("Product fetch error:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        setError("Failed to load product details.");
        setLoading(false);
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [productId]);

  // Loading state UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  // Error state UI
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            {error || "Product not found."}
          </h2>
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

  // Main product details UI
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-black mb-4 flex items-center"
        >
          ← Back
        </button>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product image */}
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[300px] sm:h-[400px] object-contain rounded-lg"
            />
          </div>
          {/* Product details */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-gray-600">{product.rating}</span>
              <span className="text-gray-500">| {product.category}</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.discounted}
              </span>
              {product.price.original && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.price.original}
                </span>
              )}
              {product.price.discountPercentage && (
                <span className="bg-red-400 text-white text-sm font-bold px-2 py-1 rounded">
                  {product.price.discountPercentage}% Off
                </span>
              )}
            </div>
            <p className="text-gray-600">
              Color: <span className="capitalize">{product.color}</span>
            </p>
            {/* Add to cart button */}
            <button
              onClick={() =>
                handleAddToCart(product._id, product.price.discounted)
              }
              className="w-full flex items-center justify-center gap-2 bg-black text-white font-medium py-3 rounded-md transition-colors duration-200 hover:bg-gray-800"
              aria-label={`Add ${product.title} to cart`}
            >
              <BsCartPlus size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
