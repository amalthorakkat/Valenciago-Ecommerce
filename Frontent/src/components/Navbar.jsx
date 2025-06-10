// // import React from "react";
// // import LogoBlack from "../assets/valenciago-black.png"
// // import SearchLogo from "../assets/search1.png"
// // import CartIcon from "../assets/shopping-bag.png"

// // const Navbar = () => {
// //   return (
// //     <>
// //       <div className="flex p-10 items-center gap-3 justify-between px-10 " >
// //         <div>
// //         <img src={LogoBlack} className="h-15" alt="" />
// //         </div>
// //         <div className="flex gap-10 items-center justify-center" >

// //         <div>
// //             <div className="bg-white  border   flex items-center  w-[400px] h-12 rounded-[40px] overflow-hidden m-0 " >
// //                 <img className=" ml-2 h-9" src={SearchLogo} alt="" />
// //                 <input  className="h-full w-full outline-none mx-2 text-[17px] text-[#7F7F7F] " type="text" placeholder="Search" />
// //             </div>
// //         </div>
// //         <div>
// //         <button className=" bg-[#c7c7c7] px-4 py-2 rounded-[30px] cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95 " >Women</button>
// //         <button className=" bg-[#c7c7c7] px-4 py-2 rounded-[30px] cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95 " >Men</button>
// //         <button className=" bg-[#c7c7c7] px-4 py-2 rounded-[30px] cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95 " >New Collections</button>
// //         </div>
// //         <div className="flex gap-4" >
// //             <img src={CartIcon} className="h-9 cursor-pointer " alt="" />
// //             <div className="h-9 w-9 rounded-full flex items-center justify-center bg-gray-600 text-white cursor-pointer " >A</div>
// //         </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Navbar;

// import React, { useState } from "react";
// import LogoBlack from "../assets/valenciago-white.png";
// import SearchLogo from "../assets/search1.png";
// import { FaShoppingBag } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../features/authSlice";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user, loading } = useSelector((state) => state.auth);
//   // const [search, setSearch] = useState("");
//   // console.log(user);

//   const toggleMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   if (loading) {
//     return <div>loading...</div>;
//   }

//   const handleLogout = () => {
//     dispatch(logout());
//     toast.success("Logout success");
//   };

//   // const handleSearch = () => {
//   //   if (e.key === "Enter" && search.trim()) {
//   //     navigate(`/search?query=${encodeURIComponent(search)}`);
//   //     setIsMobileMenuOpen(false);
//   //   }
//   // };

//   const handleNavigate =(category)=>{
//     navigate(category)
//     setIsMobileMenuOpen(false)
//   }

