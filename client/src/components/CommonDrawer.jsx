import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import Drawer from "react-modern-drawer";

function CommonDrawer() {
  const navigate = useNavigate();

  const [backDrawer, setBackDrawer] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setBackDrawer(!backDrawer);
        }}
        className="fixed w-[50px] h-[48px] flex justify-center items-center cursor-pointer rounded-full bg-gray-200 hover:scale-110 transition-all duration-300 ease-in-out left-8 top-[150px]"
      >
        <FaAngleRight size={"22px"} className="text-gray-500" />
      </div>

      <div
        onClick={() => {
          scrollTo({
            top: 0,
            behavior: "smooth",
          });
          navigate(-1);
        }}
        className="fixed w-[50px] h-[48px] flex justify-center items-center cursor-pointer rounded-full bg-gray-200 hover:scale-110 transition-all duration-300 ease-in-out left-8 rotate-180"
      >
        <FaAngleRight size={"22px"} className="text-gray-500" />
      </div>

      <Drawer
        open={backDrawer}
        onClose={() => {
          setBackDrawer(!backDrawer);
        }}
        direction="left"
        size={"120px"}
        overlayOpacity={0}
      >
        <div className="h-full w-full flex justify-center items-center">
          <ul className="flex flex-col gap-6">
            <li
              onClick={() => {
                scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                navigate("/men");
              }}
              className="w-[80px] h-[78px] flex justify-center items-center overflow-hidden rounded-full border-[1px] cursor-pointer hover:border-pink-500 border-gray-300"
            >
              <img
                src="/assets/man.jpg"
                alt="Man"
                className="max-w-full max-h-full"
              />
            </li>
            <li
              onClick={() => {
                scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                navigate("/women");
              }}
              className="w-[80px] h-[78px] flex justify-center items-center overflow-hidden rounded-full border-[1px] cursor-pointer hover:border-pink-500 border-gray-300"
            >
              <img
                src="/assets/women.jpg"
                alt="Man"
                className="w-full max-h-full"
              />
            </li>
            <li
              onClick={() => {
                scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                navigate("/kids");
              }}
              className="w-[80px] h-[78px] flex justify-center items-center overflow-hidden rounded-full border-[1px] cursor-pointer hover:border-pink-500 border-gray-300"
            >
              <img
                src="/assets/kids.jpg"
                alt="Man"
                className="max-w-full max-h-full"
              />
            </li>
            <li
              onClick={() => {
                scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                navigate("/all-products");
              }}
              className="w-[80px] h-[78px] flex justify-center items-center overflow-hidden rounded-full border-[1px] cursor-pointer hover:border-pink-500 border-gray-300 bg-black"
            >
              <img
                src="/assets/all.jpg"
                alt="Man"
                className="max-w-[75%] max-h-[75%]"
              />
            </li>
          </ul>
        </div>
      </Drawer>
    </>
  );
}

export default CommonDrawer;
