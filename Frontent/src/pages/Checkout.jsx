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
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//   });

//   useEffect(() => {
//     if (user?._id) {
//       dispatch(fetchCart(user._id));
//       const primaryAddr = user.address?.find((addr) => addr.isSelected) || null;
//       setSelectedAddress(primaryAddr);
//     }
//   }, [dispatch, user]);

//   const handleAddAddress = async (e) => {
//     try {
//       e.preventDefault();
//       if (user.address.length === 4) {
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
//       setNewAddress({ street: "", city: "", state: "", zip: "", country: "" });
//       toast.success("Address added successfully");
//     } catch (error) {
//       console.log(error);
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
//     } catch (error) {
//       console.log(error);
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
//                 Address has been successfully removed
//               </div>
//             </div>
//           </div>
//         ),
//         {
//           duration: 3000,
//           position: "top-center",
//         }
//       );
//       dispatch(checkAuthStatus());
//       if (selectedAddress?._id === addressId) {
//         setSelectedAddress(null);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSetPrimary = async (address) => {
//     try {
//       await axiosInstance.put(`/api/user/address/${address._id}`, {
//         isSelected: true,
//       });
//       dispatch(checkAuthStatus());
//       setSelectedAddress(address);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSelectRadio = (address) => {
//     setSelectedAddress(address);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress({ ...newAddress, [name]: value });
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//       <h2 className="text-2xl font-bold mb-6">Checkout</h2>

//       {/* CART PRODUCTS */}
//       <div className="bg-white p-4 rounded-xl shadow mb-6">
//         <h3 className="text-xl font-semibold mb-4">Your Items</h3>
//         {cart.items.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           cart.items.map((item) => (
//             <div
//               key={item.productId._id}
//               className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-4 gap-3"
//             >
//               <div className="flex gap-4 items-center">
//                 <img
//                   src={item.productId.image}
//                   alt={item.productId.title}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <p className="font-semibold">{item.productId.title}</p>
//                   <p>Qty: {item.quantity}</p>
//                 </div>
//               </div>
//               <p className="font-bold text-lg sm:text-right">
//                 ₹{(item.price * item.quantity).toFixed(2)}
//               </p>{" "}
//             </div>
//           ))
//         )}
//         <div className="text-right mt-4 text-xl font-bold">
//           Total: ₹{cart.totalPrice}
//         </div>
//       </div>

