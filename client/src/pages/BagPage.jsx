import { useSelector } from "react-redux";
import CommonDrawer from "../components/CommonDrawer";
import UserLayout from "../layouts/UserLayout";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import CheckoutProduct from "../components/Product/CheckoutProduct";
import { nanoid } from "nanoid";

function BagPage() {
  const [finalProducts, setFinalProducts] = useState(null);
  const { bag } = useSelector((s) => s?.auth);

  const [priceTotal, setPriceTotal] = useState({
    total: 0,
  });

  useEffect(() => {+
    console.log('bag')
    getCartProducts(bag);
  }, [bag]);

  async function getCartProducts(arr) {
    let temp = [];
    arr.forEach((el) => {
      temp.push(el.productId);
    });
    if (temp.length === 0) {
      setFinalProducts([]);
      return;
    }
    const res = await axiosInstance.post("/user/getBag", {
      data: temp,
    });

    if (res?.data?.products) {
      if (!finalProducts) {
        let temp = [];
        res.data.products.forEach((el) => {
          let obj = {
            productId: el._id,
            size: el.availableSizes[0],
            quantity: 1,
            price: el.price,
            product : el
          };
          
          temp.push(obj);
        });
        
        setFinalProducts([...temp]);
      }
    }
  }

  function handleFinalProducts(id, data) {
    let arr = [];
    for (let i = 0; i < finalProducts.length; i++) {
      if (finalProducts[i].productId === id) {
        arr.push({
          productId: finalProducts[i].productId,
          size: data.size,
          quantity: data.quantity,
          price: data.price,
          product : finalProducts[i].product
        });
      }else{
        arr.push(finalProducts[i]);
      }
    }
    setFinalProducts(arr);
  }

  // const handleFinalProducts = useCallback((id, data) => {
  //   let arr = [];
  //   console.log(finalProducts, bag)
  //   for (let i = 0; i < finalProducts.length; i++) {
  //     if (finalProducts[i].productId === id) {
  //       arr.push({
  //         productId: finalProducts[i].productId,
  //         size: data.size,
  //         quantity: data.quantity,
  //         price: data.price,
  //       });
  //     }else{
  //       arr.push(finalProducts[i]);
  //     }
  //   }
  //   setFinalProducts([...arr]);
  // }, [finalProducts, priceTotal])

  useEffect(() => {
    console.log("run");
    if (finalProducts) {
      handleTotal(finalProducts);
    }
  }, [finalProducts]);

  function handleTotal(arr) {
    let subtotal = 0;
    arr.forEach((el) => {
      subtotal += el.price;
    });

    setPriceTotal({
      total: subtotal,
    });
  }

  return (
    <UserLayout>
      <div className="flex flex-col px-28 py-8 max-w-[1280px] relative mx-auto">
        <CommonDrawer />

        <div className="w-full flex flex-col">
          {finalProducts ? (
            <>
              {finalProducts.length === 0 ? (
                <li className="w-full flex justify-center items-center text-xl font-semibold">
                  <h1 className="text-gray-400">Empty</h1>
                </li>
              ) : (
                finalProducts.map((el) => {
                  return (
                    <CheckoutProduct
                      key={nanoid(4)}
                      data={el.product}
                      price = {el.price}
                      quantity = {el.quantity}
                      size = {el.size}
                      handle={handleFinalProducts}
                    />
                  );
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

        <div className="w-full border-t-[1px] border-gray-500 bg-slate-50 px-3 pt-3 mt-3 font-Roboto">
          <div className="flex justify-between items-center">
            <p>SubTotal</p>
            <p>{priceTotal.total}</p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default BagPage;
