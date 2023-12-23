import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import UserLayout from "../layouts/UserLayout";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const items = [
    <img
      className="w-full h-full rounded-lg"
      src="/assets/1.jpg"
      role="presentation"
    />,
    <img
      className="w-full h-full rounded-lg"
      src="/assets/2.jpg"
      role="presentation"
    />,
    <img
      className="w-full h-full rounded-lg"
      src="/assets/3.jpg"
      role="presentation"
    />,
    <img
      className="w-full h-full rounded-lg"
      src="/assets/4.jpg"
      role="presentation"
    />,
    <img
      className="w-full h-full rounded-lg"
      src="/assets/5.jpg"
      role="presentation"
    />,
  ];

  return (
    <UserLayout>
      <div className="absolute top-0 z-[-1] max-w-[1480px]">
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
            <IoMdSearch size={"30px"} />
          </span>
        </div>
      </div>
      <div className="bg-white w-full">
        <div className="w-[70%] py-4 mx-auto relative -top-10 bg-white rounded-t-3xl">
          <ul className="flex justify-center items-center gap-8 font-Roboto font-semibold tracking-wide">
            <li className="relative font-bold pb-1 cursor-pointer before:absolute before:h-1 before:w-0 before:bottom-0 before:bg-black hover:before:w-full focus:before:w-full hover:before:duration-200 before:ease-in before:duration-300 hover:scale-110 transition-all duration-200">
              Home
            </li>

            <li className="h-full text-gray-400 text-2xl relative top-[-2px]">
              |
            </li>

            <li onClick={() => {
              navigate('/all-products')
            }} className="relative font-bold pb-1 cursor-pointer before:absolute before:h-1 before:w-0 before:bottom-0 before:bg-black hover:before:w-full focus:before:w-full hover:before:duration-200 before:ease-in before:duration-300 hover:scale-110 transition-all duration-200">
              All Products
            </li>
            <li className="h-full text-gray-400 text-2xl relative top-[-2px]">
              |
            </li>
            <li className="relative font-bold pb-1 cursor-pointer before:absolute before:h-1 before:w-0 before:bottom-0 before:bg-black hover:before:w-full focus:before:w-full hover:before:duration-200 before:ease-in before:duration-300 hover:scale-110 transition-all duration-200">
              Men
            </li>
            <li className="h-full text-gray-400 text-2xl relative top-[-2px]">
              |
            </li>
            <li className="relative font-bold pb-1 cursor-pointer before:absolute before:h-1 before:w-0 before:bottom-0 before:bg-black hover:before:w-full focus:before:w-full hover:before:duration-200 before:ease-in before:duration-300 hover:scale-110 transition-all duration-200">
              Women
            </li>
            <li className="h-full text-gray-400 text-2xl relative top-[-2px]">
              |
            </li>
            <li className="relative font-bold pb-1 cursor-pointer before:absolute before:h-1 before:w-0 before:bottom-0 before:bg-black hover:before:w-full focus:before:w-full hover:before:duration-200 before:ease-in before:duration-300 hover:scale-110 transition-all duration-200">
              Kids
            </li>
          </ul>
        </div>

        <div className="flex w-full h-[400px] px-[50px] mb-12">
          <div className="flex flex-col w-[50%] justify-center pl-[20px] gap-2">
            <h1 className="text-black font-Slab text-[45px]">
              Best Fashion Collection
            </h1>
            <p className="font-Nova font-black text-gray-500">
              What you wear is how you present yourself to the world, especially
              today, when human contacts are so quick. Fashion is instant
              language.
            </p>

            <div className="w-fit bg-black relative mt-3 z-[1] before:absolute before:bg-white before:left-0 before:top-0 before:bottom-0 before:transition-all before:duration-300 before:ease-in-out before:hover:right-0 before:rounded-md before:content-[''] before:right-[100%] before:z-[2]">
              <button className="w-fit relative text-white z-10 font-Roboto tracking-wide font-black px-5 py-2 cursor-pointer rounded-md  border-2 border-black hover:text-black ">
                EXPLORE SHOP COLLECTION
              </button>
            </div>
          </div>

          <div className="w-[50%] flex justify-center pl-[50px] pr-[20px]">
            <AliceCarousel
              disableButtonsControls={true}
              infinite={true}
              disableDotsControls={true}
              animationDuration={500}
              items={items}
              autoPlay={true}
              autoPlayInterval={3000}
            />
          </div>
        </div>
      </div>

      
    </UserLayout>
  );
}

export default LandingPage;
