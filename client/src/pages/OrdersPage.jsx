import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import OrderBox from "../components/OrderBox";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { RiH1 } from "react-icons/ri";
import Loading from "../components/Loading";

function Orders() {
  const { orders } = useSelector((s) => s?.orderData);
  const [data, setData] = useState();
  const [showDetails, setShowDetails] = useState(true);

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  useEffect(() => {
    if (orders) {
      console.log("check");
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
                return <OrderBox key={nanoid(5)} data={el} />;
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

      {showDetails && <div className="">
        
        </div>}
    </UserLayout>
  );
}

export default Orders;
