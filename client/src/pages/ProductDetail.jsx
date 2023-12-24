import { useLocation } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { RiCloseCircleFill } from "react-icons/ri";

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
      <div className="grid grid-cols-2 px-28 py-8 w-full">
        <div
          onMouseOver={handleBlur}
          onMouseOut={handleBlurRemove}
          className="px-5 relative flex justify-center items-center"
        >
          <div id="profileImage" className="w-full"></div>
          <img
            src={state.thumbnail.secure_url}
            alt="Product Image"
            className="rounded-md"
          />
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

        <div className="flex flex-col pl-3 pt-2">
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

          <p className="mt-1 text-green-600 font-bold text-sm">inclusive of all taxes</p>
        </div>
      </div>
    </UserLayout>
  );
}

export default ProductDetail;
