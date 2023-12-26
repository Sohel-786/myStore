import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../config/axiosInstance";
import Product from "./Product/Product";
import { nanoid } from "@reduxjs/toolkit";
import { BagContext } from "../Context/BagContext";

function Bag() {
  const [bagItems, setBagItems] = useState(null);
  const { data } = useSelector((s) => s?.auth);
  const { isOpenBag } = useContext(BagContext);

  useState(() => {
    if(data.cartItems){
      getCartProducts(data.cartItems);
    }
  }, [data]);

  async function getCartProducts(arr){
     const temp = [];
     arr.forEach((el) => {
        temp.push(el.productId);
     });


     console.log('check');

     const res = await axiosInstance.post('/user/getBag', {
        data : temp
     });

     if(res?.data?.products){
        console.log(res.data.products);
        setBagItems([...res.data.products]);
     }
  }

  return (
    <div className="w-full h-full flex mt-5">
      <ul>
        {
            bagItems && bagItems.map((el) => {
                return <Product key={nanoid(4)}  data={el} />
            })
        }
      </ul>
    </div>
  );
}

export default Bag;
