import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClothes } from "../store/thunks/fetchClothes";
import { fetchWomenClothes } from "../store/thunks/fetchWomenClothes";
import { useState } from "react";
import Sidebar from "./Sidebar";
import ProductCard from "./ProductCard";
import ViewAsButton from "./ViewAsButton";
import SquareLoadingSkeleton from "./SquareLoadingSkeleton ";

function Products() {
  // Usage in your component
  const dispatch = useDispatch();
  const [fetchError, setFetchError] = useState(null);
  const [clothes, setClothes] = useState(null);
  const [filteredClothes, setFilteredClothes] = useState(null);
  const [numCols, setNumCols] = useState(2);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(null);

  const { data, error } = useSelector((state) => state.clothes);

  useEffect(() => {
    if (error) {
      setFetchError("Could not fetch the clothes");
      setClothes(null);
      setFilteredClothes(null);
      console.log(error);
    }

    setTimeout(() => {
      // Set data and mark loading as false
      if (data) {
        setClothes(data);
        setFilteredClothes(data);
        setFetchError(null);
      }
      setLoading(false);
    }, 2000); // Simulate 2 seconds loading time
  }, [data, error]);

  //checking conditions for cols

  // const oneCols = () => {
  //   setNumCols(1);
  // };
  const twoCols = () => {
    setNumCols(2);
  };

  const threeCols = () => {
    setNumCols(3);
  };

  //dispatch function depends on which page we are in
  useEffect(() => {
    if (window.location.href === "http://localhost:3000/products?name=Men") {
      dispatch(fetchClothes());
      setPage("Men");
    } else if (
      window.location.href === "http://localhost:3000/products?name=Women"
    ) {
      dispatch(fetchWomenClothes());
      setPage("Women");
    }
  }, [dispatch]);

  return (
    <div className="mt-5">
      {clothes ? (
        <div className="mx-auto max-w-2xl px-4 py-16  lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8 text-center border-b border-white-500">
            {page === "Men" ? "Men's Collection" : "Women's Collection"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <div className="col-span-1">
              <Sidebar
                clothes={clothes}
                setFilteredClothes={setFilteredClothes}
                category={page === "Men" ? 1 : 2}
              />
            </div>
            <div className="lg:col-span-2 sm:col-span-1">
              <div className="mb-5 hidden lg:block">
                <ViewAsButton twoCols={twoCols} threeCols={threeCols} />
              </div>
              <div className={`grid lg:grid-cols-${numCols} gap-x-8 gap-y-3`}>
                {filteredClothes.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SquareLoadingSkeleton count={5} size={50} /> // Render skeleton loader while clothes data is loading
      )}
    </div>
  );
}

export default Products;
