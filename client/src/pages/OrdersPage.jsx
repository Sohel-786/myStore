import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";

function Orders() {
    const { orders } = useSelector((s) => s?.orderData);

  return <UserLayout></UserLayout>;
}

export default Orders;
