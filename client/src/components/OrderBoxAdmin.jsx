import { nanoid } from "nanoid";
import { disableBodyScroll } from "body-scroll-lock";
import { useDispatch } from "react-redux";
import { updateStatusOrder } from "../redux/slices/orderSlice";
import { useLocation } from "react-router-dom";

function OrderBoxAdmin({ data, handleDetails, toggle }) {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <div
      className={`w-full rounded-[10px] ${
        location.pathname === "/history" ? "bg-green-100" : "bg-slate-200"
      } px-5 py-4`}
    >
      <h1
        className={`font-Slab font-bold text-base mb-[10px] text-gray-700 tracking-wide`}
      >
        #Order : {data._id}
      </h1>
      <div className="w-full flex gap-3">
        <div className="w-[60%] overflow-hidden gap-2 flex-wrap flex ml-2 mb-3">
          {data.orderItems.map((el) => {
            return (
              <div
                key={nanoid(4)}
                className="w-[13%] h-[80px] flex justify-center items-center rounded-[5px] overflow-hidden flex-wrap"
                style={{
                  backgroundImage: `url(${el.product.thumbnail.secure_url})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            );
          })}
        </div>

        <div className="flex flex-col px-3 relative">
          <p className="text-right font-black absolute right-0 top-[-35px]">
            Ordered On :{" "}
            <span className="text-pink-700 font-Mukta text-lg">
              {data.createdAt.slice(0, 10)}
            </span>{" "}
            {location.pathname === "/history" && (
              <>
                &nbsp;&nbsp; Delivered On :{" "}
                <span className="text-pink-700 font-Mukta text-lg">
                  {data.updatedAt.slice(0, 10)}
                </span>
              </>
            )}
          </p>

          <h1 className="flex items-center">
            Name :{" "}
            <span className="font-bold text-sky-600 ml-1">
              {data.shippingAddress.name}
            </span>
          </h1>

          <h1 className="mt-1">
            Phone :
            <span className="font-bold text-sky-600 tracking-wider ml-1">
              {data.shippingAddress.phone}
            </span>{" "}
          </h1>

          <h1 className="mt-1 flex flex-col">
            <span>Address :</span>
            <span className="font-Slab text-green-800 tracking-wider mt-1">
              <span className="capitalize break-words">
                {data.shippingAddress.address}.
              </span>
              <br />
              <span>{data.shippingAddress.state}</span>,{" "}
              <span className="capitalize">{data.shippingAddress.city}</span>-
              <span>{data.shippingAddress.postal}.</span>
              <br />
              <span className="capitalize">{data.shippingAddress.country}</span>
            </span>
          </h1>
        </div>
      </div>
      <div className="w-full flex items-center px-2 gap-5 relative">
        {location.pathname === "/history" ? (
          <span className="border-[1px] bg-black py-2 flex items-center justify-center gap-[6px] relative border-white px-3 font-semibold font-Mukta tracking-wide text-sm text-white">
            Delivered
          </span>
        ) : (
          <>
            <span className="border-[1px] bg-black py-2 flex items-center justify-center gap-[6px] relative border-white cursor-wait px-3 font-semibold font-Mukta tracking-wide text-sm text-white">
              In Process
            </span>

            <button
              type="button"
              onClick={() => {
                dispatch(updateStatusOrder(data._id));
              }}
              className="border-[1px] border-[#d4d5d9] py-2 bg-white flex items-center justify-center gap-[6px] relative hover:border-black cursor-pointer px-3 font-semibold font-Mukta tracking-wide text-sm hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-950 before:transition-all before:ease-in-out hover:before:right-0 before:z-[5]"
            >
              <span className="flex items-center justify-center gap-[6px] z-10">
                Update Status
              </span>
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => {
            disableBodyScroll(document);
            handleDetails(data);
            toggle();
          }}
          className="border-[1px] border-[#d4d5d9] py-2 bg-white flex items-center justify-center gap-[6px] relative hover:border-black cursor-pointer px-3 font-semibold font-Mukta tracking-wide text-sm hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-950 before:transition-all before:ease-in-out hover:before:right-0 before:z-[5]"
        >
          <span className="flex items-center justify-center gap-[6px] z-10">
            View Details
          </span>
        </button>

        <h1 className="absolute right-3 text-sm font-Nova font-bold tracking-wide text-sky-500">
          Total Received: Rs.
          <span className="text-green-700 font-Nova text-xl font-black">
            {data.totalPrice}
          </span>{" "}
        </h1>
      </div>
    </div>
  );
}

export default OrderBoxAdmin;
