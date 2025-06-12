// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCart } from "../features/cartSlice";
// import axiosInstance from "../config/axiosConfig";
// import { checkAuthStatus } from "../features/authSlice";
// import toast from "react-hot-toast";
// import MyLottieAnimationForDelete from "../components/lottie/deleteAnimation";
// import MyLottieAnimationForAlert from "../components/lottie/alertAnimation";

// const CheckoutPage = () => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const user = useSelector((state) => state.auth.user);

//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [editingAddressId, setEditingAddressId] = useState(null);
//   const [editAddressData, setEditAddressData] = useState({});
//   const [newAddress, setNewAddress] = useState({
//     name: "",
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     phone: "",
//   });
//   const [showAddAddress, setShowAddAddress] = useState(false);

//   useEffect(() => {
//     if (user?._id) {
//       dispatch(fetchCart(user._id));
//       const primaryAddr = user.address?.find((addr) => addr.isSelected) || null;
//       setSelectedAddress(primaryAddr);
//     }
//   }, [dispatch, user]);

//   const handleAddAddress = async (e) => {
//     e.preventDefault();
//     try {
//       if (user.address.length >= 4) {
//         toast.custom(
//           (t) => (
//             <div
//               className={`${
//                 t.visible ? "animate-enter" : "animate-leave"
//               } flex items-center gap-3 w-fit max-w-sm bg-white text-black shadow-lg rounded-2xl px-4 py-3 mx-auto border border-white`}
//             >
//               <div className="flex items-center justify-center w-10 h-10">
//                 <MyLottieAnimationForAlert />
//               </div>
//               <div className="flex flex-col justify-center">
//                 <div className="text-sm font-semibold tracking-wide">
//                   Address Limit Reached
//                 </div>
//                 <div className="text-xs text-gray-400 mt-1 max-w-[200px]">
//                   Delete one to add another
//                 </div>
//               </div>
//             </div>
//           ),
//           {
//             duration: 3000,
//             position: "top-center",
//           }
//         );
//         return;
//       }
//       await axiosInstance.put("/api/user/address", newAddress);
//       dispatch(checkAuthStatus());
//       setNewAddress({
//         name: "",
//         street: "",
//         city: "",
//         state: "",
//         zip: "",
//         country: "",
//         phone: "",
//       });
//       setShowAddAddress(false);
//       toast.success("Address added successfully");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add address");
//     }
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditAddressData({ ...editAddressData, [name]: value });
//   };

//   const handleSaveEdit = async (addressId) => {
//     try {
//       await axiosInstance.put(
//         `/api/user/address/${addressId}`,
//         editAddressData
//       );
//       dispatch(checkAuthStatus());
//       setEditingAddressId(null);
//       setEditAddressData({});
//       toast.success("Address updated successfully");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update address");
//     }
//   };

//   const handleDeleteAddress = async (addressId) => {
//     if (!window.confirm("Are you sure you want to delete this address?"))
//       return;
//     try {
//       await axiosInstance.delete(`/api/user/address/${addressId}`);
//       toast.custom(
//         (t) => (
//           <div
//             className={`${
//               t.visible ? "animate-enter" : "animate-leave"
//             } flex items-center gap-3 w-fit max-w-sm bg-white text-black shadow-lg rounded-2xl px-4 py-3 mx-auto border border-white`}
//           >
//             <div className="flex items-center justify-center w-10 h-10">
//               <MyLottieAnimationForDelete />
//             </div>
//             <div className="flex flex-col justify-center">
//               <div className="text-sm font-semibold tracking-wide">
//                 Address Deleted
//               </div>
//               <div className="text-xs text-gray-400 mt-1 max-w-[200px]">
//                 Address has been successfully removed.
//               </div>
//             </div>
//           </div>
//         ),
//         { duration: 3000, position: "top-center" }
//       );
//       dispatch(checkAuthStatus());
//       if (selectedAddress?._id === addressId) {
//         setSelectedAddress(null);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete address");
//     }
//   };

//   const handleSetPrimary = async (address) => {
//     try {
//       await axiosInstance.put(`/api/user/address/${address._id}`, {
//         isSelected: true,
//       });
//       dispatch(checkAuthStatus());
//       setSelectedAddress(address);
//       toast.success("Primary address updated");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to set primary address");
//     }
//   };

