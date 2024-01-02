import { useLocation, useNavigate } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CommonDrawer from "../components/CommonDrawer";
import { nanoid } from "nanoid";

function CheckoutPage() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { address } = useSelector((s) => s?.auth?.data);

  console.log(state);

  useEffect(() => {
    if (!state) {
      navigate("/user/bag");
    }
  });

  return (
    <UserLayout>
      <div className="flex w-full mt-8 pl-20 pr-14 gap-8">
        <CommonDrawer />
        <div className="w-[49%] flex flex-col">
          <h1 className="text-xl font-OpenSans font-semibold tracking-wide text-gray-800">
            Bag Summary
          </h1>

          <ul className="w-full flex flex-col mt-4 ml-1 border-[1px] border-zinc-300 p-5">
            {state.map((el) => {
              return (
                <li
                  key={nanoid(5)}
                  className="flex rounded-md overflow-hidden w-full"
                >
                  <div className="w-[18%] h-[120px]">
                    <img
                      src={el.product.thumbnail.secure_url}
                      alt={el.product.name}
                      className="w-full aspect-auto max-h-full"
                    />
                  </div>

                  <div className="w-[84%] flex flex-col pl-5 pr-2">
                    <h1 className="capitalize font-semibold text-blue-600">
                      {el.product.name}
                    </h1>
                    <p className="capitalize font-bold font-Nova tracking-wide">
                      {el.product.brand}
                    </p>
                    <div className="w-full flex gap-6 mt-1 font-Roboto font-semibold ">
                      <h1>
                        Pieces :{" "}
                        <span className="font-Slab text-gray-500">
                          {el.quantity}
                        </span>
                      </h1>

                      <h1>
                        Size :{" "}
                        <span className="capitalize font-Slab text-gray-500">
                          {el.size}
                        </span>
                      </h1>

                      <h1>
                        Price/1pc :{" "}
                        <span className="capitalize font-Slab text-gray-500">
                          Rs.
                          {el.product.sale === "YES"
                            ? Math.floor(
                                el.product.price -
                                  (el.product.pricedrop / 100) *
                                    el.product.price
                              )
                            : el.product.price}
                        </span>
                      </h1>
                    </div>

                    <h1 className="font-Roboto font-semibold mt-1">
                      Total :{" "}
                      <span className="capitalize font-Slab text-gray-500">
                        Rs. {el.price}
                      </span>
                    </h1>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="w-[51%] flex flex-col p-3 bg-[#f7f7ff]">
          <h1 className="text-xl font-Roboto font-semibold tracking-wide text-gray-800">
            Shipping address details
          </h1>
          <p className="text-slate-500 font-semibold tracking-wide">
            Complete your order by selecting address below
          </p>

          <div className="flex w-full flex-col mt-5 border-[1px] border-black py-4 gap-3 bg-white">
            {address.map((el, i) => {
              return (
                <lable className="flex items-start gap-2 px-3">
                  <input
                    type="radio"
                    name={`address`}
                    value={el}
                    className="mt-1"
                  />
                  <h1 className="font-Nova font-black capitalize pr-2 w-full">
                    <span className="capitalize break-words">
                      {el.address}.
                    </span>
                    <br />
                    <span>{el.state}</span>,{" "}
                    <span className="capitalize">{el.city}</span>-
                    <span>{el.postal}.</span>
                    <br />
                    <span className="capitalize">{el.country}</span>
                  </h1>
                </lable>
              );
            })}
          </div>

          <div className="w-full">
            <button
              aria-label="Add New Address"
              style={{
                userSelect: "none",
              }}
              className="bg-black w-[40%] relative mt-3 flex justify-center text-[16px] font-bold font-Nova text-white hover:text-black border-[2px] border-black before:absolute before:bg-white before:left-0 before:top-0 before:bottom-0 before:transition-all before:ease-in-out before:hover:right-0 before:rounded-md before:content-[''] before:right-[100%] before:z-[2]"
            >
              <span className="z-[6] border-2 border-black rounded-md w-full py-[3px] h-full">
                Add New Address
              </span>
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default CheckoutPage;
