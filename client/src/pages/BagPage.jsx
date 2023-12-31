import { useSelector } from "react-redux";
import CommonDrawer from "../components/CommonDrawer";
import UserLayout from "../layouts/UserLayout";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import CheckoutProduct from "../components/Product/CheckoutProduct";
import { nanoid } from "nanoid";

function BagPage() {
  const [bagItems, setBagItems] = useState(null);
  const [finalProducts, setFinalProducts] = useState();
  const { bag } = useSelector((s) => s?.auth);

  useEffect(() => {
    getCartProducts(bag);
  }, [bag]);

  async function getCartProducts(arr) {
    let temp = [];
    arr.forEach((el) => {
      temp.push(el.productId);
    });
    if (temp.length === 0) {
      setBagItems([]);
      return;
    }
    const res = await axiosInstance.post("/user/getBag", {
      data: temp,
    });

    if (res?.data?.products) {
      setBagItems([...res.data.products]);
      if (!finalProducts) {
        let temp = [];
        res.data.products.forEach((el) => {
          let obj = {
            productId: el._id,
            size: el.availableSizes[0],
            quantity: 1,
            price: Math.floor(el.price - (el.pricedrop / 100) * el.price),
          };

          temp.push(obj);
        });

        setFinalProducts([...temp]);
      }
    }
  }

  return (
    <UserLayout>
      <div className="flex px-28 py-8 max-w-[1280px] relative mx-auto">
        <CommonDrawer />

        <div className="w-full flex flex-col">
          {bagItems ? (
            <>
              {bagItems.length === 0 ? (
                <li className="w-full flex justify-center items-center text-xl font-semibold">
                  <h1 className="text-gray-400">Empty</h1>
                </li>
              ) : (
                bagItems.map((el) => {
                  return <CheckoutProduct key={nanoid(4)} data={el} />;
                })
              )}
            </>
          ) : (
            <li className="h-[70vh] w-full flex justify-center items-center">
              <img
                src="/assets/loadingGif.gif"
                alt="Loading..."
                className="w-[60px] max-h-[60px]"
              />
            </li>
          )}
        </div>
      </div>
    </UserLayout>
  );
}

export default BagPage;
