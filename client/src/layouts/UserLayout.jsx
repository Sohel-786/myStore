import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser, FaCartShopping } from "react-icons/fa6";
import { MdPersonAdd } from "react-icons/md";
import Button from "../components/Button";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import SignUp from "../components/SignUp";
import { useState } from "react";
import SignIn from "../components/SignIn";

function UserLayout({ children }) {
  const [isOpenSingUp, setOpenSignUp] = useState(false);
  const [isOpenSingIn, setOpenSignIn] = useState(false);

  const toggleDrawerSignIn = () => {
    setOpenSignIn((prevState) => !prevState);
  }

  const toggleDrawerSignUp = () => {
    setOpenSignUp((prevState) => !prevState);
  };

  return (
    <section className="w-full max-w-[1480px] mx-auto">
      <header className="flex z-30 max-w-[1280px] sticky justify-between items-center w-full px-5 py-1 shadow-header bg-[#00000056]">
        <div className="flex items-center gap-3 w-[60%]">
          <img
            src="/assets/MyStoreLogo.svg"
            alt="logo"
            className="w-40 aspect-auto rounded-md"
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
          <Button onclick={toggleDrawerSignUp} text={"Cart"}>
            <FaCartShopping size={"18px"} />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button onclick={toggleDrawerSignIn} text={"Login"}>
            {" "}
            <FaRegCircleUser size={"18px"} />{" "}
          </Button>
          <Button onclick={toggleDrawerSignUp} text={"Sign Up"}>
            {" "}
            <MdPersonAdd size={"18px"} />{" "}
          </Button>
        </div>
      </header>
      <Drawer
        open={isOpenSingUp}
        onClose={toggleDrawerSignUp}
        direction="right"
        size={"400px"}
      >
        <SignUp
          HaveAccount={() => {
            setOpenSignUp(false);
            setOpenSignIn(true);
          }}
          close={() => {
            setOpenSignUp(false);
          }}
        />
      </Drawer>
      <Drawer
        open={isOpenSingIn}
        onClose={toggleDrawerSignIn}
        direction="top"
        size={"450px"}
      >
        <SignIn
          CreateAccount={() => {
            setOpenSignUp(true);
            setOpenSignIn(false);
          }}
          close={() => {
            setOpenSignIn(false);
          }}
        />
      </Drawer>
      {children}
    </section>
  );
}

export default UserLayout;
