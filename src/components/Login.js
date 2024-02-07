import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import React, { useState, useRef, useEffect, useContext } from "react";

import { AccountContext } from "../context/AccountContext";

function Login() {
  const { handleLogin, setEmail, setPassword } = useContext(AccountContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const offCanvasRef = useRef(null);

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

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <CgProfile
        onClick={toggleMenu}
        className="text-white text-4xl hover:text-blue-700"
      />
      <form
        onSubmit={handleLogin}
        // method="POST"
        className="space-y-4 md:space-y-6"
      >
        <div className="flex">
          <div
            className={`flex-grow overflow-y-auto font-bold ${
              isMenuOpen ? "overflow-hidden" : ""
            }`}
          >
            {/* Offcanvas Component */}
            {isMenuOpen && (
              <>
                <div
                  onClick={toggleMenu}
                  className="fixed inset-0 z-50 bg-black bg-opacity-50"
                >
                  {" "}
                </div>
                <div
                  ref={offCanvasRef}
                  className="fixed inset-y-0 right-0 w-96 z-50 bg-white p-4 shadow-md"
                >
                  <h3 className="text-2xl font-semibold mb-4">Login</h3>
                  <div>
                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">
                      Email Address
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      className="border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:text-black"
                      placeholder="Email Address"
                    ></input>
                  </div>
                  <div className="mt-3">
                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">
                      Password
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="••••••••"
                      name="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:text-black"
                      required=""
                    ></input>
                  </div>
                  <div className="flex justify-center items-center mt-3">
                    <button className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-36 border border-black hover:border-transparent rounded">
                      LOG IN
                    </button>
                  </div>
                  <div className="flex justify-center items-center mt-3 mb-3">
                    <Link className="text-md font-medium text-primary-600 hover:underline dark:text-primary-500 text-black-500">
                      Forgot your Password?
                    </Link>
                  </div>
                  <Link class="bg-black hover:bg-white text-white font-semibold hover:text-black py-2 px-24 border border-black hover:border-black rounded">
                    CREATE ACCOUNT
                  </Link>
                </div>
              </>
            )}
            {/* End Offcanvas Component */}
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
