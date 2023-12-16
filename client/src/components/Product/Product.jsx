import { useState } from "react";

function Product({ data }) {
  const [showDetails, seShowDetails] = useState(true);

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
    <li className="w-[210px] flex flex-col cursor-pointer hover:shadow-product">
      <div className="h-[280px] w-full">
        <img src={thumbnail.secure_url} alt={name} className="w-full h-full" />
      </div>
      {showDetails ? (
        <div className="my-3 px-[10px] relative">
          <div className="flex flex-col py-4 px-[10px]">
            <span
              type="button"
              onClick={onclick}
              className="border-[1px] text-[#d4d5d9] flex items-center gap-1 relative hover:border-black cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-950 before:-z-10 before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base"
            >
              WISHLIST
            </span>
          </div>
          <div>
            <p
              className="capitalize text-[#535766] text-[13px] leading-[14px]"
              title={name}
            >
              Sizes:{" "}
              <span className="uppercase ml-[2px] font-Roboto">
                {availableSizes.join(" , ")}
              </span>
            </p>
          </div>

          <div className="mt-[10px] mb-[6px] text-[#282c3f]">
            {sale === "YES" ? (
              <span>
                <span className="text-[14px] font-bold leading-[15px] ">
                  Rs. {finalprice}
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
      ) : (
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
                <span className="text-[14px] font-bold leading-[15px] ">
                  Rs. {finalprice}
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
      )}
    </li>
  );
}

export default Product;
