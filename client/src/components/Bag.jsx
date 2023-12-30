import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../config/axiosInstance";
import { nanoid } from "@reduxjs/toolkit";
import { BiSolidShoppingBags } from "react-icons/bi";
import BagProduct from "./Product/BagProduct";

function Bag() {
  const [bagItems, setBagItems] = useState(null);
  const { bag } = useSelector((s) => s?.auth);

  useEffect(() => {
      getCartProducts(bag);
  }, [bag]);

  async function getCartProducts(arr) {
    let temp = [];
    arr.forEach((el) => {
      temp.push(el.productId);
    });
    const res = await axiosInstance.post("/user/getBag", {
      data: temp,
    });

    if (res?.data?.products) {
      setBagItems([...res.data.products]);
    }
  }

  return (
    <div className="w-full h-full">
      <ul className="w-full h-[87%] flex pt-[60px] relative gap-2 overflow-y-scroll">
        <li className="w-full flex gap-2 justify-center absolute top-0 py-3 text-white text-center bg-black">
          <h1 className="text-2xl font-Nova tracking-wide font-bold">MY BAG</h1>
          <BiSolidShoppingBags size={"28px"} />
        </li>
        {bagItems ? (
          <>
            {bagItems.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center text-xl font-semibold">
                <h1 className="text-gray-400">Empty</h1>
              </div>
            ) : (
              bagItems.map((el) => {
                return <BagProduct key={nanoid(4)} data={el} />;
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

      {bagItems && (
        <div className="w-full flex flex-col justify-center items-center">
          <button className="w-[95%] text-sm py-[6px] font-bold font-Slab justify-center items-center flex bg-gradient-to-r from-zinc-500 via-zinc-800 to-zinc-900 rounded-md mt-2 text-white relative before:absolute before:top-0 before:right-full before:left-0 before:bottom-0 hover:before:right-0 before:transition-all before:ease-in-out overflow-hidden hover:text-white before:z-[5] before:bg-slate-600">
            <span className="z-[10]">OPEN BAG</span>{" "}
          </button>
          <button className="w-[95%] text-sm py-[6px] font-bold font-Slab justify-center items-center flex bg-gradient-to-r from-slate-500 via-slate-800 to-slate-900 rounded-md mt-1 text-white relative before:absolute before:top-0 before:right-full before:left-0 before:bottom-0 hover:before:right-0 before:transition-all before:ease-in-out overflow-hidden hover:text-white before:z-[5] before:bg-zinc-600">
            <span className="z-[10]">CHECKOUT</span>{" "}
          </button>
        </div>
      )}
    </div>
  );
}

export default Bag;