//       {/* ADDRESS */}
//       <div className="bg-white p-4 rounded-xl shadow mb-6">
//         <h3 className="text-xl font-semibold mb-4">Select Address</h3>
//         {user?.address && user.address.length > 0 ? (
//           user.address.map((addr) => (
//             <div
//               key={addr._id}
//               className="border p-3 rounded mb-3 flex flex-col lg:flex-row justify-between gap-4"
//             >
//               {editingAddressId === addr._id ? (
//                 <div className="flex flex-col w-full gap-2">
//                   {["street", "city", "state", "zip", "country"].map(
//                     (field) => (
//                       <input
//                         key={field}
//                         type="text"
//                         name={field}
//                         value={editAddressData[field] || ""}
//                         onChange={handleEditChange}
//                         placeholder={
//                           field.charAt(0).toUpperCase() + field.slice(1)
//                         }
//                         className="border p-2 rounded"
//                       />
//                     )
//                   )}
//                   <div className="flex gap-2 flex-wrap">
//                     <button
//                       onClick={() => handleSaveEdit(addr._id)}
//                       className="bg-blue-600 text-white px-3 py-1 rounded"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditingAddressId(null)}
//                       className="bg-gray-400 text-white px-3 py-1 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <label className="flex items-start sm:items-center gap-2 flex-grow cursor-pointer">
//                     <input
//                       type="radio"
//                       name="address"
//                       checked={selectedAddress?._id === addr._id}
//                       onChange={() => handleSelectRadio(addr)}
//                     />
//                     <span>
//                       {addr.street}, {addr.city}, {addr.state} - {addr.zip},{" "}
//                       {addr.country}{" "}
//                       {addr.isSelected && (
//                         <strong className="text-green-600 ml-2">
//                           (Primary)
//                         </strong>
//                       )}
//                     </span>
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {!addr.isSelected && (
//                       <button
//                         onClick={() => handleSetPrimary(addr)}
//                         className="bg-green-500 text-white px-3 py-1 rounded"
//                       >
//                         Set Primary
//                       </button>
//                     )}
//                     <button
//                       onClick={() => {
//                         setEditingAddressId(addr._id);
//                         setEditAddressData(addr);
//                       }}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteAddress(addr._id)}
//                       className="bg-red-600 text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No saved addresses. Please add one below.</p>
//         )}

//         {/* NEW ADDRESS */}
//         <form onSubmit={handleAddAddress} className="mt-6">
//           <h4 className="font-semibold mb-2">Add New Address</h4>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {["street", "city", "state", "zip", "country"].map((field) => (
//               <input
//                 key={field}
//                 type="text"
//                 placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                 value={newAddress[field]}
//                 name={field}
//                 onChange={handleChange}
//                 className="border rounded p-2"
//               />
//             ))}
//           </div>
//           <button
//             type="submit"
//             className="mt-4 bg-black text-white px-4 py-2 rounded"
//           >
//             Add Address
//           </button>
//         </form>
//       </div>

//       {/* PLACE ORDER */}
//       <div className="text-right">
//         <button
//           onClick={() =>
//             alert(
//               selectedAddress
//                 ? "Proceeding to payment (Stripe integration later)"
//                 : "Please select an address"
//             )
//           }
//           className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-green-700 transition"
//         >
//           Proceed to Payment
//         </button>
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
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
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
      setNewAddress({ street: "", city: "", state: "", zip: "", country: "" });
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
        Checkout
      </h2>

      {/* CART PRODUCTS */}
      <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Your Cart</h3>
        {cart.items.length === 0 ? (
          <p className="text-gray-600 text-center py-4">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-6 gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-base sm:text-lg">
                      {item.productId.title}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-lg text-gray-900 sm:text-right w-full sm:w-auto">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="text-right pt-4">
              <p className="text-2xl font-bold text-gray-900">
                Total: ₹{cart.totalPrice?.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ADDRESS SECTION */}
      <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Delivery Address
          </h3>
          <button
            onClick={() => setShowAddAddress(!showAddAddress)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base"
          >
            {showAddAddress ? "Cancel" : "Add New Address"}
          </button>
        </div>

        {showAddAddress && (
          <form
            onSubmit={handleAddAddress}
            className="mb-8 p-4 bg-gray-50 rounded-xl"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              New Address
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["street", "city", "state", "zip", "country"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={newAddress[field]}
                    onChange={handleChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Save Address
            </button>
          </form>
        )}

        {user?.address && user.address.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.address.map((addr) => (
              <div
                key={addr._id}
                className={`relative border-2 p-4 rounded-xl bg-white hover:shadow-md transition-shadow cursor-pointer ${
                  selectedAddress?._id === addr._id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => handleSelectAddress(addr)}
              >
                {editingAddressId === addr._id ? (
                  <div className="flex flex-col gap-3">
                    {["street", "city", "state", "zip", "country"].map(
                      (field) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          <input
                            type="text"
                            name={field}
                            value={editAddressData[field] || ""}
                            onChange={handleEditChange}
                            placeholder={
                              field.charAt(0).toUpperCase() + field.slice(1)
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                            required
                          />
                        </div>
                      )
                    )}
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveEdit(addr._id);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingAddressId(null);
                        }}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm sm:text-base text-gray-900">
                        {addr.street}, {addr.city}, {addr.state} - {addr.zip},{" "}
                        {addr.country}
                      </p>
                      {addr.isSelected && (
                        <span className="text-green-600 text-sm font-semibold">
                          Primary Address
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      {!addr.isSelected && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetPrimary(addr);
                          }}
                          className="text-green-600 hover:text-green-700 text-sm font-medium"
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
                        className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAddress(addr._id);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                    {selectedAddress?._id === addr._id && (
                      <div className="absolute top-2 right-2 text-blue-600">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
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
          <p className="text-gray-600 text-center py-4">
            No saved addresses. Please add one above.
          </p>
        )}
      </section>

      {/* PLACE ORDER */}
      <div className="flex justify-end">
        <button
          onClick={() =>
            alert(
              selectedAddress
                ? "Proceeding to payment (Stripe integration later)"
                : "Please select an address"
            )
          }
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!selectedAddress}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
