import { useLocation, useNavigate } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import CommonDrawer from "../components/CommonDrawer";
import { nanoid } from "nanoid";
import { AddressContext } from "../Context/AddressContext";

function CheckoutPage() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleAddressDrawer } = useContext(AddressContext);
  const { address } = useSelector((s) => s?.auth?.data);

  console.log(state);
  const [priceTotal, setPriceTotal] = useState({
    total: 0,
  });

  const [ orderDetails, setOrderDetails ] = useState({
    address : '',
    products : state
  })

  useEffect(() => {
    if (!state) {
      navigate("/user/bag");
    }
  });

  useEffect(() => {
    console.log("run");
    if (state) {
      handleTotal(state);
    }
  }, []);

  function handleTotal(arr) {
    let subtotal = 0;
    arr.forEach((el) => {
      subtotal += el.price;
    });

    setPriceTotal({
      total: subtotal,
    });
  }

  function handleChange(e){
    const { name, value, type, checked } = e.target;
    console.log(value, type, checked)
      setOrderDetails({
        ...orderDetails,
        [name] : value
    })
  }

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
                      <span className="capitalize font-Slab text-[#2d922d]">
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

          <div className="flex w-full flex-col mt-5 border-[1px] border-black py-4 gap-7 bg-white">
            {address.map((el, i) => {
              return (
                <label key={nanoid(5)} className="flex items-start gap-2 px-3">
                  <input
                    type="radio"
                    name={`address`}
                    value={JSON.stringify({
                      address : el.address,
                      state : el.state,
                      city : el.city,
                      postal : el.postal,
                      country : el.country
                    })}
                    className="mt-1"
                    onChange={handleChange}
                    checked={}
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
                </label>
              );
            })}
          </div>

          <div className="w-full">
            <button
              aria-label="Add New Address"
              style={{
                userSelect: "none",
              }}
              onClick={toggleAddressDrawer}
              className="bg-black w-[40%] relative mt-3 flex justify-center text-[16px] font-bold font-Nova text-white hover:text-black border-[2px] border-black before:absolute before:bg-white before:left-0 before:top-0 before:bottom-0 before:transition-all before:ease-in-out before:hover:right-0 before:rounded-md before:content-[''] before:right-[100%] before:z-[2]"
            >
              <span className="z-[6] border-2 border-black rounded-md w-full py-[3px] h-full">
                Add New Address
              </span>
            </button>
          </div>

          <div className="w-full font-Mukta border-t-[1px] flex flex-col gap-2 border-gray-500 bg-slate-100 px-3 pt-3 mt-3">
            <div className="flex justify-between items-center text-blue-700 font-semibold">
              <p className="text-gray-500 font-Nova">SubTotal</p>
              <p className="">Rs. {priceTotal.total}</p>
            </div>
            <hr />
            <div className="flex justify-between items-center text-blue-700 font-semibold">
              <p className="text-gray-500 font-Nova">Shipping</p>
              <p className="">Free</p>
            </div>
            <hr />
            <div className="flex justify-between items-center text-blue-700 font-semibold">
              <p className="text-gray-500 font-Nova">Total</p>
              <p className="">Rs. {priceTotal.total}</p>
            </div>
            <hr />

            <div className="w-full my-2 flex justify-center items-center">
              <button
                onClick={() => {
                  navigate("/user/bag/checkout");
                }}
                disabled = {!orderDetails.address ? true : false}
                className="w-[98%] border-[2px] py-1 flex items-center justify-center gap-[6px] relative border-[black] bg-black cursor-pointer px-3 font-semibold font-Mukta tracking-wide text-base text-white hover:text-black before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-white before:transition-all before:duration-300 before:ease-in-out hover:before:right-0 before:z-[5] disabled:cursor-not-allowed disabled:bg-slate-500 disabled:before:z-[-1] disabled:hover:text-white"
              >
                <span className="z-[10]">CHECKOUT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default CheckoutPage;
