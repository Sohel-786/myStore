import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersforAdmin } from "../../redux/slices/orderSlice";
import Loading from "../../components/Loading";
import OrderBoxAdmin from "../../components/OrderBoxAdmin";
import { nanoid } from "nanoid";
import { enableBodyScroll } from "body-scroll-lock";
import { IoClose } from "react-icons/io5";
import SummaryProduct from "../../components/Product/SummaryProduct";

function Dashboard() {
  const [orders, setOrders] = useState(null);
  const dispatch = useDispatch();
  const { adminOrders } = useSelector((s) => s.orderData);
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState();

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  function handleDetails(data) {
    setDetails(data);
  }

  useEffect(() => {
    dispatch(getOrdersforAdmin());
  }, []);

  useEffect(() => {
    if (adminOrders) {
      let temp = adminOrders.filter((el) => {
        if (el.isProcessing) {
          return el;
        }
      });
      setOrders(temp);
    }
  }, [adminOrders]);

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  function handleDetails(data) {
    setDetails(data);
  }

  return (
    <AdminLayout>
      <div className="w-full flex flex-col gap-4 px-7 py-5">
        {orders ? (
          orders.length > 0 ? (
            orders.map((el) => {
              if (el.isProcessing) {
                return (
                  <OrderBoxAdmin
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
              You Don't Have Any Order to Deliver!
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>

      {showDetails && (
        <div className="flex justify-center items-center fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.32)] z-[60]">
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
                return <SummaryProduct key={nanoid(5)} el={el} />;
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
    </AdminLayout>
  );
}

export default Dashboard;
