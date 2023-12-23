import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { isEmail, isValidPassword } from "../helpers/RegexMatcher";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { login } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignIn({ CreateAccount, close }) {
  const [viewPassword, setViewpassword] = useState(false);
  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlePassView() {
    setViewpassword(viewPassword ? false : true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setSigninDetails({ ...signinDetails, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!signinDetails.email || !signinDetails.password) {
      toast.error("Please Fill all the field");
      return;
    }

    if (!isEmail(signinDetails.email)) {
      toast.error("Invalid Email, Please Enter Valid Email");
      return;
    }

    if (!isValidPassword(signinDetails.password)) {
      toast.error(
        "Password Must be 6 to 16 character long with atleast a number and symbol"
      );
      return;
    }

    const res = await dispatch(login(signinDetails));

    if (res?.payload?.data?.success) {
      close();
    }
  }

  return (
    <section className="flex flex-col justify-center items-center my-10 w-[50%] mx-auto">
      <span onClick={close} className="cursor-pointer">
        <IoClose size={"40px"} className="absolute top-1 right-2 text-black" />
      </span>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col items-center w-[90%] shadow-formshadow bg-gradient-to-r rounded-xl md:w-[65%] lg:w-full"
      >
        <img
          className="w-[240px] sm:w-[270px] aspect-auto mb-5 select-none"
          src="/assets/SignIn.svg"
          alt="sign In"
        />

        <input
          onChange={handleChange}
          className="w-[95%] sm:w-[80%] px-3 py-3 bg-transparent border-[1.3px] border-b-[2.5px] focus:ring-0 border-black focus:outline-none placeholder:font-semibold font-bold my-3"
          type="email"
          name="email"
          placeholder="Enter Your Email"
        />

        <div className="w-[95%] sm:w-[80%] px-2 pl-3 bg-transparent border-[1.3px] border-b-[2.5px] border-black my-3 flex justify-center items-center">
          <input
            onChange={handleChange}
            className="bg-transparent py-3 focus:outline-none border-none focus:ring-0 w-full placeholder:font-semibold font-bold"
            type={viewPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Your Password"
          />
          {viewPassword ? (
            <span type="button" className="cursor-pointer">
              <FiEye
                className="text-2xl"
                aria-label="eye"
                onClick={handlePassView}
              />
            </span>
          ) : (
            <span type="button" className="cursor-pointer">
              <FiEyeOff
                className="text-2xl"
                aria-label="eyeOff"
                onClick={handlePassView}
              />
            </span>
          )}
        </div>
        <div className="w-[80%]">
          <h1 onClick={() => {
            navigate('/forgot-password')
          }} className="font-Nova w-fit font-bold tracking-wide hover:underline cursor-pointer hover:text-sky-600">Forgotten Password ?</h1>
        </div>

        <div
          aria-label="Submit Details"
          className="w-[80%] bg-gray-600 relative mt-3 z-[1] before:absolute before:bg-black before:left-0 before:top-0 before:bottom-0 before:transition-all before:duration-300 before:ease-in-out before:hover:right-0 before:rounded-md before:content-[''] before:right-[100%] before:z-[2]"
        >
          <button
            type="submit"
            className="w-full relative text-white z-10 font-Roboto tracking-wide font-black px-5 py-2 cursor-pointer rounded-md  border-2 border-black"
          >
            Login
          </button>
        </div>

        <span
          type="button"
          onClick={CreateAccount}
          className="border-2 mt-6 flex items-center gap-1 text-black relative shadow-logBtn border-black hover:border-white rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-950 before:-z-10 before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base"
        >
          Create New Account
        </span>
      </form>
    </section>
  );
}

export default SignIn;
