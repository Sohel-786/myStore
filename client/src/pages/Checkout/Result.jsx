import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Result() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState(searchParams.get("success"));
  return (
    result && (
      <>
        {result === "false" ? (
          <div className="w-full h-[90vh] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-semibold font-Nova tracking-wide text-[#35be35]">
              Payment Successful!
            </h1>
            <img src="" alt="" />
            <p className="font-bold font-Roboto tracking-wider text-gray-500">
              Thank you for shopping from Us
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </>
    )
  );
}

export default Result;
