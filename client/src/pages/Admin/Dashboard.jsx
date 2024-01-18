import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersforAdmin } from "../../redux/slices/orderSlice";
import Loading from "../../components/Loading";
import OrderBoxAdmin from "../../components/OrderBoxAdmin";
import { nanoid } from "nanoid";

function Dashboard() {
  const [orders, setOrders] = useState(null);
  const dispatch = useDispatch();
  const { adminOrders } = useSelector((s) => s.orderData);

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

  function toggleDetails(){

  }

  function handleDetails(){

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
    </AdminLayout>
  );
}

export default Dashboard;
