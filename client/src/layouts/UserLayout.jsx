import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser, FaCartShopping } from "react-icons/fa6";
import { BiSolidUser } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { MdPersonAdd } from "react-icons/md";
import Button from "../components/Button";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import SignUp from "../components/SignUp";
import { useEffect, useRef, useState } from "react";
import SignIn from "../components/SignIn";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserLayout({ children }) {
  const [isOpenSingUp, setOpenSignUp] = useState(false);
  const [isOpenSingIn, setOpenSignIn] = useState(false);
  const { isLoggedIn, role } = useSelector((s) => s.auth);
  const [showProfile, setShowProfile] = useState(false);
  const name = useSelector((s) => s?.auth?.data?.fullname);
  const img = useSelector((s) => s?.auth?.data?.avatar?.secure_url);
  const wrapperRef = useRef("profileMenu");

  const toggleDrawerSignIn = () => {
    setOpenSignIn((prevState) => !prevState);
  };

  const toggleDrawerSignUp = () => {
    setOpenSignUp((prevState) => !prevState);
  };

  function handleProfilemenuview(ref, useClickOutside) {
    useEffect(() => {
      function handleClickoutside(e) {
        if (isLoggedIn) {
          if (ref.current && !ref.current.contains(e.target)) {
            useClickOutside();
          }
        }
      }

      document.addEventListener("mousedown", handleClickoutside);

      return () => {
        document.removeEventListener("mousedown", handleClickoutside);
      };
    }, [ref, useClickOutside]);
  }

  handleProfilemenuview(wrapperRef, () => {
    setShowProfile(false);
  });

  function handleLogout(){

  }

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

        {isLoggedIn ? (
          <div
            className="flex flex-col justify-center items-center"
            ref={wrapperRef}
          >
            <div
              rel="preload"
              fetchpriority="high"
              onClick={() => {
                setShowProfile(!showProfile);
              }}
              className="rounded-full w-11 h-11 mr-3 cursor-pointer bg-center bg-cover hover:border-[1px] border-transparent hover:border-pink-300"
              style={{
                userSelect: "none",
                backgroundImage: `url(${img})`,
              }}
            ></div>

            {showProfile && (
              <div className="absolute flex flex-col justify-center w-36 bg-white shadow-menu top-16 right-4 rounded-md overflow-hidden">
                <div className="w-full p-2">
                  <h1 className="font-slab text-sm tracking-wide text-indigo-500">
                    Hay
                  </h1>
                  <p className="font-roboto font-semibold tracking-wide text-gray-600 mt-1 capitalize">
                    {name}
                  </p>
                </div>
                <hr className="w-[90%] self-center" />
                <Link to={"/profile"}>
                  <div className="flex gap-4 items-center py-2 px-2 font-bold text-sm text-stone-700 hover:bg-slate-200">
                    <BiSolidUser size={"18px"} /> My Profile
                  </div>
                </Link>

                <div
                  onClick={handleLogout}
                  className="flex gap-4 cursor-pointer items-center py-2 px-2 font-bold text-sm text-stone-700 hover:bg-slate-200"
                >
                  <IoLogOut size={"18px"} /> Logout
                </div>
              </div>
            )}
          </div>
        ) : (
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
        )}
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
