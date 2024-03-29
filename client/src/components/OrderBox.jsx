import { nanoid } from "nanoid";
import { disableBodyScroll } from "body-scroll-lock";
import { useLocation } from "react-router-dom";

function OrderBox({ data, handleDetails, toggle }) {
  const location = useLocation();
  return (
    <div className={`w-[48%] rounded-[10px] ${location.pathname === '/user/purchased' ? "bg-green-200" : "bg-slate-200" }  px-5 py-4`}>
      <h1 className="font-Slab font-bold text-base mb-[10px] text-gray-700 tracking-wide">
        #Order : {data._id}
      </h1>
      <div className="w-full overflow-hidden gap-2 flex ml-2 mb-3">
        {data.orderItems.map((el) => {
          return (
            <div
              key={nanoid(4)}
              className="w-[20%] min-w-[48.6377px] h-[90px] flex justify-center items-center rounded-[5px] overflow-hidden"
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
      <div className="w-full flex items-center px-2 gap-5 relative">
        {location.pathname === "/user/purchased" ? (
          <span className="border-[1px] bg-black py-2 flex items-center justify-center gap-[6px] relative border-white px-3 font-semibold font-Mukta tracking-wide text-sm text-white">
            Deliverd
          </span>
        ) : (
          <span className="border-[1px] bg-black py-2 flex items-center justify-center gap-[6px] relative border-white cursor-wait px-3 font-semibold font-Mukta tracking-wide text-sm text-white">
            In Process
          </span>
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
          Total Paid: Rs.
          <span className="text-green-700 font-Nova text-xl font-black">
            {data.totalPrice}
          </span>{" "}
        </h1>
      </div>
    </div>
  );
}

export default OrderBox;
