// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Import for URL params and navigation
// import axiosInstance from "../config/axiosConfig"; // Axios instance for API calls
// import { BsCartPlus } from "react-icons/bs"; // Cart icon
// import { useDispatch, useSelector } from "react-redux"; // Redux hooks
// import { addToCart } from "../features/cartSlice"; // Cart action
// import useCart from "../hooks/useCart"; // Custom cart hook

// const ProductDetails = () => {
//   // State to store product data
//   const [product, setProduct] = useState(null);
//   // State for loading and error
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // Get productId from URL
//   const { productId } = useParams();
//   // Redux dispatch and user state
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);
//   // Custom cart hook
//   const { handleAddToCart } = useCart();
//   // Navigation hook
//   const navigate = useNavigate();

//   // Fetch product details on mount
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         console.log("Fetching product with ID:", productId);
//         const response = await axiosInstance.get(`/products/${productId}`);
//         console.log("Product response:", response.data);
//         setProduct(response.data.product);
//         setLoading(false);
//       } catch (err) {
//         console.error("Product fetch error:", {
//           message: err.message,
//           status: err.response?.status,
//           data: err.response?.data,
//         });
//         setError("Failed to load product details.");
//         setLoading(false);
//         console.error("Error fetching product:", err);
//       }
//     };
//     fetchProduct();
//   }, [productId]);

//   // Loading state UI
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
//       </div>
//     );
//   }

