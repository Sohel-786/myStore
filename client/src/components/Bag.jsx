import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../config/axiosInstance";
import Product from "./Product/Product";

function Bag() {
  const [bagItems, setBagItems] = useState(null);
  const { cartItems } = useSelector((s) => s?.auth?.data);

  useState(() => {
    getCartProducts(cartItems);
  }, [cartItems]);

  async function getCartProducts(arr){
     const temp = [];
     arr.forEach((el) => {
        temp.push(el.productId);
     });

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
                return <Product  data={el} />
            })
        }
      </ul>
    </div>
  );
}

export default Bag;
