import React from "react";
import SignIn from "./components/SignIn";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/signUp";
import { Toaster } from "react-hot-toast";
import Hero from "./components/Hero";
import Cart from "./pages/Cart";
import FileUpload from "./pages/FileUpload";
import UserLayouts from "./layouts/UserLayouts";
import FetchByCategory from "./pages/FetchByCategory";
import AllProducts from "./pages/AllProducts";
import SearchResults from "./pages/searchResults";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<UserLayouts />}>
          <Route index element={<Hero />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/:category" element={<FetchByCategory />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>

        {/* <Route path='/' element={<FileUpload/>} /> */}
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
