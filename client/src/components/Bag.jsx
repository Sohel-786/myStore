import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../config/axiosInstance";

function Bag() {
  const [bagItems, setBagItems] = useState(null);
  const { cartItems } = useSelector((s) => s?.auth?.data);

  useState(() => {

  }, [cartItems]);

  async function getCartProducts(arr){
     const temp = [];
     arr.forEach((el) => {
        temp.push(el.productId);
     });

     const { data } = await axiosInstance.post('/user/getBag', {
        data : temp
     });

     
  }

  return (
    <div className="w-full h-full flex mt-5">
      <ul>{}</ul>
    </div>
  );
}

export default Bag;
