import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import CommonDrawer from "../components/CommonDrawer";
import WishlistProduct from "../components/Product/WishlistProduct";
import { useSelector } from "react-redux";
import axiosInstance from "../config/axiosInstance";
import { nanoid } from "nanoid";

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
      <div className="flex px-28 py-8 max-w-[1280px] relative mx-auto">
        <CommonDrawer />

        <ul className="w-full flex gap-4 mt-2">
          {wishlist ? (
            <>
              {wishlist.length === 0 ? (
                <div className="w-full h-[70vh] flex justify-center items-center text-xl font-semibold">
                  <h1 className="text-gray-400">Empty</h1>
                </div>
              ) : (
                wishlist.map((el) => {
                  return <WishlistProduct key={nanoid(4)} data={el} />;
                })
              )}
            </>
          ) : (
            <div className="h-[70vh] w-full flex justify-center items-center">
              <img
                src="/assets/loadingGif.gif"
                alt="Loading..."
                className="w-[60px] max-h-[60px]"
              />
            </div>
          )}
        </ul>

      </div>
    </UserLayout>
  );
}

export default WishlistPage;
