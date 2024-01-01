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

  useEffect(() => {
    +console.log("bag");
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
            price: Math.floor(el.price - (el.pricedrop / 100) * el.price),
            product: el,
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
          product: finalProducts[i].product,
        });
      } else {
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

        <div className="w-full flex flex-col shadow-bag">
          {finalProducts ? (
            <>
              {finalProducts.length === 0 ? (
                <div className="w-full flex text-xl font-semibold mb-2 mt-5">
                  <h1 className="font-Roboto font-bold ml-2 capitalize">
                    You haven't added anything to your bag!
                  </h1>
                </div>
              ) : (
                finalProducts.map((el) => {
                  return (
                    <CheckoutProduct
                      key={nanoid(4)}
                      data={el.product}
                      quantity={el.quantity}
                      size={el.size}
                      handle={handleFinalProducts}
                    />
                  );
                })
              )}

              <div className="w-full font-Mukta border-t-[1px] flex flex-col gap-2 border-gray-500 bg-slate-100 px-3 pt-3 mt-3">
                <div className="flex justify-between items-center text-xl text-blue-700 font-semibold">
                  <p className="text-gray-500 font-Nova">SubTotal</p>
                  <p className="">Rs. {priceTotal.total}</p>
                </div>
                <hr />
                <div className="flex justify-between items-center text-xl text-blue-700 font-semibold">
                  <p className="text-gray-500 font-Nova">Shipping</p>
                  <p className="">Rs. 0</p>
                </div>
                <hr />
                <div className="flex justify-between items-center text-xl text-blue-700 font-semibold">
                  <p className="text-gray-500 font-Nova">Total</p>
                  <p className="">Rs. {priceTotal.total}</p>
                </div>
                <hr />

                <div className="w-full my-2 flex justify-center items-center">
                  <button className="w-[98%] border-[2px] py-2 flex items-center justify-center gap-[6px] relative border-[black] bg-black cursor-pointer px-3 font-semibold font-Mukta tracking-wide text-lg text-white hover:text-black before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-white before:transition-all before:duration-300 before:ease-in-out hover:before:right-0 before:z-[5]">
                    <span className="z-[10]">CHECKOUT</span>
                  </button>
                </div>
              </div>
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
