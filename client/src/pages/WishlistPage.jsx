import { useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import CommonDrawer from "../components/CommonDrawer";

function WishlistPage() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(null);
  const { data } = useSelector((s) => s?.auth);

  useEffect(() => {
    if (data.wishlist) {
      getWishlistProducts(data.wishlist);
    }
  }, [data]);

  async function getWishlistProducts(arr) {
    let temp = [];
    arr.forEach((el) => {
      temp.push(el.productId);
    });
    const res = await axiosInstance.post("/user/getBag", {
      data: temp,
    });

    if (res?.data?.products) {
      setWishlist([...res.data.products]);
    }
  }
  return (
    <UserLayout>
      <div className="flex px-28 py-8 max-w-[1280px] relative">
        <CommonDrawer />


      </div>
    </UserLayout>
  );
}

export default WishlistPage;
