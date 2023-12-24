import { useLocation } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaChevronRight } from "react-icons/fa";
import { nanoid } from "nanoid";
import { PiHandbagFill } from "react-icons/pi";
import { IoHeartSharp } from "react-icons/io5";
import { BiDetail } from "react-icons/bi";

function ProductDetail() {
  const { state } = useLocation();

  function handleFullImageView() {
    disableBodyScroll(document);
    const fullView = document.getElementById("fullView");
    fullView.style.display = "flex";
  }

  function handleFullViewclose() {
    enableBodyScroll(document);
    const fullView = document.getElementById("fullView");
    fullView.style.display = "none";
  }

  function handleBlur() {
    const profileBtn = document.querySelector("#profileBtn");
    const profileImage = document.querySelector("#profileImage");
    profileImage.style.filter = "blur(3px)";
    profileBtn.style.display = "block";
  }

  function handleBlurRemove() {
    const profileBtn = document.querySelector("#profileBtn");
    const profileImage = document.querySelector("#profileImage");
    profileImage.style.filter = "blur(0)";
    profileBtn.style.display = "none";
  }

  return (
    <UserLayout>
      <div className="flex px-28 py-8 max-w-[1280px]">
        <div
          onMouseOver={handleBlur}
          onMouseOut={handleBlurRemove}
          className="px-5 w-[50%] relative flex justify-center items-center"
        >
          <div id="profileImage" className="w-full">
            <img
              src={state.thumbnail.secure_url}
              alt="Product Image"
              className="rounded-md max-w-full max-h-[577.089px]"
            />
          </div>

          <div id="profileBtn" className="hidden absolute flex-col gap-2">
            <button
              aria-label="See the Image on Full Screen"
              onClick={handleFullImageView}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 font-bold text-sm border-[2px] border-stone-400 hover:scale-110 transition-all duration-200 ease-in-out hover:bg-cyan-400 hover:text-white hover:border-transparent"
            >
              VIEW
            </button>
          </div>

          <div
            id="fullView"
            className="fixed top-0 right-0 left-0 bottom-0 hidden z-50 bg-black flex-col justify-center items-center"
          >
            <RiCloseCircleFill
              onClick={handleFullViewclose}
              size={"50px"}
              className="absolute top-3 right-8 cursor-pointer text-red-600 hover:text-red-800 bg-black border-[2px] border-transparent rounded-full hover:border-white"
            />
            <img
              className="max-h-full aspect-auto"
              src={state.thumbnail.secure_url}
              alt="Preview Profile Image"
            />
          </div>
        </div>

        <div className="flex w-[50%] flex-col pl-3 pt-2">
          <h1 className="capitalize font-Nova text-2xl font-bold">
            {state.brand}
          </h1>
          <h1 className="capitalize font-Roboto mt-2 text-xl tracking-wide text-gray-500">
            {state.name}
          </h1>
          <hr className="mt-3 border-[0.9px]" />
          <p className="mt-2 text-2xl">
            <span className="font-Slab">
              ₹{Math.floor(state.price - (state.pricedrop / 100) * state.price)}
            </span>
            <span className="font-Roboto ml-3 text-[20px] text-gray-500">
              MRP <span className="line-through">₹{state.price}</span>
            </span>

            <span className="font-bold text-xl font-Slab tracking-wide ml-3 text-orange-400">
              ({state.pricedrop}% OFF)
            </span>
          </p>

          <p className="mt-1 text-green-600 font-bold text-sm">
            inclusive of all taxes
          </p>

          <div className="mt-5 flex flex-col w-full">
            <h1 className="font-bold tracking-wide font-Mukta text-lg flex items-center">
              AVAILABLE SIZES{" "}
              <span className="ml-1 text-pink-500">
                <FaChevronRight size={"14px"} />
              </span>
            </h1>

            <ul className="w-full flex mt-3 gap-5 pl-1">
              {state.availableSizes.map((el) => {
                return (
                  <li
                    key={nanoid(5)}
                    className="w-[50px] uppercase h-[48px] hover:border-pink-500 flex justify-center items-center text-sm font-bold rounded-full border-[1px] border-slate-400"
                  >
                    {el}
                  </li>
                );
              })}
            </ul>

            <div className="w-full flex mt-8 gap-5">
              <button className="flex justify-center font-semibold overflow-hidden shadow-logBtn font-Roboto tracking-wide text-white text-lg w-[60%] bg-[#ff3e6c] py-[10px] border-[1px] border-[#ff3e6c] rounded-md relative before:absolute before:right-full before:top-0 before:bottom-0 before:left-0 hover:before:right-0 before:transition-all before:ease-in-out before:z-[3] before:bg-[#ab3effd8] hover:border-white">
                <span className="z-[5] flex justify-center items-center gap-3">
                  <PiHandbagFill size={"22px"} /> ADD TO BAG
                </span>
              </button>
              <button className="flex justify-center font-semibold overflow-hidden shadow-logBtn font-Roboto tracking-wide text-lg text-black hover:text-white w-[40%] bg-white py-[10px] border-[1px] border-[#3effdc] rounded-md relative before:absolute before:right-full before:top-0 before:bottom-0 before:left-0 hover:before:right-0 before:transition-all before:ease-in-out before:z-[3] before:bg-[black] hover:border-white">
                <span className="z-[5] flex justify-center items-center gap-3">
                  <IoHeartSharp size={"22px"} />
                  WISHLIST
                </span>
              </button>
            </div>

            <hr className="mt-6 border-[0.9px]" />

            <h1 className="font-bold font-Mukta text-lg flex items-center gap-2 mt-3">
              PRODUCT DETAILS <BiDetail />
            </h1>

            <p className="flex flex-col capitalize font-OpenSans text-base mt-5 leading-6">
              {state.description.split("$").map((el) => (
                <span>{el}</span>
              ))}
            </p>

            <h1 className="font-bold font-Mukta text-lg flex items-center gap-2 mt-3">
              DELIVERY OPTIONS <BiDetail />
            </h1>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default ProductDetail;
