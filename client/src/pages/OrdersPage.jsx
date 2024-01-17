import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import OrderBox from "../components/OrderBox";

function Orders() {
  const { orders } = useSelector((s) => s?.orderData);

  return (
    <UserLayout>
      <div className="flex w-[99%] gap-[20px] py-[30px] px-[40px] mx-auto">
        {orders.map((el) => {
          return <OrderBox data={el} />;
        })}
      </div>
    </UserLayout>
  );
}

export default Orders;