//   const handleSelectAddress = (address) => {
//     setSelectedAddress(address);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress({ ...newAddress, [name]: value });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Hero Section */}
//       <div className="relative bg-[#141414] overflow-hidden">
//         <div className="relative z-10 flex items-center justify-center py-16 px-6">
//           <div className="text-center">
//             <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 tracking-tight">
//               Checkout
//             </h1>
//             <p className="text-gray-300 text-lg font-medium">
//               Complete your order
//             </p>
//           </div>
//         </div>
//         {/* Decorative elements */}
//         <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
//         <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/3 rounded-full blur-2xl"></div>
//       </div>

//       {/* Main Content */}
//       <div className="py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto space-y-8">
//           {/* CART PRODUCTS SECTION */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//             <div className="p-6 sm:p-8 bg-gray-50 border-b border-gray-200">
//               <h2 className="text-2xl font-bold text-black mb-2">
//                 Order Summary
//               </h2>
//               <p className="text-gray-600">
//                 {cart.items.length} item{cart.items.length !== 1 ? "s" : ""} in
//                 your order
//               </p>
//             </div>

//             {cart.items.length === 0 ? (
//               <div className="p-8 text-center">
//                 <p className="text-gray-600 text-lg">Your cart is empty.</p>
//               </div>
//             ) : (
//               <div className="divide-y divide-gray-200">
//                 {cart.items.map((item) => (
//                   <div
//                     key={item.productId._id}
//                     className="p-6 sm:p-8 hover:bg-gray-50 transition-colors duration-200"
//                   >
//                     <div className="flex flex-col sm:flex-row gap-6">
//                       <div className="flex-shrink-0 mx-auto sm:mx-0">
//                         <img
//                           src={item.productId.image}
//                           alt={item.productId.title}
//                           className="w-20 h-20 object-contain rounded-lg"
//                         />
//                       </div>

//                       <div className="flex-1 space-y-3">
//                         <div>
//                           <h3 className="text-lg font-bold text-black leading-tight">
//                             {item.productId.title}
//                           </h3>
//                           <div className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-300 mt-2">
//                             Qty: {item.quantity}
//                           </div>
//                         </div>

//                         <div className="flex items-center justify-between">
//                           <span className="text-sm text-gray-600">
//                             ${item.price} × {item.quantity}
//                           </span>
//                           <span className="text-xl font-bold text-black">
//                             ${(item.price * item.quantity).toFixed(2)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Total Section */}
//                 <div className="p-6 sm:p-8 bg-gray-50">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-xl font-bold text-black">
//                       Total Amount
//                     </h3>
//                     <span className="text-2xl font-bold text-black">
//                       ${cart.totalPrice?.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* ADDRESS SECTION */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//             <div className="p-6 sm:p-8 bg-gray-50 border-b border-gray-200">
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                 <div>
//                   <h2 className="text-2xl font-bold text-black mb-2">
//                     Delivery Address
//                   </h2>
//                   <p className="text-gray-600">Choose your delivery location</p>
//                 </div>
//                 <button
//                   onClick={() => setShowAddAddress(!showAddAddress)}
//                   className="inline-flex cursor-pointer items-center px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-200 text-sm"
//                 >
//                   {showAddAddress ? "Cancel" : "Add New Address"}
//                 </button>
//               </div>
//             </div>

//             <div className="p-6 sm:p-8">
//               {/* Add New Address Form */}
//               {showAddAddress && (
//                 <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
//                   <h3 className="text-lg font-bold text-black mb-4">
//                     Add New Address
//                   </h3>
//                   <form onSubmit={handleAddAddress}>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       {[
//                         "name",
//                         "street",
//                         "city",
//                         "state",
//                         "zip",
//                         "country",
//                         "phone",
//                       ].map((field) => (
//                         <div key={field}>
//                           <label className="block text-sm font-semibold text-black mb-2">
//                             {field.charAt(0).toUpperCase() + field.slice(1)}
//                           </label>
//                           <input
//                             type="text"
//                             name={field}
//                             value={newAddress[field]}
//                             onChange={handleChange}
//                             placeholder={`Enter ${field}`}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm transition-all duration-200"
//                             required
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <button
//                       type="submit"
//                       className="mt-6 cursor-pointer bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-200 font-semibold"
//                     >
//                       Save Address
//                     </button>
//                   </form>
//                 </div>
//               )}

