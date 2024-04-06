import React, { useState, useRef, useEffect, useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import CardProductItem from "./CardProductItem";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { Link } from "react-router-dom";

const Cart = ({ children }) => {
  const {
    shoppingCart,
    addCartItem,
    decItemQuantitiy,
    removeCartItem,
    calcSum,
    getCartItemQuantity,
  } = useContext(ShoppingCartContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  // const [total, setTotal] = useState(0);
  // const [cartCounter, setCartCounter] = useState(0);
  const offCanvasRef = useRef(null);
  // const { shoppingCart } = useContext(ShoppingCartContext);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // console.log("Target", event.target, "Canvas", offCanvasRef.current);
      // event.preventDefault();
      if (
        offCanvasRef.current &&
        !offCanvasRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.body.classList.add("overflow-y-hidden");
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [isMenuOpen, offCanvasRef]);

  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (
  //       offCanvasRef.current &&
  //       !offCanvasRef.current.contains(event.target)
  //     ) {
  //       setMenuOpen(false);
  //     }
  //   };

  //   if (isMenuOpen) {
  //     document.addEventListener("click", handleOutsideClick);
  //   }

  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, [isMenuOpen, offCanvasRef]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  // console.log(shoppingCart);
  // console.log(calcSum(shoppingCart));

  return (
    <div className="flex">
      <div
        className={`flex-grow p-1 overflow-y-auto font-bold ${
          isMenuOpen ? "overflow-hidden" : ""
        }`}
      >
        <button
          className="text-black focus:outline-none text-3xl hover:text-blue-500"
          onClick={toggleMenu}
        >
          <FiShoppingCart />
          {shoppingCart.length > 0 && (
            <p className="absolute top-0 right-0 transform translate-y-1 z-10 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {getCartItemQuantity()}
            </p>
          )}
        </button>

        {children}

        {/* Offcanvas Component */}
        {isMenuOpen && (
          <>
            <div
              onClick={toggleMenu}
              className="fixed inset-0 z-50 bg-black bg-opacity-50"
            ></div>
            <div
              ref={offCanvasRef}
              className="fixed inset-y-0 right-0 overflow-y-scroll w-96 sm:w-80 z-50 bg-white p-4 shadow-md"
              // className='fixed inset-y-0 right-0 w-96 z-50 bg-white p-4 shadow-md'
            >
              <h3 className="text-2xl font-semibold mb-4">Shopping Cart</h3>
              <p className="mb-2 text-md">{getCartItemQuantity()} Items</p>
              <div>
                {shoppingCart && (
                  <>
                    <CardProductItem
                      shoppingCart={shoppingCart}
                      addCartItem={addCartItem}
                      decItemQuantitiy={decItemQuantitiy}
                      removeCartItem={removeCartItem}
                    />
                  </>
                )}
                {!shoppingCart.length ? (
                  <p className="text-center mt-5 mb-5 ">Your Cart is empty</p>
                ) : (
                  <p className="text-left mt-5 mb-5 font-extrabold ">
                    Total: {calcSum(shoppingCart)}
                  </p>
                )}
              </div>
              <div>
                {shoppingCart.length > 0 ? (
                  <Link
                    to="/checkout"
                    onClick={toggleMenu}
                    className="text-white bg-black rounded py-2 px-28 hover:bg-slate-800"
                  >
                    Check Out
                  </Link>
                ) : (
                  <div class="flex justify-center items-center">
                    <button
                      onClick={toggleMenu}
                      class="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-20 border border-black hover:border-transparent rounded"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-white bg-black">0</p>
          </>
        )}
        {/* End Offcanvas Component */}
      </div>
    </div>
  );
};

export default Cart;
