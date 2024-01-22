import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsGithub,
} from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import Li from "./LI";
import { useLocation, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const newDate = new Date();
  const year = newDate.getFullYear();
  const location = useLocation();

  return (
    <footer className="flex w-full bg-gradient-to-r from-[#0d0d0d] to-[#0d0d0de0] flex-col lg:flex-row items-center justify-between py-12 pb-6 px-2 lg:px-12 lg:pb-12 mt-14">
      <div className="flex justify-center items-center w-full lg:w-[65%]">
        <section className="w-[50%] lg:w-[48%] flex flex-col justify-center items-center">
          <img
            className="h-[350px] lg:w-full aspect-auto"
            src="/assets/storeLogo.png"
            alt="MyStoreLogo"
            style={{
              width : '250px'
            }}
          />
          <h1 className="text-white mt-2 font-mono font-bold text-[9px] lg:mt-0 lg:text-base">
            Copyright {year} | All rights reserved
          </h1>
        </section>

        <section className="flex flex-col justify-center w-[50%] lg:w-[55%] pl-10">
          <h1 className="text-white text-base font-bold tracking-wider lg:text-2xl">
            About
          </h1>
          <ul className="flex flex-col justify-center text-xs text-gray-400 font-bold tracking-wide mt-4 gap-2 lg:mt-8 lg:text-base">
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>MyStore Stories</li>
            <li>Press</li>
            <li>MyStore WholeSale</li>
            <li>Cleartrip</li>
            <li>Corporate Information</li>
          </ul>
        </section>
      </div>

      <section className="w-[100%] px-3 mt-3 flex flex-col gap-8 min-h-[300px] lg:mt-0 lg:px-0 lg:w-[35%]">
        <div>
          <h1 className="text-gray-400 text-lg tracking-wider font-slab lg:tracking-normal lg:font-sans font-semibold lg:text-xl">
            Social
          </h1>
          <ul className="flex items-center justify-between lg:gap-6 text-2xl my-4">
            <Li>
              <BsFacebook />
            </Li>
            <Li>
              <BsTwitter />
            </Li>
            <Li>
              <BsInstagram />
            </Li>
            <Li>
              <BsLinkedin />
            </Li>
            <Li>
              <IoLogoYoutube />
            </Li>
            <Li>
              <BsGithub />
            </Li>
            <Li>
              <FaTelegramPlane />
            </Li>
          </ul>
        </div>

        <ul className="w-[100%] grid grid-cols-2 justify-center gap-2 text-gray-400 relative -top-4 font-mono font-bold lg:grid-cols-1 lg:w-full">
          <li className="cursor-pointer hover:text-white">Payments</li>
          <li className="cursor-pointer hover:text-white">Shipping</li>
          <li className="cursor-pointer hover:text-white">Cancellation & Returns</li>
          <li className="cursor-pointer hover:text-white">
            FAQ
          </li>
          <li className="cursor-pointer hover:text-white">Report Infrigement</li>
        </ul>

        <hr className="border-t-[0.4px] border-[#4f5961] lg:w-[95%] lg:self-center" />

        <div className="flex justify-center items-center w-full">
          <h1 className="text-lg text-white font-bold text-center lg:text-start">
            Made with{" "}
            <img
              className="w-7 h-7 inline-block"
              src="/assets/heart.svg"
              alt="heart Image"
            />{" "}
            by{" "}
            <img
              className="w-[171px] inline-block relative -top-[6px] -left-2"
              src="/assets/my name.png"
              alt="My Name"
            />
          </h1>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
