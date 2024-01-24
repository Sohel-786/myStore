import { useDispatch, useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import OrderBox from "../components/OrderBox";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { enableBodyScroll } from "body-scroll-lock";
import { IoClose } from "react-icons/io5";
import SummaryProduct from "../components/Product/SummaryProduct";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { getAllOrders } from "../redux/slices/orderSlice";

function Purchased() {
  const { orders } = useSelector((s) => s?.orderData);
  const [data, setData] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  function handleDetails(data) {
    setDetails(data);
  }

  useEffect(() => {
    dispatch(getAllOrders());
  }, [])

  useEffect(() => {
    if (orders) {
      let temp = orders.filter((el) => {
        if (!el.isProcessing) {
          return el;
        }
      });
      setData(temp);
    }
  }, [orders]);

  return (
    <UserLayout>
      {data ? (
        <div className="flex w-full flex-wrap gap-[20px] py-[30px] px-[40px]">
          {data.length > 0 ? (
            data.map((el) => {
              if (!el.isProcessing) {
                return (
                  <OrderBox
                    key={nanoid(5)}
                    data={el}
                    toggle={toggleDetails}
                    handleDetails={handleDetails}
                  />
                );
              }
            })
          ) : (
            <div className="py-4 px-3 shadow-bag font-bold font-Roboto w-full">
              You Haven't Purchased Anything Yet!
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}

      {showDetails && (
        <div className="fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.32)] z-[60]">
          <div className="w-[80%] h-[90%] bg-white relative flex py-4 px-5">
            <div className="p-2 absolute right-[-40px] top-[-0.2px] cursor-pointer bg-white">
              <IoClose
                size={"40px"}
                className=""
                onClick={() => {
                  enableBodyScroll(document);
                  setDetails(null);
                  toggleDetails();
                }}
              />
            </div>

            <ul className="w-[55%] border-r-[1.5px] border-slate-300 pt-3 overflow-y-scroll">
              {details.orderItems.map((el) => {
                return location.pathname === "/user/purchased" ? (
                  <div
                    key={nanoid(5)}
                    onClick={() => {
                      enableBodyScroll(document);
                      navigate(`/product-details/${el.productId}`);
                    }}
                    className="cursor-pointer select-none rounded-[8px] overflow-hidden border-[1.5px] hover:border-sky-400"
                  >
                    <SummaryProduct el={el} />
                  </div>
                ) : (
                  <SummaryProduct key={nanoid(5)} el={el} />
                );
              })}
            </ul>

            <div className="w-[45%] flex justify-center flex-col px-4 font-Nova">
              <h1 className="font-Roboto font-black tracking-wider text-right">
                #Order :{" "}
                <span className="font-Slab text-stone-600">{details._id}</span>
              </h1>

              <p className="text-right mt-2 font-black">
                Ordered On :{" "}
                <span className="text-pink-700 font-Mukta text-lg">
                  {details.createdAt.slice(0, 10)}
                </span>
              </p>

              <p className="text-right mt-2 font-black text-stone-500">
                Delivered On :{" "}
                <span className="text-blue-700 font-Mukta text-lg">
                  {details.updatedAt.slice(0, 10)}
                </span>
              </p>

              <h1 className="flex flex-col mt-3">
                Name :
                <span className="font-Slab text-sky-600 mt-2">
                  {details.shippingAddress.name}
                </span>
              </h1>

              <h1 className="mt-3 flex flex-col">
                Phone :
                <span className="font-Slab text-sky-600 tracking-wider mt-2">
                  {details.shippingAddress.phone}
                </span>{" "}
              </h1>

              <h1 className="mt-3 flex flex-col">
                <span>Address :</span>
                <span className="font-Slab text-green-800 tracking-wider mt-2">
                  <span className="capitalize break-words">
                    {details.shippingAddress.address}.
                  </span>
                  <br />
                  <span>{details.shippingAddress.state}</span>,{" "}
                  <span className="capitalize">
                    {details.shippingAddress.city}
                  </span>
                  -<span>{details.shippingAddress.postal}.</span>
                  <br />
                  <span className="capitalize">
                    {details.shippingAddress.country}
                  </span>
                </span>
              </h1>

              <h1 className="mt-3 font-Slab text-red-700">
                Total Paid :{" "}
                <span className="text-blue-600 text-2xl ml-1 font-serif font-black ">
                  ₹{details.totalPrice}
                </span>
              </h1>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}

export default Purchased;
