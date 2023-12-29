import { useRef, useState } from "react";
import { MdBookmarkRemove } from "react-icons/md";
import { IoBagHandleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import {
  addToBag,
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/productSlice";
import { BagContext } from "../../Context/BagContext";
import { toast } from "react-toastify";
import { getUserDetails } from "../../redux/slices/authSlice";
import { WishlistContext } from "../../Context/WishListContext";
import { IoMdHeartEmpty } from "react-icons/io";

function WishlistProduct({ data }) {
  const { handleBag } = useContext(BagContext);
  const { handleWishList } = useContext(WishlistContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, wishlist } = useSelector((s) => s?.auth?.data);

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

  if (sale === "YES") {
    var finalprice = handleSalePrice(price, pricedrop);
  }

  function handleSalePrice(price, off) {
    let temp = (off / 100) * price;
    return Math.floor(price - temp);
  }

  async function handleBagAdd(fromWish) {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].productId === _id) {
        toast.success("Product Is Already In Bag", {
          theme: "colored",
          autoClose: 1500,
          hideProgressBar: true,
        });
        handleBag();
        return;
      }
    }
    const res = await dispatch(addToBag({ _id, handleUserData }));

    await dispatch(removeFromWishlist({ _id, handleUserData }));
    handleBag();
  }

  async function handleUserData() {
    await dispatch(getUserDetails());
  }

  async function handleWishlistRemove() {
    const res = await dispatch(removeFromWishlist({ _id, handleUserData }));
  }
  return (
    <li
      className="w-[400px] flex cursor-pointer hover:shadow-product relative z-[2] rounded-md overflow-hidden border-[0.7px] border-gray-300"
      onMouseEnter={() => {
        setShowDetails(true);
      }}
      onMouseLeave={() => {
        setShowDetails(false);
      }}
      onClick={(e) => {
        if (
          bagRef.current &&
          !bagRef.current.contains(e.target) &&
          wishRef.current &&
          !wishRef.current.contains(e.target)
        ) {
          navigate(`/product-details/${_id}`, { state: data });
        }
      }}
    >
      <div className="h-[280px] w-[50%]">
        <img src={thumbnail.secure_url} alt={name} className="w-full h-full" />
      </div>

      <div className="max-h-[280px] w-[50%]">
        {sale === "YES" && (
          <div className="absolute bg-black text-white px-[6px] py-[2px] rounded-xl text-[8px] tracking-wider font-Roboto font-semibold top-1 left-1">
            <p>SALE</p>
          </div>
        )}

        <div className="my-3 px-[10px]">
          <div>
            <h1 className="capitalize text-xl text-[#282c3f] mb-[4px] font-black font-Nova ">
              {brand}
            </h1>
            <p
              className="capitalize text-[#6f7899] text-[16px] font-semibold leading-[20px] "
              title={name}
            >
              {name.slice(0, 50)}..
            </p>
          </div>

          <div className="mt-[10px] mb-[6px] text-[#282c3f]">
            {sale === "YES" ? (
              <span>
                <span className="text-[15px] font-bold leading-[16px] ">
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

        <div className="mb-3 px-[10px] w-full bg-white">
          <div>
            <p
              className="capitalize text-[#535766] text-[13px] leading-[14px]"
              title={name}
            >
              Sizes:{" "}
              <span className="uppercase ml-[2px] font-Roboto font-bold">
                {availableSizes.join(" , ")}
              </span>
            </p>
          </div>
          <div className="flex flex-col py-4 gap-2">
            <span
              type="button"
              onClick={() => {
                handleBagAdd(true);
              }}
              className="border-[1px] bg-gray-900 text-white border-[#d4d5d9] py-2 flex items-center justify-center gap-[6px] relative hover:border-black cursor-pointer px-3 font-semibold font-Mukta tracking-wide text-xs hover:text-black before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-white before:transition-all before:ease-in-out hover:before:right-0 before:z-[5]"
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
              onClick={handleWishlistRemove}
              className="border-[1px] py-2 flex items-center justify-center gap-[6px] relative border-[red] cursor-pointer px-3 font-semibold font-Mukta tracking-wide text-xs text-[red] hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-red-600 before:transition-all before:ease-in-out hover:before:right-0 before:z-[5]"
            >
              <span className="flex items-center justify-center gap-[6px] z-10">
                <MdBookmarkRemove
                  className="relative top-[-1px]"
                  size={"18px"}
                />
                REMOVE
              </span>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default WishlistProduct;
