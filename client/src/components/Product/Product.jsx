import { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoBagHandleSharp } from "react-icons/io5";

function Product({ data }) {
  const [showDetails, setShowDetails] = useState(false);
  // 83.9873px

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
    <li
      className="w-[210px] flex flex-col cursor-pointer hover:shadow-product relative"
      onMouseEnter={() => {
        setShowDetails(true);
      }}
      onMouseLeave={() => {
        setShowDetails(false)
      }}
    >
      <div className="h-[280px] w-full">
        <img src={thumbnail.secure_url} alt={name} className="w-full h-full" />
      </div>
      {showDetails && (
        <div className="mb-3 px-[10px] min-h-[83.9873px] absolute w-full bg-white bottom-[40px] z-[2]">
          <div className="flex flex-col py-4 gap-2">
            <span
              type="button"
              // onClick={}
              className="border-[1px] border-[#d4d5d9] py-2 flex items-center justify-center gap-[6px] relative hover:border-black cursor-pointer px-3 font-semibold font-Mukta tracking-wide text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-950 before:transition-all before:ease-in-out hover:before:right-0 before:z-[5]"
            >
              <span className="flex items-center justify-center gap-[6px] z-10">
                <IoBagHandleSharp
                  size={"18px"}
                  className="relative top-[-3px]"
                />
                ADD TO BAG
              </span>
            </span>
            <span
              type="button"
              // onClick={}
              className="border-[1px] border-[#d4d5d9] py-2 flex items-center justify-center gap-[6px] relative hover:border-black cursor-pointer px-3 font-semibold font-Mukta tracking-wide text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-950 before:transition-all before:ease-in-out hover:before:right-0 before:z-[5]"
            >
              <span className="flex items-center justify-center gap-[6px] z-10">
                <IoMdHeartEmpty className="relative top-[-1px]" size={"18px"} />
                WISHLIST
              </span>
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
        </div>
      )}
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
    </li>
  );
}

export default Product;
