import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWomenClothes } from "../store/thunks/fetchWomenClothes";
import { useState } from "react";
import Sidebar from "./Sidebar";

function Women() {
  // Usage in your component
  const dispatch = useDispatch();
  const [fetchError, setFetchError] = useState(null);
  const [clothes, setClothes] = useState(null);
  const [filteredClothes, setFilteredClothes] = useState(null);

  const { data, error } = useSelector((state) => state.clothes);
  useEffect(() => {
    if (error) {
      setFetchError("Could not fetch the clothes");
      setClothes(null);
      setFilteredClothes(null);
      console.log(error);
    }

    if (data) {
      setClothes(data);
      setFilteredClothes(data);
      setFetchError(null);
    }
  }, [data, error]);

  useEffect(() => {
    dispatch(fetchWomenClothes());
  }, [dispatch]);

  return (
    <div className="mt-5">
      {fetchError && <p>{fetchError}</p>}
      {clothes && (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8 text-center">
            Women's Collection
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <div className="row-span-6">
              <Sidebar
                clothes={clothes}
                setFilteredClothes={setFilteredClothes}
              />
            </div>
            {clothes.map((product) => (
              <a key={product.id} href={product.href} className="relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.Image}
                    alt=""
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-5  xl:grid-cols-2 ">
                  <h3 className="mt-4 text-sm text-gray-700 font-bold">
                    {product.Name}
                  </h3>
                  <button className="mt-2 ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add to Cart
                  </button>
                </div>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.Price} EGP
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Women;
