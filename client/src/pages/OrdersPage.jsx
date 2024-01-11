import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import OrderBox from "../components/OrderBox";

function Orders() {
    const { orders } = useSelector((s) => s?.orderData);

  return <UserLayout>
      {
        orders.map((el) => {
          return <OrderBox data={el} />
        })
      }
  </UserLayout>;
}

export default Orders;