//   return (
//     <div className="bg-gray-900 text-white">
//       {/* Desktop and larger screens */}
//       <div className="hidden lg:flex p-6 items-center justify-between px-10">
//         <div>
//           <img
//             onClick={() => navigate("/")}
//             src={LogoBlack}
//             className="h-12 lg:h-10 cursor-pointer"
//             alt="Logo"
//           />
//         </div>
//         <div className="flex gap-10 items-center justify-center">
//           <div className="bg-white border flex items-center xl:w-[400px] lg:w-[300px] h-12 rounded-full overflow-hidden m-0">
//             <img className="ml-2 h-9" src={SearchLogo} alt="Search" />
//             <input
//               className="h-full w-full outline-none mx-2 text-[17px] text-[#7F7F7F]"
//               type="text"
//               placeholder="Search"
//               // value={search}
//               // onChange={(e) => setSearch(e.target.value)}
//               // onKeyDown={handleSearch}
//             />
//           </div>
//           <div className=" flex items-center justify-center  ">
//             <button
//               onClick={() => navigate("/Women")}
//               className=" bg-white  text-[#000000ee]  px-4 py-2 rounded-full cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95"
//             >
//               Women
//             </button>
//             <button
//               onClick={() => navigate("/Men")}
//               className="bg-white  text-[#000e] px-4 py-2 rounded-full cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95"
//             >
//               Men
//             </button>
//             <button
//               onClick={() => navigate("/allProducts")}
//               className="bg-white  text-[#000e] px-4 py-2 rounded-full cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95"
//             >
//               All Collections
//             </button>
//           </div>
//           <div className="flex gap-4">
//             <div className="flex items-center justify-center">
//               <button onClick={() => navigate("/cart")}>
//                 <FaShoppingBag className=" cursor-pointer text-[30px]" />
//               </button>
//             </div>
//             <div>{user && user.username}</div>
//             {user ? (
//               <div className="h-9 w-9 rounded-full flex items-center justify-center bg-gray-600 text-white cursor-pointer">
//                 <button onClick={handleLogout} className="cursor-pointer ">
//                   logout
//                 </button>
//               </div>
//             ) : (
//               <div className="h-9 w-9 rounded-full flex items-center justify-center bg-gray-600 text-white cursor-pointer">
//                 <button
//                   onClick={() => navigate("/signIn")}
//                   className="cursor-pointer "
//                 >
//                   login
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile View */}
//       <div className="lg:hidden p-6 flex items-center justify-between">
//         <div>
//           <img onClick={()=>navigate("/")} src={LogoBlack} className="h-12" alt="Logo" />
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="relative flex items-center justify-center">
//             <button onClick={toggleMenu} className="text-white">
//               <span className="block w-6 h-1 bg-white mb-1"></span>
//               <span className="block w-6 h-1 bg-white mb-1"></span>
//               <span className="block w-6 h-1 bg-white"></span>
//             </button>
//           </div>
//           <div className="flex gap-4">
//             <div className="flex items-center justify-center">
//               <FaShoppingBag onClick={()=>navigate('/cart')} className=" cursor-pointer text-[30px]" />
//             </div>
//             <div className="h-9 w-9 rounded-full flex items-center justify-center bg-gray-600 text-white cursor-pointer">
//               A
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {isMobileMenuOpen && (
//         <div className="lg:hidden bg-gray-800 text-white py-4 px-6">
//           <div className="">
//             <div className="bg-white  border flex items-center w-full h-12 rounded-full overflow-hidden">
//               <img  className="ml-2 h-9" src={SearchLogo} alt="Search" />
//               <input
//                 className="h-full w-full outline-none mx-2 text-[17px] text-[#7F7F7F]"
//                 type="text"
//                 placeholder="Search"
//                 // value={search}
//                 // onChange={(e) => setSearch(e.target.value)}
//                 // onKeyDown={handleSearch}
//               />
//             </div>
//             <div className="flex flex-col items-center gap-4 mt-4  ">
//               <div>
//                 <button onClick={()=>handleNavigate('/Women')} className="bg-white w-[370px] text-black  px-4 py-2 rounded-full cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95  ">
//                   Women
//                 </button>
//               </div>
//               <div>
//                 <button onClick={()=>handleNavigate("/Men")}  className="bg-white w-[370px] text-black px-4 py-2 rounded-full cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95">
//                   Men
//                 </button>
//               </div>
//               <div>
//                 <button onClick={()=>handleNavigate("/allproducts")}  className="bg-white w-[370px] text-black px-4 py-2 rounded-full cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95">
//                   All Collections
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import LogoBlack from "../assets/valenciago-white.png";
import SearchLogo from "../assets/search1.png";
import { FaShoppingBag, FaSignOutAlt } from "react-icons/fa";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  console.log(user);
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout success");
  };

  const handleNavigate = (category) => {
    navigate(category);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Desktop and larger screens */}
      <div className="hidden lg:flex p-6 items-center justify-between px-10">
        <div>
          <img
            onClick={() => navigate("/")}
            src={LogoBlack}
            className="h-12 lg:h-10 cursor-pointer"
            alt="Logo"
          />
        </div>
        <div className="flex gap-10 items-center justify-center">
          <div className="bg-white border flex items-center xl:w-[400px] lg:w-[300px] h-12 rounded-full overflow-hidden m-0">
            <img className="ml-2 h-9" src={SearchLogo} alt="Search" />
            <input
              className="h-full w-full outline-none mx-2 text-[17px] text-[#7F7F7F]"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => navigate("/Women")}
              className="bg-white text-[#000000ee] px-4 py-2 rounded-full cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95"
            >
              Women
            </button>
            <button
              onClick={() => navigate("/Men")}
              className="bg-white text-[#000e] px-4 py-2 rounded-full cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95"
            >
              Men
            </button>
            <button
              onClick={() => navigate("/allProducts")}
              className="bg-white text-[#000e] px-4 py-2 rounded-full cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95"
            >
              All Collections
            </button>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center justify-center">
              <button onClick={() => navigate("/cart")}>
                <FaShoppingBag className="cursor-pointer text-[30px]" />
              </button>
            </div>

            {/* login/signup  */}
            <div className="relative">
              {user ? (
                <div className="group relative flex items-center gap-2 cursor-pointer">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center bg-gray-700 text-white font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <svg
                    className="w-4 h-4 text-white transition-transform duration-300 ease-in-out group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50">
                    <div className="px-4 py-2 text-sm text-gray-600 font-medium border-b">
                      <div>{user.username}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex cursor-pointer  items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                      <FaSignOutAlt className="mr-2 text-gray-700" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  {/* Sign In Button */}
                  <button
                    onClick={() => navigate("/signIn")}
                    className="  relative cursor-pointer overflow-hidden group flex items-center justify-center w-24 px-3 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    <FaSignInAlt className="text-gray-700 text-lg group-hover:-translate-x-12 group-hover:opacity-0 transition-all duration-400 ease-in-out" />
                    <span className="absolute text-sm text-gray-700 font-medium opacity-0 group-hover:opacity-100 group-hover:-translate-x-0 translate-x-8 transition-all duration-400 ease-in-out">
                      Sign In
                    </span>
                  </button>

                  {/* Sign Up Button */}
                  <button
                    onClick={() => navigate("/signUp")}
                    className="relative cursor-pointer overflow-hidden group flex items-center justify-center w-24 px-3 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    <span className="absolute text-sm text-gray-700 font-medium opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-8 transition-all duration-400 ease-in-out">
                      Sign Up
                    </span>
                    <FaUserPlus className="text-gray-700 text-lg group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-400 ease-in-out" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden p-6 flex items-center justify-between">
        <div>
          <img
            onClick={() => navigate("/")}
            src={LogoBlack}
            className="h-12"
            alt="Logo"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            <button onClick={toggleMenu} className="text-white">
              <span className="block w-6 h-1 bg-white mb-1"></span>
              <span className="block w-6 h-1 bg-white mb-1"></span>
              <span className="block w-6 h-1 bg-white"></span>
            </button>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center justify-center">
              <FaShoppingBag
                onClick={() => navigate("/cart")}
                className="cursor-pointer text-[30px]"
              />
            </div>
            {user ? (
              <div className="h-9 w-9 rounded-full flex items-center justify-center bg-gray-600 text-white cursor-pointer">
                {user.username.charAt(0).toUpperCase()}
              </div>
            ) : (
              <button
                onClick={() => navigate("/signIn")}
                className="bg-white text-black text-[15px] rounded-[30px] py-2 px-3 "
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 text-white py-4 px-6">
          <div className="">
            <div className="bg-white border flex items-center w-full h-12 rounded-full overflow-hidden">
              <img className="ml-2 h-9" src={SearchLogo} alt="Search" />
              <input
                className="h-full w-full outline-none mx-2 text-[17px] text-[#7F7F7F]"
                type="text"
                placeholder="Search"
              />
            </div>
            <div className="flex flex-col items-center gap-4 mt-4">
              <div>
                <button
                  onClick={() => handleNavigate("/Women")}
                  className="bg-white w-[370px] text-black px-4 py-2 rounded-full cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95"
                >
                  Women
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleNavigate("/Men")}
                  className="bg-white w-[370px] text-black px-4 py-2 rounded-full cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95"
                >
                  Men
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleNavigate("/allproducts")}
                  className="bg-white w-[370px] text-black px-4 py-2 rounded-full cursor-pointer mx-1 transition-all duration-300 hover:bg-[#dddddd] hover:scale-105 active:scale-95"
                >
                  All Collections
                </button>
              </div>
              {user && (
                <div className="w-full">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-red-500 w-[370px] text-white px-4 py-2 rounded-full cursor-pointer mx-1 transition-all duration-300 hover:bg-red-600 hover:scale-105 active:scale-95"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