//   // Error state UI
//   if (error || !product) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-red-600">
//             {error || "Product not found."}
//           </h2>
//           <button
//             onClick={() => navigate("/")}
//             className="mt-4 bg-black text-white px-6 py-2 rounded-md"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Main product details UI
//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
//         {/* Back button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="text-gray-600 hover:text-black mb-4 flex items-center"
//         >
//           ← Back
//         </button>
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Product image */}
//           <div className="flex-shrink-0 w-full lg:w-1/2">
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-full h-[300px] sm:h-[400px] object-contain rounded-lg"
//             />
//           </div>
//           {/* Product details */}
//           <div className="flex-1 space-y-4">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//               {product.title}
//             </h1>
//             <div className="flex items-center gap-2">
//               <span className="text-yellow-400 text-lg">★</span>
//               <span className="text-gray-600">{product.rating}</span>
//               <span className="text-gray-500">| {product.category}</span>
//             </div>
//             <div className="flex items-baseline gap-3">
//               <span className="text-3xl font-bold text-gray-900">
//                 ${product.price.discounted}
//               </span>
//               {product.price.original && (
//                 <span className="text-lg text-gray-500 line-through">
//                   ${product.price.original}
//                 </span>
//               )}
//               {product.price.discountPercentage && (
//                 <span className="bg-red-400 text-white text-sm font-bold px-2 py-1 rounded">
//                   {product.price.discountPercentage}% Off
//                 </span>
//               )}
//             </div>
//             <p className="text-gray-600">
//               Color: <span className="capitalize">{product.color}</span>
//             </p>
//             {/* Add to cart button */}
//             <button
//               onClick={() =>
//                 handleAddToCart(product._id, product.price.discounted)
//               }
//               className="w-full flex items-center justify-center gap-2 bg-black text-white font-medium py-3 rounded-md transition-colors duration-200 hover:bg-gray-800"
//               aria-label={`Add ${product.title} to cart`}
//             >
//               <BsCartPlus size={18} />
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import { BsCartPlus, BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import useCart from "../hooks/useCart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();

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
        toast.error(
          err.response?.data?.message || "Failed to load product details."
        );
        // CHANGED: Redirect on 404 after 2 seconds
        if (err.response?.status === 404) {
          setTimeout(() => navigate("/"), 2000);
        }
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, navigate]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<BsStarFill key={i} className="text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<BsStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<BsStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  const handleAddToCartClick = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast.error("Please select a size.");
      return;
    }
    if (quantity > product.stock) {
      toast.error("Quantity exceeds available stock.");
      return;
    }
    handleAddToCart(
      product._id,
      product.price.discounted,
      quantity,
      selectedSize
    );
    
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 w-full max-w-6xl px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
          <p className="text-gray-700 font-medium">
            Loading product details...
          </p>
          {/* NEW: Skeleton loader */}
          <div className="w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="flex flex-col xl:flex-row gap-12">
              <div className="flex-shrink-0 w-full xl:w-1/2 h-96 bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3"></div>
                <div className="h-20 bg-gray-200 animate-pulse rounded"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="h-10 bg-gray-200 animate-pulse rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            {error || "Product not found."}
          </h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 inline-flex cursor-pointer items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section - matching Cart component style */}
      <div className="relative bg-[#141414] overflow-hidden">
        <div className="relative z-10 flex items-center justify-center py-16 px-6">
          <div className="text-center">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 tracking-tight">
              Product Details
            </h1>
            <p className="text-gray-300 text-lg font-medium">
              {product ? "Everything you need to know" : "Product information"}
            </p>
          </div>
        </div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/3 rounded-full blur-2xl"></div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto px-4 sm:px-8 lg:px-12">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex cursor-pointer items-center px-4 py-2 text-black font-semibold rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 transition-all duration-200 text-sm border border-gray-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          {/* Main Product Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="flex flex-col xl:flex-row gap-12 items-center ">
                {/* Product Image */}
                <div className="flex-shrink-0 mx-auto xl:mx-0 xl:w-1/2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-96 sm:h-[500px] lg:h-[600px] object-contain rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 xl:w-1/2 space-y-6 text-center xl:text-left">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 leading-tight">
                      {product.title}
                    </h2>
                    <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-300 mb-4">
                      {product.category}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-3 justify-center xl:justify-start">
                    <div className="flex gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-gray-600 font-medium">
                      {product.rating}
                    </span>
                    <span className="text-gray-500">
                      ({product.reviews?.length || 0} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 flex-wrap justify-center xl:justify-start">
                    <span className="text-3xl font-bold text-black">
                      ${product.price.discounted}
                    </span>
                    {product.price.original && (
                      <span className="text-xl line-through text-gray-500">
                        ${product.price.original}
                      </span>
                    )}
                    {product.price.discountPercentage && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold bg-black text-white">
                        {product.price.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-base leading-relaxed">
                    {product.description || "No description available."}{" "}
                    {/* CHANGED: Fallback */}
                  </p>

                  {/* Product Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-center xl:justify-start">
                      <span className="font-semibold text-black mr-2">
                        Brand:
                      </span>
                      <span className="text-gray-600">
                        {product.brand || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-center xl:justify-start">
                      <span className="font-semibold text-black mr-2">
                        Color:
                      </span>
                      <span className="text-gray-600 capitalize">
                        {product.color || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-center xl:justify-start">
                      <span className="font-semibold text-black mr-2">
                        Material:
                      </span>
                      <span className="text-gray-600">
                        {product.material || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-center xl:justify-start">
                      <span className="font-semibold text-black mr-2">
                        Stock:
                      </span>
                      <span
                        className={`font-medium ${
                          product.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} available`
                          : "Out of stock"}
                        {/* NEW: Low stock warning */}
                        {product.stock > 0 && product.stock <= 5 && (
                          <span className="text-orange-500 ml-2">
                            (Only {product.stock} left!)
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Size Selection */}
                  {product.sizes?.length > 0 && (
                    <div className="space-y-3">
                      <label className="block font-semibold text-black text-center xl:text-left">
                        Size:
                      </label>
                      <div className="flex gap-2 flex-wrap justify-center xl:justify-start">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && setSelectedSize(size)
                            } // NEW: Keyboard accessibility
                            tabIndex={0} // NEW: Keyboard focusable
                            className={`px-4 py-2 border rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black ${
                              selectedSize === size
                                ? "bg-black text-white border-black shadow-md"
                                : "bg-white text-black border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div className="space-y-3">
                    <label className="block font-semibold text-black text-center xl:text-left">
                      Quantity:
                    </label>
                    <div className="flex items-center justify-center xl:justify-start">
                      <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-300">
                        <button
                          onClick={() =>
                            setQuantity((prev) => Math.max(1, prev - 1))
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all duration-200 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-black" // NEW: Accessibility
                          disabled={quantity <= 1}
                        >
                          −
                        </button>
                        <span className="mx-4 font-bold text-black min-w-[2rem] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            setQuantity((prev) =>
                              Math.min(product.stock, prev + 1)
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all duration-200 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-black" // NEW: Accessibility
                          disabled={quantity >= product.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-center xl:text-left">
                      <span className="font-semibold text-black">
                        Shipping:{" "}
                      </span>
                      <span className="text-gray-600">
                        {product.shippingInfo?.freeShipping
                          ? "Free Shipping"
                          : "Shipping fees apply" || "N/A"}{" "}
                        {/* CHANGED: Fallback */}
                      </span>
                      {product.shippingInfo?.estimatedDelivery && (
                        <div className="text-sm text-gray-500 mt-1">
                          Estimated Delivery:{" "}
                          {product.shippingInfo.estimatedDelivery}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCartClick}
                    disabled={product.stock === 0}
                    className={`w-full flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg shadow-lg cursor-pointer ${
                      product.stock === 0
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-300"
                    }`}
                    aria-label={`Add ${product.title} to cart`}
                  >
                    <BsCartPlus size={20} />
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {product.reviews?.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-black mb-6">
                  Customer Reviews
                </h2>
                <div className="divide-y divide-gray-200">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="py-6 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex gap-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="font-semibold text-black">
                          {review.rating}
                        </span>
                        <span className="text-gray-500 text-sm">
                          by {review.user || "Anonymous"} on{" "}
                          {new Date(review.date).toLocaleDateString()}{" "}
                          {/* CHANGED: Fallback */}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {review.comment || "No comment provided."}{" "}
                        {/* CHANGED: Fallback */}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