//               {/* Address List */}
//               {user?.address && user.address.length > 0 ? (
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                   {user.address.map((addr) => (
//                     <div
//                       key={addr._id}
//                       className={`relative border-2 p-6 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
//                         selectedAddress?._id === addr._id
//                           ? "border-black bg-gray-50 shadow-md"
//                           : "border-gray-200 bg-white hover:border-gray-300"
//                       }`}
//                       onClick={() => handleSelectAddress(addr)}
//                     >
//                       {editingAddressId === addr._id ? (
//                         <div className="space-y-4">
//                           <h4 className="text-lg font-bold text-black mb-4">
//                             Edit Address
//                           </h4>
//                           {[
//                             "name",
//                             "street",
//                             "city",
//                             "state",
//                             "zip",
//                             "country",
//                             "phone",
//                           ].map((field) => (
//                             <div key={field}>
//                               <label className="block text-sm font-semibold text-black mb-1">
//                                 {field.charAt(0).toUpperCase() + field.slice(1)}
//                               </label>
//                               <input
//                                 type="text"
//                                 name={field}
//                                 value={editAddressData[field] || ""}
//                                 onChange={handleEditChange}
//                                 placeholder={`Enter ${field}`}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm transition-all duration-200"
//                                 required
//                               />
//                             </div>
//                           ))}
//                           <div className="flex gap-3 pt-2">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleSaveEdit(addr._id);
//                               }}
//                               className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm font-semibold"
//                             >
//                               Save Changes
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setEditingAddressId(null);
//                               }}
//                               className="cursor-pointer bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200 text-sm font-semibold"
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <>
//                           <div className="space-y-3">
//                             <div>
//                               <h4 className="font-bold text-black text-lg">
//                                 {addr.name}
//                               </h4>
//                               <p className="text-gray-600 text-sm leading-relaxed">
//                                 {addr.street}, {addr.city}, {addr.state}{" "}
//                                 {addr.zip}
//                               </p>
//                               <p className="text-gray-600 text-sm">
//                                 {addr.country} • {addr.phone}
//                               </p>
//                             </div>

//                             {addr.isSelected && (
//                               <div className="inline-flex items-center px-2 py-1 bg-black text-white text-xs font-semibold rounded-full">
//                                 Primary Address
//                               </div>
//                             )}
//                           </div>

//                           <div className="flex flex-wrap gap-2 mt-4">
//                             {!addr.isSelected && (
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleSetPrimary(addr);
//                                 }}
//                                 className="cursor-pointer text-black bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 border border-gray-300"
//                               >
//                                 Set as Primary
//                               </button>
//                             )}
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setEditingAddressId(addr._id);
//                                 setEditAddressData(addr);
//                               }}
//                               className="cursor-pointer text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleDeleteAddress(addr._id);
//                               }}
//                               className="cursor-pointer text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200"
//                             >
//                               Delete
//                             </button>
//                           </div>

//                           {/* Selection indicator */}
//                           {selectedAddress?._id === addr._id && (
//                             <div className="absolute top-4 right-4 w-6 h-6 bg-black rounded-full flex items-center justify-center">
//                               <svg
//                                 className="w-4 h-4 text-white"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M5 13l4 4L19 7"
//                                 />
//                               </svg>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <div className="text-gray-400 mb-4">
//                     <svg
//                       className="w-16 h-16 mx-auto"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="1"
//                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="1"
//                         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className="text-xl font-bold text-black mb-2">
//                     No saved addresses
//                   </h3>
//                   <p className="text-gray-600">
//                     Add a delivery address to continue with your order
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* PLACE ORDER BUTTON */}
//           <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//               <div>
//                 <h3 className="text-xl font-bold text-black">
//                   Ready to place your order?
//                 </h3>
//                 <p className="text-gray-600 text-sm mt-1">
//                   {selectedAddress
//                     ? "Address selected"
//                     : "Please select a delivery address"}
//                 </p>
//               </div>
//               <button
//                 onClick={() =>
//                   alert(
//                     selectedAddress
//                       ? "Proceeding to payment (Stripe integration later)"
//                       : "Please select an address"
//                   )
//                 }
//                 className={`cursor-pointer px-8 py-4 rounded-xl text-lg font-bold transition-all duration-200 ${
//                   selectedAddress
//                     ? "bg-black text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 shadow-lg"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//                 disabled={!selectedAddress}
//               >
//                 Proceed to Payment
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/cartSlice";
import axiosInstance from "../config/axiosConfig";
import { checkAuthStatus } from "../features/authSlice";
import toast from "react-hot-toast";
import MyLottieAnimationForDelete from "../components/lottie/deleteAnimation";
import MyLottieAnimationForAlert from "../components/lottie/alertAnimation";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [editAddressData, setEditAddressData] = useState({});
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  const [showAddAddress, setShowAddAddress] = useState(false);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart(user._id));
      const primaryAddr = user.address?.find((addr) => addr.isSelected) || null;
      setSelectedAddress(primaryAddr);
    }
  }, [dispatch, user]);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      if (user.address.length >= 4) {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } flex items-center gap-3 w-fit max-w-sm bg-white text-black shadow-lg rounded-2xl px-4 py-3 mx-auto border border-white`}
            >
              <div className="flex items-center justify-center w-10 h-10">
                <MyLottieAnimationForAlert />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-sm font-semibold tracking-wide">
                  Address Limit Reached
                </div>
                <div className="text-xs text-gray-400 mt-1 max-w-[200px]">
                  Delete one to add another
                </div>
              </div>
            </div>
          ),
          {
            duration: 3000,
            position: "top-center",
          }
        );
        return;
      }
      await axiosInstance.put("/api/user/address", newAddress);
      dispatch(checkAuthStatus());
      setNewAddress({
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
      });
      setShowAddAddress(false);
      toast.success("Address added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add address");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditAddressData({ ...editAddressData, [name]: value });
  };

  const handleSaveEdit = async (addressId) => {
    try {
      await axiosInstance.put(
        `/api/user/address/${addressId}`,
        editAddressData
      );
      dispatch(checkAuthStatus());
      setEditingAddressId(null);
      setEditAddressData({});
      toast.success("Address updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update address");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;
    try {
      await axiosInstance.delete(`/api/user/address/${addressId}`);
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } flex items-center gap-3 w-fit max-w-sm bg-white text-black shadow-lg rounded-2xl px-4 py-3 mx-auto border border-white`}
          >
            <div className="flex items-center justify-center w-10 h-10">
              <MyLottieAnimationForDelete />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-sm font-semibold tracking-wide">
                Address Deleted
              </div>
              <div className="text-xs text-gray-400 mt-1 max-w-[200px]">
                Address has been successfully removed.
              </div>
            </div>
          </div>
        ),
        { duration: 3000, position: "top-center" }
      );
      dispatch(checkAuthStatus());
      if (selectedAddress?._id === addressId) {
        setSelectedAddress(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete address");
    }
  };

  const handleSetPrimary = async (address) => {
    try {
      await axiosInstance.put(`/api/user/address/${address._id}`, {
        isSelected: true,
      });
      dispatch(checkAuthStatus());
      setSelectedAddress(address);
      toast.success("Primary address updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to set primary address");
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-[#141414] overflow-hidden">
        <div className="relative z-10 flex items-center justify-center py-16 px-6">
          <div className="text-center">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 tracking-tight">
              Checkout
            </h1>
            <p className="text-gray-300 text-lg font-medium">
              Complete your order
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/3 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* CART PRODUCTS SECTION */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 sm:p-8 bg-gray-50 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-2">
                Order Summary
              </h2>
              <p className="text-gray-600">
                {cart.items.length} item{cart.items.length !== 1 ? "s" : ""} in
                your order
              </p>
            </div>

            {cart.items.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600 text-lg">Your cart is empty.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <div
                    key={item.productId._id}
                    className="p-6 sm:p-8 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <img
                          src={item.productId.image}
                          alt={item.productId.title}
                          className="w-20 h-20 object-contain rounded-lg"
                        />
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-lg font-bold text-black leading-tight">
                            {item.productId.title}
                          </h3>
                          <div className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-300 mt-2">
                            Qty: {item.quantity}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            ${item.price} × {item.quantity}
                          </span>
                          <span className="text-xl font-bold text-black">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Total Section */}
                <div className="p-6 sm:p-8 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-black">
                      Total Amount
                    </h3>
                    <span className="text-2xl font-bold text-black">
                      ${cart.totalPrice?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ADDRESS SECTION */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 sm:p-8 bg-gray-50 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-black mb-2">
                    Delivery Address
                  </h2>
                  <p className="text-gray-600">Choose your delivery location</p>
                </div>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="inline-flex cursor-pointer items-center px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-200 text-sm"
                >
                  {showAddAddress ? "Cancel" : "Add New Address"}
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Add New Address Form */}
              {showAddAddress && (
                <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold text-black mb-4">
                    Add New Address
                  </h3>
                  <form onSubmit={handleAddAddress}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "name",
                        "street",
                        "city",
                        "state",
                        "zip",
                        "country",
                        "phone",
                      ].map((field) => (
                        <div key={field}>
                          <label className="block text-sm font-semibold text-black mb-2">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          <input
                            type="text"
                            name={field}
                            value={newAddress[field]}
                            onChange={handleChange}
                            placeholder={`Enter ${field}`}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm transition-all duration-200"
                            required
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      type="submit"
                      className="mt-6 cursor-pointer bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-200 font-semibold"
                    >
                      Save Address
                    </button>
                  </form>
                </div>
              )}

              {/* Address List */}
              {user?.address && user.address.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {user.address.map((addr) => (
                    <div
                      key={addr._id}
                      className={`relative border-2 p-6 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedAddress?._id === addr._id
                          ? "border-black bg-gray-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                      onClick={() => handleSelectAddress(addr)}
                    >
                      {editingAddressId === addr._id ? (
                        <div className="space-y-4">
                          <h4 className="text-lg font-bold text-black mb-4">
                            Edit Address
                          </h4>
                          {[
                            "name",
                            "street",
                            "city",
                            "state",
                            "zip",
                            "country",
                            "phone",
                          ].map((field) => (
                            <div key={field}>
                              <label className="block text-sm font-semibold text-black mb-1">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                              </label>
                              <input
                                type="text"
                                name={field}
                                value={editAddressData[field] || ""}
                                onChange={handleEditChange}
                                placeholder={`Enter ${field}`}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm transition-all duration-200"
                                required
                              />
                            </div>
                          ))}
                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSaveEdit(addr._id);
                              }}
                              className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm font-semibold"
                            >
                              Save Changes
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingAddressId(null);
                              }}
                              className="cursor-pointer bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200 text-sm font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-bold text-black text-lg">
                                {addr.name}
                              </h4>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {addr.street}, {addr.city}, {addr.state}{" "}
                                {addr.zip}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {addr.country} • {addr.phone}
                              </p>
                            </div>

                            {addr.isSelected && (
                              <div className="inline-flex items-center px-2 py-1 bg-black text-white text-xs font-semibold rounded-full">
                                Primary Address
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {!addr.isSelected && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSetPrimary(addr);
                                }}
                                className="cursor-pointer text-black bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 border border-gray-300"
                              >
                                Set as Primary
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingAddressId(addr._id);
                                setEditAddressData(addr);
                              }}
                              className="cursor-pointer text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAddress(addr._id);
                              }}
                              className="cursor-pointer text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200"
                            >
                              Delete
                            </button>
                          </div>

                          {/* Selection indicator */}
                          {selectedAddress?._id === addr._id && (
                            <div className="absolute top-4 right-4 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    No saved addresses
                  </h3>
                  <p className="text-gray-600">
                    Add a delivery address to continue with your order
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* PRICE DETAILS SECTION */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 sm:p-8 bg-gray-50 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-black">Price Details</h2>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              {/* Price breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    Price ({cart.items.length} item
                    {cart.items.length !== 1 ? "s" : ""})
                  </span>
                  <span className="font-semibold text-black">
                    ₹{(cart.totalPrice * 2.2).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-green-600">
                  <span>Discount</span>
                  <span className="font-semibold">
                    − ₹{(cart.totalPrice * 1.1).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Delivery Charges</span>
                  <div className="text-right">
                    <span className="line-through text-gray-500 text-sm mr-2">
                      ₹120
                    </span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Total Amount */}
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold text-black">Total Amount</span>
                <span className="font-bold text-black text-xl">
                  ₹{cart.totalPrice?.toFixed(2)}
                </span>
              </div>

              {/* Savings highlight */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                  <span className="font-bold text-green-800">
                    You will save ₹{(cart.totalPrice * 1.1).toFixed(2)} on this
                    order
                  </span>
                </div>
              </div>

              {/* Coupon section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span className="font-semibold text-blue-800">
                      Apply Coupon
                    </span>
                  </div>
                  <button className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    View Coupons
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PLACE ORDER BUTTON */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-black">
                  Ready to place your order?
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {selectedAddress
                    ? "Address selected"
                    : "Please select a delivery address"}
                </p>
              </div>
              <button
                onClick={() =>
                  alert(
                    selectedAddress
                      ? "Proceeding to payment (Stripe integration later)"
                      : "Please select an address"
                  )
                }
                className={`cursor-pointer px-8 py-4 rounded-xl text-lg font-bold transition-all duration-200 ${
                  selectedAddress
                    ? "bg-black text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!selectedAddress}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
