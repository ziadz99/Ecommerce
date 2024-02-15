import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

function CheckOut() {
  const { shoppingCart } = useContext(ShoppingCartContext);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedGovernorate(event.target.value);
  };
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <p className="text-2xl font-bold text-gray-800">Check Out</p>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </Link>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </Link>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </Link>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          {shoppingCart.map((item, index) => {
            return (
              <>
                <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                  <div className="flex flex-row rounded-lg bg-white sm:flex-row">
                    <img
                      className="m-2 h-20 w-20 rounded-md border object-cover object-center"
                      src={item.Image}
                      alt=""
                    />
                    <div className="flex w-full flex-row px-4 py-2 justify-center items-center">
                      <span className="font-semibold">{item.Name}</span>
                      <span className="font-semibold ml-5">
                        {item.Price} EGP
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Delivery</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="flex">
            <input
              type="text"
              id="fname"
              name="fname"
              className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="First name"
            />
            <input
              type="text"
              id="lname"
              name="lname"
              className="w-full rounded-md border border-gray-200 px-4 py-3 ml-5 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Last name"
            />
          </div>

          <div className="mt-3">
            <input
              type="text"
              id="address"
              name="address"
              className="w-full rounded-md border border-gray-200  py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Address"
            />
          </div>
          <div className="flex mt-5">
            <input
              type="text"
              id="city"
              name="city"
              className="w-full rounded-md border border-gray-200 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="City"
            />
            <div className="ml-2">
              <select
                className=" rounded-md border-gray-200 py-3 text-sm shadow-sm"
                id="governorateDropdown"
                value={selectedGovernorate}
                onChange={handleSelectChange}
              >
                <option value="" disabled selected hidden>
                  Governorate
                </option>
                <option value="Alexandria">Alexandria</option>
                <option value="Cairo">Cairo</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <input
              type="text"
              id="psc"
              name="psc"
              className="w-full rounded-md border border-gray-200 px-4 py-3 ml-5 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Postal Code"
            />
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full rounded-md border border-gray-200 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Phone"
            />
          </div>
          <div className="mt-5 mb-2">
            <h1 className="font-bold text-3xl">Payment</h1>
          </div>
          <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              id="cards"
              type="radio"
              value="cards"
              name="bordered-radio"
              onChange={handleRadioChange}
              checked={selectedValue === "cards"}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
            />
            <label for="cards" className="w-full py-4 ms-2 text-sm font-medium">
              Pay with Credit/Debit Card
            </label>
          </div>
          <div className={selectedValue === "cards" ? "flex" : "hidden"}>
            <div className="relative w-7/12 flex-shrink-0">
              <input
                type="text"
                id="card-no"
                name="card-no"
                className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="xxxx-xxxx-xxxx-xxxx"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                </svg>
              </div>
            </div>
            <input
              type="text"
              name="credit-expiry"
              className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="MM/YY"
            />
            <input
              type="password"
              name="credit-cvc"
              maxLength={3}
              className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="CVC"
            />
          </div>
          <div className="mt-2 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              id="cod"
              type="radio"
              value="cod"
              name="bordered-radio"
              onChange={handleRadioChange}
              checked={selectedValue === "cod"}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
            />
            <label for="cards" className="w-full py-4 ms-2 text-sm font-medium">
              Cash on Delivery (CoD)
            </label>
          </div>

          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900">399.00 EGP</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="font-semibold text-gray-900">25.00 EGP</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">408.00 EGP</p>
          </div>
          <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
