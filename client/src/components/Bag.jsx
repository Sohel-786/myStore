import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../config/axiosInstance";
import { nanoid } from "@reduxjs/toolkit";
import { BiSolidShoppingBags } from "react-icons/bi";
import BagProduct from "./Product/BagProduct";

function Bag() {
  const [bagItems, setBagItems] = useState(null);
  const { cartItems } = useSelector((s) => s?.auth?.data);

  useState(() => {
    if (cartItems.length > 0) {
      console.log("check");
      getCartProducts(cartItems);
    }
  }, [cartItems]);

  async function getCartProducts(arr) {
    const temp = [];
    arr.forEach((el) => {
      temp.push(el.productId);
    });

    const res = await axiosInstance.post("/user/getBag", {
      data: temp,
    });

    console.log(res);

    if (res?.data?.products) {
      setBagItems([...res.data.products]);
    }
  }

  return (
    <ul className="w-full h-full flex pt-[60px] relative">
      <li className="w-full flex gap-2 justify-center absolute top-0 py-3 text-white text-center bg-black">
        <h1 className="text-2xl font-Nova tracking-wide font-bold">MY BAG</h1>
        <BiSolidShoppingBags size={"28px"} />
      </li>
      {bagItems ? (
        bagItems.map((el) => {
          return <BagProduct key={nanoid(4)} data={el} />;
        })
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
  );
}

export default Bag;
