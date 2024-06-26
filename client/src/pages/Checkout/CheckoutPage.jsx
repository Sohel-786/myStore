import { useLocation, useNavigate } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useContext, useEffect, useState } from "react";
import CommonDrawer from "../../components/CommonDrawer";
import { nanoid } from "nanoid";
import { AddressContext } from "../../Context/AddressContext";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../../config/axiosInstance";
import { isValidPhoneNumber } from "../../helpers/RegexMatcher";
import { MdCopyAll } from "react-icons/md";
import SummaryProduct from "../../components/Product/SummaryProduct";

function CheckoutPage() {
  const [checkedAddress, setCheckedAddress] = useState();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleAddressDrawer } = useContext(AddressContext);
  const { address } = useSelector((s) => s?.auth?.data);

  const [priceTotal, setPriceTotal] = useState({
    total: 0,
  });

  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    address: "",
    products: state,
  });

  useEffect(() => {
    if (!state) {
      scrollTo({
        top: 0,
        behavior: "smooth",
      });

      navigate("/user/bag");
    }
  }, []);

  useEffect(() => {
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

  function handleChange(e) {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  }

  function handleAddress(e) {
    const { name, value } = e.target;
    setCheckedAddress(value);
    const temp = JSON.stringify({
      address: address[value].address,
      state: address[value].state,
      city: address[value].city,
      postal: address[value].postal,
      country: address[value].country,
    });
    setOrderDetails({
      ...orderDetails,
      address: temp,
    });
  }

  async function handleCheckout() {
    if (!orderDetails.name || !orderDetails.address || !orderDetails.phone) {
      toast.error(
        "Please Provide all required shipping details to complete your order"
      );
      return;
    }

    if (!orderDetails.products) {
      toast.error("There are no product details available");
      return;
    }

    if (!isValidPhoneNumber(orderDetails.phone)) {
      toast.error("Please Provide Valid Phone Number");
      return;
    }

    try {
      const stripe = await loadStripe(
        "pk_test_51OVG8QSDl3fPhZfkYiYb41l9BKFY27d0bylewRlNjnAPaoIaKYb2FG4UDkaPFLR4kf1ZLWy4IHy6LkbehxPxxWqa00ogvVeugJ"
      );

      const res = await axiosInstance.post(
        "/payment/create-checkout-session",
        orderDetails
      );

      const result = stripe.redirectToCheckout({
        sessionId: res.data.session_id,
      });

      if ((await result).error) {
        console.log(result.error);
      }
    } catch (e) {
      toast.error("Something Went Wrong");
      return;
    }
  }

  return (
    <UserLayout>
      <div className="flex w-full mt-8 pl-20 pr-14 gap-8 mb-10">
        <CommonDrawer />
        <div className="w-[49%] flex flex-col">
          <h1 className="text-xl font-OpenSans font-semibold tracking-wide text-gray-800">
            Bag Summary
          </h1>

          <ul className="w-full flex flex-col mt-4 ml-1 border-[1px] border-zinc-300 p-5">
            {state.map((el) => {
              return <SummaryProduct key={nanoid(4)} el={el} />;
            })}
          </ul>
        </div>

        <div className="w-[51%] flex flex-col p-3 bg-[#eeeeff]">
          <h1 className="text-xl font-Roboto font-semibold tracking-wide text-gray-800">
            Shipping details
          </h1>
          <p className="text-slate-500 font-semibold tracking-wide">
            Complete your order by entering your name, phone number & selecting
            address below
          </p>

          <div className="w-full flex gap-3 mt-5">
            <div className="w-[50%]">
              <label
                htmlFor="name"
                className="block font-Roboto font-semibold leading-6"
              >
                Name
              </label>
              <div className="mt-2.5">
                <input
                  value={orderDetails.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="w-[50%]">
              <label
                htmlFor="phone"
                className="block font-Roboto font-semibold leading-6"
              >
                Phone Number
              </label>
              <div className="mt-2.5">
                <input
                  value={orderDetails.phone}
                  onChange={handleChange}
                  type="text"
                  name="phone"
                  id="phone"
                  className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col mt-5 border-[1px] border-black py-4 gap-7 bg-white">
            {address.length > 0 ? (
              address.map((el, i) => {
                return (
                  <label
                    key={nanoid(5)}
                    className="flex items-start gap-2 px-3"
                  >
                    <input
                      type="radio"
                      name={`address`}
                      value={i}
                      className="mt-1"
                      onChange={handleAddress}
                      checked={checkedAddress == i ? true : false}
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
              })
            ) : (
              <h1 className="pl-4 font-Nova italic text-gray-500">
                No Address Added Yet, Please Add Address
              </h1>
            )}
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

            <div className="w-full my-2 flex flex-col justify-center items-center">
              <h1 className="font-OpenSans font-semibold tracking-wide text-[#1a0080] leading-8 pl-2 mb-5 relative">
                This will be a <span className="text-green-600">Test Mode</span>{" "}
                checkout form, Please only use the card number provided below
                for successfull payment.{" "}
                <span className="bg-[#242222] flex justify-center items-center gap-4 py-1 px-3 rounded-sm text-[#cbcbcb] italic">
                  4000 0035 6000 0123{" "}
                  <MdCopyAll
                    title="Copy"
                    className="cursor-pointer hover:bg-white hover:text-black rounded-full px-1 absolute right-3"
                    size={"30px"}
                    onClick={() => {
                      navigator.clipboard.writeText("4000003560000123");
                      toast.success(`Card Number Copied To clipboard`, {
                        position: "bottom-right",
                        autoClose: 900,
                        theme: "colored",
                        hideProgressBar: true,
                      });
                    }}
                  />
                </span>
              </h1>
              <button
                onClick={handleCheckout}
                disabled={
                  !orderDetails.address
                    ? true
                    : !orderDetails.name
                    ? true
                    : !orderDetails.phone
                    ? true
                    : false
                }
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
