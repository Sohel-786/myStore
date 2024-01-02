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
                                <div className="">
                                    <img src={el.product.thumbnail.secure_url} alt="" />
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
