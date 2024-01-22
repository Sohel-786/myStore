import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../config/axiosInstance";
import { nanoid } from "@reduxjs/toolkit";
import { FaThList } from "react-icons/fa";
import Product from "./Product/Product";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../Context/WishListContext";

function WishList() {
  const [wishlist, setWishlist] = useState(null);
  const { wishList } = useSelector((s) => s?.auth);
  const { handleWishList } = useContext(WishlistContext)
  const navigate = useNavigate();

  useEffect(() => {
      getWishlistProducts(wishList);
  }, [wishList]);

  async function getWishlistProducts(arr) {
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

      <div className="flex items-center relative h-full">
        <ul className="w-full flex pt-[60px] gap-4 px-5 mt-2">
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

        <div className="h-full flex justify-center items-center absolute right-0 top-14 px-1 bottom-0 shadow-md">
          <div
            onClick={() => {
              handleWishList();
              scrollTo({
                top: 0,
                behavior: "smooth",
              });
              navigate('/user/wishlist');
            }}
            className="w-[50px] h-[48px] relative left-[-30px] flex justify-center items-center cursor-pointer rounded-full bg-gray-200 hover:scale-110 transition-all duration-300 ease-in-out"
          >
            <FaAngleRight size={"22px"} className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishList;
