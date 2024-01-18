import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import OrderBox from "../components/OrderBox";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { RiH1 } from "react-icons/ri";
import Loading from "../components/Loading";
import { enableBodyScroll } from "body-scroll-lock";
import { IoClose } from "react-icons/io5";
import SummaryProduct from "../components/Product/SummaryProduct";

function Orders() {
  const { orders } = useSelector((s) => s?.orderData);
  const [data, setData] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails]= useState();

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  function handleDetails(data){
    setDetails(data);
  }

  useEffect(() => {
    if (orders) {
      let temp = orders.filter((el) => {
        if (el.isProcessing) {
          return el;
        }
      });
      setData(temp);
    }
  }, [orders]);

  return (
    <UserLayout>
      {data ? (
        <div className="flex w-[99%] gap-[20px] py-[30px] px-[40px] mx-auto">
          {data.length > 0 ? (
            data.map((el) => {
              if (el.isProcessing) {
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
              You Don't Have Any Order In Process!
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}

      {showDetails && (
        <div className="absolute flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.32)] z-[60]">
          <div className="w-[80%] h-[90%] bg-white relative flex py-4 px-5">
            <IoClose size={'40px'} className="absolute right-1 top-1 cursor-pointer" onClick={() => {
              enableBodyScroll(document);
              setDetails(null);
              toggleDetails();
            }} />

              <ul className="w-[55%] border-r-[1.5px] border-slate-200">
                  {
                    details.orderItems.map((el) => {
                      return <SummaryProduct key={nanoid(5)} el={el}/>
                    })
                  }
              </ul>

              <div className="w-[45%]">

              </div>

          </div>
        </div>
      )}
    </UserLayout>
  );
}

export default Orders;
