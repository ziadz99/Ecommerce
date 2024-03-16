import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import AccountImg from "./AccountImg";
import { AccountContext } from "../context/AccountContext";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { useContext, useEffect, useState } from "react";
import Cart from "./Cart";
import Login from "./Login";

export const Navbar = () => {
  const { token } = useContext(AccountContext);
  const { shoppingCart, getCartItemQuantity } = useContext(ShoppingCartContext);

  const [userAuth, setUserAuth] = useState(<Login />);
  // let userAuth;
  useEffect(() => {
    if (token) {
      setUserAuth(<AccountImg />);
    } else {
      setUserAuth(<Login />);
    }
    //TODO: Fix Nav Bar
  }, [token]);
  return (
    <nav className="bg-black   w-full  top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            E-Commerce
          </span>
        </Link>
        <>
          <div className="flex md:order-2 ">
            <div>{userAuth}</div>
            {/* {!token && (
            <div>
              <Login />
            </div>
          )} */}

            {/* {token && (
            <div>
              <AccountImg />
            </div>
          )} */}
            <div className="ml-5 relative">
              <Cart />
            </div>
          </div>
        </>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-2 md:p-0 mt-4 font-medium border  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white focus:font-bold focus:md:text-blue-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white focus:font-bold focus:md:text-blue-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white focus:font-bold focus:md:text-blue-700"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
