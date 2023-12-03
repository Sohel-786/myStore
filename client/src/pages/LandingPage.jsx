import UserLayout from "../layouts/UserLayout";
import { IoMdSearch } from "react-icons/io";

function LandingPage() {
  return (
    <UserLayout>
      <div className="absolute top-0 z-[-1]">
        <img src="/assets/main.jpg" alt="Front Image" />
      </div>

      <div className="w-full bg-[#0000006f] h-[400px] flex flex-col justify-center items-center">
        <h1 className="text-white font-Nova text-[42px] font-black text-center">
          Shop Till You Drop <br /> You Ask it We Will Deliver It.
        </h1>
        <div className="bg-[#f7f7f7] w-[45%] rounded-[10px] overflow-hidden flex mt-4">
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            className="bg-transparent text-[#7f7f7f] pl-[20px] py-[15px] pr-1 text-[18px] leading-[20.7px] outline-none border-none w-[90%] font-semibold"
          />

          <span className="h-full flex justify-center items-center text-[#7f7f7f] hover:text-blue-500 border-l-[1.5px] w-[10%] hover:bg-gray-200 cursor-pointer">
            <IoMdSearch size={'30px'} />
          </span>
        </div>

        
      </div>
    </UserLayout>
  );
}

export default LandingPage;
