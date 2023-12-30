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
    <div className="w-full flex ">
      <div className="w-[110px] h-[150px]">
        <img src={thumbnail.secure_url} alt={name} className="w-full aspect-auto max-h-full" />
      </div>

      <div className="">
        <div className="max-h-[280px] w-[50%]">
          {sale === "YES" && (
            <div className="absolute bg-black text-white px-[6px] py-[2px] rounded-xl text-[8px] tracking-wider font-Roboto font-semibold top-1 left-1">
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
                {name.slice(0, 45)}..
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
    </div>
  );
}

export default CheckoutProduct;
