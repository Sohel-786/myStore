import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AddOrder, deleteOrder } from "../../redux/slices/orderSlice";
import { emptyBag } from "../../redux/slices/authSlice";

function Result() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState(searchParams.get("success"));
  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orderId) {
      scrollTo({
        top: 0,
        behavior: "smooth",
      });

      navigate("/");
    }

    if (result === "true") {
      handleAddOrder();
    } else {
      handleRemoveOrder();
    }

    let id = setTimeout(() => {
      if (result === "true") {
        scrollTo({
          top: 0,
          behavior: "smooth",
        });

        navigate("/user/orders");
      } else {
        scrollTo({
          top: 0,
          behavior: "smooth",
        });

        navigate("/user/bag");
      }
    }, 4000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  function handleRemoveOrder() {
    dispatch(deleteOrder(orderId));
  }

  async function handleAddOrder() {
    await dispatch(AddOrder(orderId));
    dispatch(emptyBag());
  }

  return (
    result && (
      <>
        {result === "true" ? (
          <div className="w-full min-h-[90vh] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-semibold font-Nova tracking-wide text-[#35be35]">
              Payment Successful!
            </h1>
            <img
              src="/assets/successgif.gif"
              alt="Success"
              className="h-[350px] aspect-auto my-4"
            />
            <p className="font-bold font-Roboto tracking-wider text-gray-500">
              Thank you for shopping from Us
            </p>

            <div className="w-fit px-3 gap-1 flex items-center font-bold bg-[#ffd500] py-1 mt-3">
              <h1>Redirecting you to the Order page...</h1>
              <img
                src="/assets/loadingGif.gif"
                alt="Loading"
                className="w-[30px] h-[30px]"
              />
            </div>
          </div>
        ) : (
          <div className="w-full min-h-[90vh] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-semibold font-Nova tracking-wide text-[#f43333]">
              Payment Failed!
            </h1>
            <img
              src="/assets/failed.gif"
              alt="failed"
              className="h-[350px] aspect-auto my-4"
            />
            <p className="font-bold font-Roboto tracking-wider text-gray-500">
              Your payment failed
            </p>
            <div className="w-fit px-3 gap-1 flex items-center font-bold bg-[#ffd500] py-1 mt-3">
              <h1>Redirecting you to the bag page...</h1>
              <img
                src="/assets/loadingGif.gif"
                alt="Loading"
                className="w-[30px] h-[30px]"
              />
            </div>
          </div>
        )}
      </>
    )
  );
}

export default Result;
