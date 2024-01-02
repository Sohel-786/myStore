import { useLocation, useNavigate } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import CommonDrawer from "../components/CommonDrawer";
import { nanoid } from "nanoid";

function CheckoutPage() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(state);

  useEffect(() => {
    if (!state) {
      navigate("/user/bag");
    }
  });

  return (
    <UserLayout>
      <div className="flex w-full mt-8 pl-32 pr-20">
        <CommonDrawer />
        <div className="w-[50%] flex flex-col">
          <h1 className="text-xl font-OpenSans font-semibold tracking-wide text-gray-800">
            Bag Summary
          </h1>

            <ul className="w-full flex flex-col mt-4 ml-1 border-[1px] border-zinc-300 p-5">
                {
                    state.map((el) => {
                        return (
                            <li key={nanoid(5)} className="flex rounded-md overflow-hidden w-full">
                                <div className="w-[16%] h-[120px]">
                                    <img src={el.product.thumbnail.secure_url} alt={el.product.name} className="w-full aspect-auto max-h-full" />
                                </div>

                                <div className="w-[84%] flex flex-col px-5 py-1">
                                    <h1 className="capitalize font-semibold text-blue-600">{el.product.name}</h1>
                                    <p className="capitalize font-bold font-Nova tracking-wide">{el.product.brand}</p>
                                    <div className="w-full flex gap-6 mt-1 font-Roboto font-semibold ">
                                        <h1>Pieces : <span className="font-Slab text-gray-500">{el.quantity}</span></h1>

                                        <h1>Size : <span className="capitalize font-Slab text-gray-500">{el.size}</span></h1>

                                        <h1>Price : <span className="capitalize font-Slab text-gray-500">Rs.{el.product.sale === 'YES' ? Math.floor(el.product.price - (el.product.pricedrop / 100) * el.product.price) : el.product.price}</span></h1>
                                    </div>

                                    <h1 className="font-Roboto font-semibold">Total : <span className="capitalize font-Slab text-gray-500">Rs. {el.price}</span></h1>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
      </div>
    </UserLayout>
  );
}

export default CheckoutPage;
