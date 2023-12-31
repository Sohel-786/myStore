function CheckoutProduct({ data }) {
  let {
    _id,
    name,
    description,
    brand,
    category,
    price,
    deliveryInfo,
    availableSizes,
    sale,
    pricedrop,
    thumbnail,
  } = data;

  return (
    <div className="w-full flex rounded-lg bg-blue-50 overflow-hidden ">
      <div className="w-[110px] h-[150px] flex justify-center items-center">
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
        <h1 className="font-Nova text-sm font-bold text-gray-600">Select Size</h1>

        <div className="w-full flex flex-wrap">
              
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
