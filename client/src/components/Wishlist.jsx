import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../config/axiosInstance";
import { nanoid } from "@reduxjs/toolkit";
import { FaThList } from "react-icons/fa";
import Product from "./Product/Product";

function WishList() {
  const [wishlist, setWishlist] = useState(null);
  const { data } = useSelector((s) => s?.auth);

  useEffect(() => {
    if (data.wishlist) {
      getCartProducts(data.wishlist);
    }
  }, [data]);

  async function getCartProducts(arr) {
    let temp = [];
    arr.forEach((el) => {
      temp.push(el.productId);
    });
    const res = await axiosInstance.post("/user/getBag", {
      data: temp,
    });

    if (res?.data?.products) {
      setWishlist([...res.data.products]);
    }
  }

  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center gap-3 justify-center absolute top-0 py-3 text-white text-center bg-blue-500">
        <h1 className="text-2xl font-Slab tracking-wide font-bold">
          MY WISHLIST
        </h1>
        <FaThList size={"24px"} />
      </div>
      <ul className="w-full flex pt-[60px] relative gap-2 px-5 mt-2">
        {wishlist ? (
          <>
            {wishlist.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center text-xl font-semibold">
                <h1 className="text-gray-400">Empty</h1>
              </div>
            ) : (
              wishlist.map((el) => {
                return <Product key={nanoid(4)} data={el} wish={true} />;
              })
            )}
          </>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <img
              src="/assets/loadingGif.gif"
              alt="Loading..."
              className="w-[60px] max-h-[60px]"
            />
          </div>
        )}
      </ul>
    </div>
  );
}

export default WishList;
