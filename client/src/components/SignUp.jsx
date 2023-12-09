import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { isEmail, isValidPassword } from "../helpers/RegexMatcher";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { createUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignUp({ HaveAccount, close }) {
  const [previewImage, setPreviewImage] = useState();
  const [viewPassword, setViewpassword] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    fullname: "",
    password: "",
    avatar: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlePassView() {
    setViewpassword(viewPassword ? false : true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setSignupDetails({ ...signupDetails, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !signupDetails.email ||
      !signupDetails.password ||
      !signupDetails.avatar ||
      !signupDetails.fullname
    ) {
      toast.error("Please Fill all the field", {
        theme: "dark",
      });
      return;
    }

    if (signupDetails.fullname.length < 5) {
      toast.error("Name Should at least 5 characters long");
      return;
    }

    if (!isEmail(signupDetails.email)) {
      toast.error("Invalid Email, Please Enter Valid Email");
      return;
    }

    if (!isValidPassword(signupDetails.password)) {
      toast.error(
        "Password Must be 6 to 16 character long with atleast a number and symbol"
      );
      return;
    }

    const formData = new FormData();

    formData.append("fullname", signupDetails.fullname);
    formData.append("email", signupDetails.email);
    formData.append("password", signupDetails.password);
    formData.append("avatar", signupDetails.avatar);

    const res = await dispatch(createUser(formData));

    if (res?.payload?.data?.success) {
      close();
    }
  }

  function handleImage(e) {
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;
    setSignupDetails({
      ...signupDetails,
      avatar: uploadedImage,
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setPreviewImage(this.result);
    });
  }

  return (
    <section className="flex flex-col justify-center relative items-center my-10 w-full">
      <span onClick={close} className="cursor-pointer">
        <IoClose
          size={"40px"}
          className="absolute -top-8 -left-10 text-white"
        />
      </span>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col items-center w-[90%] shadow-formshadow bg-gradient-to-r rounded-xl md:w-[65%] lg:w-full"
      >
        <img
          className="w-[240px] sm:w-[270px] aspect-auto mb-5 select-none"
          src="/assets/SignUp.svg"
          alt="sign In"
        />

        {previewImage ? (
          <div className="flex flex-col">
            <img
              className="max-w-28 max-h-28 rounded-full m-auto "
              src={previewImage}
              alt="userImage"
            />
            <label htmlFor="avatar">
              <FaEdit className="relative text-4xl -right-20 -top-8 text-gray-700 cursor-pointer hover:text-gray-500" />
            </label>
          </div>
        ) : (
          <label htmlFor="avatar">
            <FaUserCircle className="w-28 h-28 cursor-pointer rounded-full border-[1px] border-red-300 hover:border-red-400 text-black hover:text-gray-700" />
            <FaEdit className="relative text-4xl -right-20 -top-8 text-gray-700 cursor-pointer hover:text-gray-500" />
          </label>
        )}

        <input
          onChange={handleImage}
          name="avatar"
          type="file"
          id="avatar"
          hidden
          accept=".jpg , .jpeg, .webp, .png, .svg"
        />

        <input
          onChange={handleChange}
          className="w-[95%] sm:w-[80%] px-3 py-3 bg-transparent border-[1.3px] z-20 border-b-[2.5px] focus:ring-0 border-black focus:outline-none placeholder:font-semibold font-bold my-3 capitalize"
          type="text"
          name="fullname"
          placeholder="Enter your full name"
        />

        <input
          onChange={handleChange}
          className="w-[95%] sm:w-[80%] px-3 py-3 bg-transparent border-[1.3px] border-b-[2.5px] focus:ring-0 border-black focus:outline-none placeholder:font-semibold font-bold my-3"
          type="email"
          name="email"
          placeholder="Enter your Email"
        />

        <div className="w-[95%] sm:w-[80%] px-2 pl-3 bg-transparent border-[1.3px] border-b-[2.5px] border-black my-3 flex justify-center items-center">
          <input
            onChange={handleChange}
            className="bg-transparent py-3 focus:outline-none border-none focus:ring-0 w-full placeholder:font-semibold font-bold"
            type={viewPassword ? "text" : "password"}
            name="password"
            placeholder="Choose your Password"
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

        <div
          aria-label="Submit Details"
          className="w-[80%] bg-gray-600 relative mt-3 z-[1] before:absolute before:bg-black before:left-0 before:top-0 before:bottom-0 before:transition-all before:duration-300 before:ease-in-out before:hover:right-0 before:focus-within:right-0 before:rounded-md before:content-[''] before:right-[100%] before:z-[2]"
        >
          <button
            type="submit"
            className="w-full relative text-white z-10 font-Roboto tracking-wide font-black px-5 py-2 cursor-pointer rounded-md  border-2 border-black"
          >
            Submit
          </button>
        </div>

        <p className="font-bold text-[15px] tracking-wide my-4">
          Already have an account ?{" "}
          <span
            onClick={HaveAccount}
            type="button"
            className="text-cyan-500 underline cursor-pointer text-[16px] hover:text-sky-500 hover:scale-110"
          >
            Login
          </span>
        </p>
      </form>
    </section>
  );
}

export default SignUp;
