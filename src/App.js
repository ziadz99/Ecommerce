import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Navbar } from "./components/Navbar";
import { NoMatch } from "./components/NoMatch";
import { Home } from "./components/Home";
import Profile from "./components/Profile";
import Products from "./components/Products";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./store/thunks/fetchCategories";
import { useEffect } from "react";
import Cart from "./components/Cart";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import CheckOut from "./components/CheckOut";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <ShoppingCartProvider>
        <Navbar />

        <Routes>
          <Route path="Login" element={<Login />}></Route>
          <Route path="SignUp" element={<SignUp />}></Route>
          <Route path="Cart" element={<Cart />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<NoMatch />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="checkout" element={<CheckOut />}></Route>
        </Routes>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
