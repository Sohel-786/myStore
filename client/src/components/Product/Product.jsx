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
} from "../../redux/slices/authSlice";
import { BagContext } from "../../Context/BagContext";
import { toast } from "react-toastify";
import { getUserDetails } from "../../redux/slices/authSlice";
import { WishlistContext } from "../../Context/WishListContext";
import { IoMdHeartEmpty } from "react-icons/io";

function Product({ data, wish }) {
  const [showDetails, setShowDetails] = useState(false);
  const { handleBag } = useContext(BagContext);
  const { handleWishList } = useContext(WishlistContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bagRef = useRef([]);
  const wishRef = useRef([]);
  const { bag, wishList } = useSelector((s) => s?.auth);

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
    for (let i = 0; i < bag.length; i++) {
      if (bag[i].productId === _id) {
        toast.success("Product Is Already In Bag", {
          theme: "colored",
          autoClose: 1500,
          hideProgressBar: true,
        });
        handleBag();

        if (fromWish) {
          handleWishList();
        }
        return;
      }
    }
    const res = await dispatch(addToBag(_id));

    if (fromWish) {
      await dispatch(removeFromWishlist(_id));
      handleWishList();
    }
    handleBag();
  }

  async function handleWishlistAdd() {
    for (let i = 0; i < wishList.length; i++) {
      if (wishList[i].productId === _id) {
        toast.success("Product Is Already In WishList", {
          theme: "colored",
          autoClose: 1500,
          hideProgressBar: true,
        });
        handleWishList();
        return;
      }
    }
    const res = await dispatch(addToWishlist(_id));
    handleWishList();
  }

  async function handleWishlistRemove() {
    const res = await dispatch(removeFromWishlist(_id));
  }

  return (
    <li
      className="w-[210px] max-h-[401.975px] flex flex-col cursor-pointer hover:shadow-product relative z-[2]"
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
          scrollTo({
            top: 0,
            behavior: "smooth",
          });
          navigate(`/product-details/${_id}`, { state: data });
        }
      }}
    >
      <div className="h-[280px] bg-gray-400 w-full">
        <img src={thumbnail.secure_url} alt={name} className="w-full h-full" />
      </div>
      {sale === "YES" && (
        <div className="absolute bg-black text-white px-[6px] py-[2px] rounded-xl text-[8px] tracking-wider font-Roboto font-semibold top-1 left-1">
          <p>SALE</p>
        </div>
      )}
      {showDetails && (
        <div className="mb-3 px-[10px] min-h-[83.9873px] absolute w-full bg-white bottom-[40px] z-[4]">
          <div className="flex flex-col py-4 gap-2">
            {!wish && (
              <span
                ref={bagRef}
                type="button"
                onClick={() => {
                  handleBagAdd(false);
                }}
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
            )}

            {wish && (
              <span
                ref={bagRef}
                type="button"
                onClick={() => {
                  handleBagAdd(true);
                }}
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
            )}

            {!wish && (
              <span
                ref={wishRef}
                type="button"
                onClick={handleWishlistAdd}
                className="border-[1px] border-[#d4d5d9] py-2 flex items-center justify-center gap-[6px] relative hover:border-black cursor-pointer px-3 font-semibold font-Mukta tracking-wide text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-950 before:transition-all before:ease-in-out hover:before:right-0 before:z-[5]"
              >
                <span className="flex items-center justify-center gap-[6px] z-10">
                  <IoMdHeartEmpty
                    className="relative top-[-1px]"
                    size={"18px"}
                  />
                  WISHLIST
                </span>
              </span>
            )}
            {wish && (
              <span
                ref={wishRef}
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
            )}
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
