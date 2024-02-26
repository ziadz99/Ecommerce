import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import FormTextField from "./FormTextField";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Select from "react-select";

function CheckOut() {
  const { shoppingCart, calcSum } = useContext(ShoppingCartContext);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const options = [
    { value: "alex", label: "Alexandria" },
    { value: "cairo", label: "Cairo" },
  ];

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("Enter your First name"),
    lname: Yup.string().required("Enter your Last name"),
    address: Yup.string().required("Enter your Address"),
    city: Yup.string().required("Enter your City"),
    gov: Yup.string().required("Choose your Governorate"),
    poscode: Yup.string().required("Enter Postal Code"),
    phone: Yup.string().required("Enter your Phone Number"),
  });

  const handleForm = () => {
    //
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
                  to="/products?name=Men"
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
                <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white ring ring-blue-600 ring-offset-2"></Link>
                <span className="font-semibold text-gray-900">
                  Shipping & Payment
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {shoppingCart.length > 0 && (
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            {shoppingCart.map((item, index) => {
              return (
                <>
                  <div className="flex mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                    <div className="flex flex-row rounded-lg bg-white sm:flex-row">
                      <div className="flex">
                        <img
                          className="m-2 h-20 w-20 rounded-md border object-cover object-center"
                          src={item.Image}
                          alt=""
                        />
                        <p className="absolute transform  translate-x-16 z-10 bg-stone-400 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                          {item.quantity}
                        </p>
                      </div>
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
            <Formik
              initialValues={{ fname: "", lname: "", address: "", city: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="flex flex-row">
                    <FormTextField
                      type="fname"
                      name="fname"
                      placeholder="First Name"
                      styling="w-1/2"
                    />
                    <FormTextField
                      type="lname"
                      name="lname"
                      placeholder="Last Name"
                      styling="w-1/2"
                    />
                  </div>
                  <FormTextField
                    type="address"
                    name="address"
                    placeholder="Address"
                    styling="mt-3"
                  />
                  <div className="flex ">
                    <FormTextField
                      type="city"
                      name="city"
                      placeholder="City"
                      styling="mt-3"
                    />
                    <div className="ml-2 translate-y-7">
                      <Select placeholder="Governorate" options={options} />
                    </div>
                    <div className="ml-2 translate-y-3">
                      <FormTextField
                        type="psc"
                        name="psc"
                        placeholder="Postal Code"
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  {calcSum(shoppingCart)} EGP
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">25 EGP</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {calcSum(shoppingCart) + 25}EGP
              </p>
            </div>
            <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
              Place Order
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckOut;
