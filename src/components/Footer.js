import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="grid grid-cols-4">
          <div>
            <h2 className="text-white relative m-auto uppercase font-bold">
              Customer Services
            </h2>
            <div className="text-gray-500 mt-5 font-light">
              <ul>
                <li>
                  <p>Terms And condition</p>
                </li>
                <li className="mt-2">
                  <p>Privacy Policy</p>
                </li>
                <li className="mt-2">
                  <p>Delivery And Returns</p>
                </li>
                <li className="mt-2">
                  <p>Terms Of Services</p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-white relative m-auto uppercase font-bold">
              About
            </h2>
            <div className="text-gray-500 mt-5 font-light">
              <ul>
                <li>
                  <p>About Us</p>
                </li>
                <li className="mt-2">
                  <p>Our Branches</p>
                </li>
                <li className="mt-2">
                  <p>How To Purchase </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-white">Keep in contact</div>
        </div>
      </div>
    </footer>
  );
};
