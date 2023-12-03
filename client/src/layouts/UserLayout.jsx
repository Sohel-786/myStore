import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser, FaCartShopping } from "react-icons/fa6";
import { MdPersonAdd } from "react-icons/md";

function UserLayout({ children }) {
  return (
    <section className="w-full max-w-[1280px] mx-auto">
      <header className="flex z-30 max-w-[1280px] sticky justify-between items-center w-full px-5 py-1 border-b-2 border-gray-200 shadow-header">
        <div className="flex items-center gap-3 w-[60%]">
          <img
            src="https://classroom-react.netlify.app/assets/classroom.svg"
            alt="logo"
            className="w-36 aspect-auto"
          />
          <div className="bg-black rounded-[5px] flex items-center px-1 py-[6px] w-[80%]">
            <IoIosSearch size={"20px"} className="text-white mx-1 mt-[2px]" />
            <input
              className="bg-transparent w-[95%] text-white border-none outline-none"
              type="text"
              placeholder="Search for Products, Brands and More"
            />
          </div>
        </div>

        <div>
          <span
            type="button"
            className="border-2 flex items-center gap-1 relative shadow-logBtn border-black rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-800 before:-z-10 before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base"
          >
            <FaCartShopping size={"18px"} /> Cart
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            type="button"
            className="border-2 flex items-center gap-1 relative shadow-logBtn border-black rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-black before:-z-10 before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base"
          >
            <FaRegCircleUser size={"18px"} /> Login
          </span>
          <span
            type="button"
            className="border-2 flex items-center gap-1 relative shadow-logBtn border-black rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-black before:-z-10 before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base"
          >
            <MdPersonAdd size={"18px"} /> Sign Up
          </span>
        </div>
      </header>
      <div className="relative -top-20 z-[1]">
        <img src="/assets/main.jpg" alt="Front Image" />       
      </div>
    </section>
  );
}

export default UserLayout;
