import React, { useContext } from "react";
import { useState } from "react";
import "../style.css";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

export default function ProductCard({ product, index }) {
  const [overLay, setOverLay] = useState(false);
  const { addCartItem } = useContext(ShoppingCartContext);

  const handleMouseEnter = () => {
    setOverLay(true);
  };

  const handleMouseLeave = () => {
    setOverLay(false);
  };

  // console.log(shoppingCart);
  return (
    <div className="static">
      <a href={product.href} className="">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full overflow-hidden rounded-lg bg-white border-solid border-2 shadow-xl shadow-blue-gray-900/5 group relative"
        >
          <button
            onClick={() => addCartItem(product)}
            className={`${
              !overLay && "hidden"
            } absolute z-50 bottom-0 left-0 right-0 bg-black text-white p-4 text-center slide-top-hide  `}
          >
            <p>Add To Cart</p>
          </button>
          <img
            src={product.Image}
            alt=""
            className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-125"
          />
        </div>
        <div className="flex justify-between items-center mt-3 mb-3 p-2">
          <h3 className="text-md text-black-700">{product.Name}</h3>
          <p className="text-lg font-lg font-bold text-black-600 text-center">
            {product.Price} EGP
          </p>
        </div>
      </a>
    </div>
  );
}
