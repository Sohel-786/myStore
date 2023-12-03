import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser, FaCartShopping } from "react-icons/fa6";
import { MdPersonAdd } from "react-icons/md";
import Button from "../components/Button";

function UserLayout({ children }) {
  return (
    <section className="w-full max-w-[1280px] mx-auto">
      <header className="flex z-30 max-w-[1280px] sticky justify-between items-center w-full px-5 py-1 shadow-header bg-[#00000056]">
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
          <Button text={'Cart'}><FaCartShopping size={"18px"} /></Button>
        </div>

        <div className="flex items-center gap-3">
          <Button text={'Login'}> <FaRegCircleUser size={"18px"} /> </Button>
          <Button text={'Sign Up'}> <MdPersonAdd size={"18px"} /> </Button>
        </div>
      </header>
      {children}
    </section>
  );
}

export default UserLayout;
