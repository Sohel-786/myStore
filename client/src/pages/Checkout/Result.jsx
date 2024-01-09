import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Result() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState(searchParams.get("success"));
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

            <div className="w-fit px-3 gap-1 flex justify-center items-center font-bold bg-[#ffd500] py-1 mt-3">
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
            <div className="w-fit px-3 gap-1 flex justify-center items-center font-bold bg-[#ffd500] py-1 mt-3">
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
