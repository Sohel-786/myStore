import { nanoid } from "nanoid";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutProduct({ data, handle, quantity, size, remove }) {
  const navigate = useNavigate();
  let {
    _id,
    name,
    price,
    description,
    brand,
    category,
    deliveryInfo,
    availableSizes,
    sale,
    pricedrop,
    thumbnail,
  } = data;

  function handleSalePrice(price, off) {
    let temp = (off / 100) * price;
    return Math.floor(price - temp);
  }

  const [productData, setProductData] = useState({
    quantity: quantity,
    size: size,
    price: Math.floor(price - (pricedrop / 100) * price),
  });

  return (
    <div className="w-full flex rounded-lg bg-blue-50 overflow-hidden ">
      <div onClick={() => {
        navigate(`/product-details/${_id}` , {state : data})
      }} className="w-[110px] h-[150px] flex justify-center items-center cursor-pointer">
        <img
          src={thumbnail.secure_url}
          alt={name}
          className="w-full aspect-auto max-h-full"
        />
      </div>

      <div className="max-h-[150px] relative ml-3 border-r-[0.8px] border-gray-300 w-[40%]">
        <div className="">
          {sale === "YES" && (
            <div className="absolute bg-black text-white px-[6px] py-[2px] rounded-xl text-[8px] tracking-wider font-Roboto font-semibold bottom-3 left-2">
              <p>SALE</p>
            </div>
          )}

          <div className="absolute text-white rounded-xl text-[8px] tracking-wider font-Roboto font-semibold bottom-2 right-5">
            <button
              onClick={() => {
                remove(_id);
              }}
              className="w-fit text-sm flex bg-red-100 rounded-md font-Mukta mt-2 text-[#db4040] relative before:absolute before:top-0 before:right-full before:left-0 before:bottom-0 hover:before:right-0 before:transition-all before:ease-in-out overflow-hidden hover:text-white before:z-[5] before:bg-[#d53c3c] px-[20px] py-[2px]"
            >
              <span className="z-10">- Remove</span>
            </button>
          </div>

          <div className="my-3 px-[10px]">
            <div>
              <h1 className="capitalize text-xl text-blue-500 mb-[4px] font-black font-Nova ">
                {brand}
              </h1>
              <p
                className="capitalize text-[#6f7899] text-[16px] font-semibold leading-[20px] "
                title={name}
              >
                {name}
              </p>
            </div>

            <div className="mt-[10px] mb-[6px] text-[#282c3f]">
              {sale === "YES" ? (
                <span>
                  <span className="text-[15px] font-bold leading-[16px] ">
                    Rs. {Math.floor(price - (pricedrop / 100) * price)}
                  </span>
                  <span className="ml-[5px] text-[#7e818c] text-[12px] leading-[15px] line-through">
                    Rs. {price}
                  </span>{" "}
                  <span className="text-[red] text-[12px] ml-[5px]">
                    ({pricedrop}% OFF)
                  </span>{" "}
                </span>
              ) : (
                <span className="text-[14px] font-bold leading-[15px] ">
                  Rs. {price}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col w-[18%] border-r-[0.8px] border-gray-300 items-center pt-2">
        <h1 className="font-Nova text-sm font-bold text-gray-600">
          Select Size
        </h1>

        <ul className="w-full flex flex-wrap gap-2 mt-2 items-center justify-center">
          {availableSizes.map((el) => {
            return (
              <li
                onClick={() => {
                  setProductData({
                    ...productData,
                    size: el,
                  });

                  handle(_id, {
                    size: el,
                    quantity: productData.quantity,
                    price:
                      handleSalePrice(price, pricedrop) * productData.quantity,
                  });
                }}
                key={nanoid(4)}
                className={`w-[45px] uppercase h-[43px] hover:border-red-600 flex justify-center items-center text-sm font-bold rounded-md border-[1px] border-slate-400 cursor-pointer ${
                  productData.size === el ? `bg-black text-white` : `bg-white`
                }`}
              >
                {el}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex w-[15%] border-r-[0.8px] border-gray-300 items-center flex-col pt-2">
        <h1 className="font-Nova text-sm font-bold text-gray-600">Quantity</h1>

        <div className="flex justify-center items-center w-full h-[80%]">
          <button
            disabled={productData.quantity === 1}
            onClick={() => {
              setProductData({
                ...productData,
                quantity: productData.quantity - 1,
                price:
                  handleSalePrice(price, pricedrop) *
                  (productData.quantity - 1),
              });

              handle(_id, {
                size: productData.size,
                quantity: productData.quantity - 1,
                price:
                  handleSalePrice(price, pricedrop) *
                  (productData.quantity - 1),
              });
            }}
            className="w-[25px] h-[23px] hover:border-cyan-400 flex justify-center items-center font-bold  rounded-sm text-xl border-[1px] border-slate-400 cursor-pointer bg-white disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            -
          </button>

          <div className="w-[30%] h-8 bg-white mx-3 border-[0.8px] border-black flex justify-center items-center text-sm">
            {productData.quantity}
          </div>

          <button
            onClick={() => {
              setProductData({
                ...productData,
                quantity: productData.quantity + 1,
                price:
                  handleSalePrice(price, pricedrop) *
                  (productData.quantity + 1),
              });

              handle(_id, {
                size: productData.size,
                quantity: productData.quantity + 1,
                price:
                  handleSalePrice(price, pricedrop) *
                  (productData.quantity + 1),
              });
            }}
            className="w-[25px] h-[23px] hover:border-cyan-400 flex justify-center items-center font-bold  rounded-sm text-xl border-[1px] border-slate-400 cursor-pointer bg-white"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex w-[14.5%] items-center flex-col pt-2">
        <h1 className="font-Nova text-sm font-bold text-gray-600">Price</h1>

        <div className="flex justify-center items-center w-full h-[80%] font-Slab">
          Rs. {handleSalePrice(price, pricedrop) * productData.quantity}
        </div>
      </div>
    </div>
  );
}

export default memo(CheckoutProduct);
