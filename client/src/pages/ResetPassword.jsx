import { useState } from "react";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { isValidPassword } from "../helpers/RegexMatcher";
import axiosInstance from "../config/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [viewPasswords, setViewPasswords] = useState({
    viewNewPassword: false,
    viewConfirmPassword: false,
  });

  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { resetToken } = useParams();

  function handleChange(e) {
    const { name, value } = e.target;

    const confirm = document.getElementById("confirm");

    if (!value) {
      if (name === "password") {
        if (password.confirmPassword.length > 0) {
          confirm.style.borderColor = "red";
        }
      } else {
        confirm.style.borderColor = "#0ea5e9";
      }
    } else if (name === "password") {
      if (password.confirmPassword === value) {
        confirm.style.borderColor = "#4ade80";
      } else if (!password.confirmPassword) {
        confirm.style.borderColor = "#0ea5e9";
      } else if (!(password.confirmPassword === value)) {
        confirm.style.borderColor = "red";
      }
    } else if (!(password.password === value)) {
      confirm.style.borderColor = "red";
    } else {
      confirm.style.borderColor = "#4ade80";
    }

    setPassword({
      ...password,
      [name]: value,
    });
  }

  function handleConfirmPassView() {
    setViewPasswords({
      ...viewPasswords,
      viewConfirmPassword: !viewPasswords.viewConfirmPassword,
    });
  }

  function handleNewPassView() {
    setViewPasswords({
      ...viewPasswords,
      viewNewPassword: !viewPasswords.viewNewPassword,
    });
  }

  async function handleSubmit() {
    if (!password.password || !password.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (!(password.password === password.confirmPassword)) {
      toast.error("Confirmation of new password doesn't match");
      return;
    }

    if (!isValidPassword(password.password)) {
      toast.error(
        "Password must be 6 to 16 characters long with at least a number and symbol"
      );
      return;
    }

    try {
      const res = axiosInstance.put(`/user/reset/${resetToken}`, password);
      toast.promise(res, {
        pending: "Wait, Changing your password",
        success: "Password changed successfully",
        error: (data) => {
          if (
            data?.response?.data?.message ===
            "Token in invalid or expired, please try again"
          ) {
            return "Provide email again and generate new token";
          }
          return "Something Went Wrong";
        },
      });

      const response = await res;

      if (response?.data?.success) {
        setPassword({
          password: "",
          confirmPassword: "",
        });
        scrollTo({
          top: 0,
          behavior: "smooth",
        });

        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
      if (
        err.response?.data?.message ===
        "Token in invalid or expired, please try again"
      ) {
        setPassword({
          password: "",
          confirmPassword: "",
        });
        scrollTo({
          top: 0,
          behavior: "smooth",
        });

        navigate("/");
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-[900px] lg:h-auto">
      <header
        style={{ userSelect: "none" }}
        className="flex justify-center items-center shadow-headershadow w-full h-[8%] lg:h-auto py-3"
      >
        <div className="w-[230px] aspect-auto">
          <img
            className="w-full aspect-auto"
            src={"/assets/MyLogo2.svg"}
            alt="logo"
          />
        </div>
      </header>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full flex justify-center items-center mt-8"
      >
        <div className="flex flex-col justify-center w-[90%] md:w-[60%] lg:w-[50%] bg-gradient-to-r from-slate-950 via-slate-800 to-slate-700 rounded-xl py-5 px-6">
          <label
            htmlFor="newPassword"
            className="font-Nova tracking-wider text-xl font-black text-gray-200 mt-4 mb-2 sm:mb-6"
          >
            Create New Password
          </label>

          <div className="w-full px-3 bg-transparent flex justify-center items-center border-[4px] border-sky-500 focus-within:border-green-400 bg-white py-2">
            <input
              onChange={handleChange}
              className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full placeholder:font-semibold font-bold "
              type={viewPasswords.viewNewPassword ? "text" : "password"}
              name="password"
              id="newPassword"
            />
            {viewPasswords.viewNewPassword ? (
              <span type="button">
                <FiEye
                  aria-label="eyeOn"
                  className="text-xl"
                  onClick={handleNewPassView}
                />
              </span>
            ) : (
              <span type="button">
                <FiEyeOff
                  aria-label="eyeOff"
                  className="text-xl"
                  onClick={handleNewPassView}
                />
              </span>
            )}
          </div>
          <label
            htmlFor="confirmPassword"
            className="font-Nova tracking-wider text-xl font-black text-gray-200 mt-4 mb-2 sm:mb-4 pl-1"
          >
            Confirm New Password
          </label>

          <div
            id="confirm"
            className="w-full px-3 bg-transparent flex justify-center items-center border-[4px] border-sky-500 focus-within:border-green-400 bg-white py-2"
          >
            <input
              onChange={handleChange}
              className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full placeholder:font-semibold font-bold"
              type={viewPasswords.viewConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
            />
            {viewPasswords.viewConfirmPassword ? (
              <span type="button">
                <FiEye
                  aria-label="eyeOn"
                  className="text-xl"
                  onClick={handleConfirmPassView}
                />
              </span>
            ) : (
              <span type="button">
                <FiEyeOff
                  aria-label="eyeOff"
                  className="text-xl"
                  onClick={handleConfirmPassView}
                />
              </span>
            )}
          </div>

          <div
            style={{
              userSelect: "none",
            }}
            className="w-full flex items-center justify-center gap-5 mt-8"
          >
            <button
              aria-label="Change Password"
              type="submit"
              onClick={handleSubmit}
              className="border-2 flex bg-white hover:text-white items-center gap-2 relative shadow-logBtn border-black rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gradient-to-tr before:from-cyan-400 before:via-cyan-600 before:to-cyan-800 hover:border-white before:z-[4] before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-8 lg:text-lg overflow-hidden"
            >
              <span className="z-[5] font-Nova">CHANGE PASSWORD</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
