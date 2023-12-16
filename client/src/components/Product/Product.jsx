function Product({ data }) {
  let {
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

  if (sale === "YES") {
   var finalprice = handleSalePrice(price, pricedrop);
  }

  function handleSalePrice(price, off) {
    let temp = (off / 100) * price;
    return Math.floor(price - temp);
  }
  return (
    <li className="w-[210px] shadow-product flex flex-col cursor-pointer">
      <div className="h-[280px] w-full">
        <img src={thumbnail.secure_url} alt={name} className="w-full h-full" />
      </div>
      <div className="my-3 px-[10px]">
        <div>
          <h1 className="capitalize text-[#282c3f] mb-[6px] font-black font-Nova ">
            {brand}
          </h1>
          <p
            className="capitalize text-[#535766] text-[14px] leading-[14px] "
            title={name}
          >
            {name.slice(0, 27)}..
          </p>
        </div>

        <div className="mt-[10px] mb-[6px] text-[#282c3f]">
          {sale === "YES" ? (
            <span>
              {" "}
              <span className="text-[14px] font-bold leading-[15px] ">Rs. {finalprice}</span> <span>Rs. {price}</span>{" "}
              <span>({pricedrop}% OFF)</span>{" "}
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </li>
  );
}

export default Product;
