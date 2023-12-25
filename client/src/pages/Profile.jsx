import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import { MdFreeCancellation, MdOutlineMonochromePhotos } from "react-icons/md";
import { GiSave } from "react-icons/gi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import axiosInstance from "../config/axiosInstance";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import { RiCloseCircleFill } from "react-icons/ri";
import ForgotPassword from "../components/Profile/ForgotPassword";
import UserLayout from "../layouts/UserLayout";
import Drawer from "react-modern-drawer";
import AddressCart from "../components/Profile/AddressCart";
import AddressAddUpdate from "../components/Profile/AddressAddUpdate";
import { getUserDetails, updateUser } from "../redux/slices/authSlice";
import { nanoid } from "nanoid";
import { IoAdd } from "react-icons/io5";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { avatar, fullname, email, createdAt, address } = useSelector(
    (s) => s?.auth?.data
  );

  const [editable, setEditable] = useState(false);
  const [enableSave, setEnableSave] = useState(false);

  const [Address, setAddress] = useState(false);
  const [isPassChange, setIsPasschange] = useState(false);
  const [addressData, setAddressData] = useState(null);

  const [viewPassChange, setViewPassChange] = useState(false);
  const [viewOldPassword, setViewOldpassword] = useState(false);
  const [viewNewPassword, setViewNewpassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [formData, setFormdata] = useState({
    fullname: fullname,
    avatar: null,
    previewImage: avatar?.secure_url,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function toggleDrawerPassword() {
    setIsPasschange(!isPassChange);
  }

  function handleOldPassView() {
    setViewOldpassword(!viewOldPassword);
  }

  function handleNewPassView() {
    setViewNewpassword(!viewNewPassword);
  }

  function handleImage(e) {
    const uploadedImage = e.target.files[0];
    console.log(profilePhoto);
    console.log(e);
    if (!uploadedImage) return;

    setFormdata((s) => {
      return { ...s, avatar: uploadedImage };
    });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      let result = this.result;
      setFormdata((s) => {
        return { ...s, previewImage: result };
      });
    });

    setProfilePhoto(e.target.files);
    setEnableSave(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
    setEnableSave(true);
  }

  // For Change Password
  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  }

  async function handleSubmit() {
    if (formData.fullname === fullname && !formData.avatar) {
      return;
    }

    const data = new FormData();
    data.append("fullname", formData.fullname);
    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }

    const res = await dispatch(updateUser(data));

    if (res?.payload?.data?.success) {
      console.log('check')
      await dispatch(getUserDetails());
    }

    setEditable(false);
  }

  async function handlePasswordSubmit() {
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      toast.error("Please fill the password field");
      return;
    }

    try {
      const res = axiosInstance.put("/user/changepassword", passwordData);
      toast.promise(res, {
        pending: "Wait! Changing your password",
        success: "Password Chnaged",
        error: (data) => {
          let msg = data?.response?.data?.message;
          if (msg === "Invalid Old Password") {
            return "Please Enter Correct Old Password";
          }

          if (
            msg ===
            "Password must be 6 to 16 characters long with at least a number and symbol"
          ) {
            return "Please Create a Strong Password";
          }

          return "Something Went Wrong";
        },
      });

      const response = await res;

      if (response?.data?.success) {
        toggleDrawerPassword();
        setPasswordData({
          oldPassword: "",
          newPassword: "",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  function handleFullImageView() {
    disableBodyScroll(document);
    const fullView = document.getElementById("fullView");
    fullView.style.display = "flex";
  }

  function handleFullViewclose() {
    enableBodyScroll(document);
    const fullView = document.getElementById("fullView");
    fullView.style.display = "none";
  }

  function handleBlur() {
    const profileBtn = document.querySelector("#profileBtn");
    const profileImage = document.querySelector("#profileImage");
    profileImage.style.filter = "blur(3px)";
    profileBtn.style.display = "block";
  }

  function handleBlurRemove() {
    const profileBtn = document.querySelector("#profileBtn");
    const profileImage = document.querySelector("#profileImage");
    profileImage.style.filter = "blur(0)";
    profileBtn.style.display = "none";
  }

  function ShowForgotPass() {
    const changePass = document.getElementById("changePass");
    changePass.style.display = "none";

    const forgotPass = document.getElementById("forgotPass");
    forgotPass.style.display = "flex";
  }

  function hideForgotPass() {
    const changePass = document.getElementById("changePass");
    changePass.style.display = "flex";

    const forgotPass = document.getElementById("forgotPass");
    forgotPass.style.display = "none";
  }

  function toggleAddressDrawer() {
    setAddress(!Address);
  }

  function handleAddressChange(data) {
    setAddressData(data);
    toggleAddressDrawer();
  }

  return (
    <UserLayout>
      <div className="flex flex-col items-center w-full h-[900px] lg:h-[320px] mt-2 relative">
        <div className="w-full h-[90%] lg:h-full flex flex-col lg:flex-row justify-center items-center shadow-profile rounded-lg">
          <div
            style={{ userSelect: "none" }}
            className="flex flex-col w-full h-[43%] items-center lg:h-full lg:items-center lg:w-[40%] lg:justify-normal"
          >
            <div className="w-full p-3 h-[20%] lg:h-auto">
              <div
                onClick={() => {
                  navigate(-1);
                }}
                className="cursor-pointer hover:bg-gray-100 rounded-xl transition-all duration-300 ease-in-out w-fit px-4 py-2 active:scale-90 active:duration-100 active:bg-stone-200"
              >
                <FaArrowLeftLong size={"36px"} className="text-stone-500" />
              </div>
            </div>

            <div
              onMouseOver={handleBlur}
              onMouseOut={handleBlurRemove}
              className="flex flex-col justify-center items-center h-[80%] lg:h-auto w-fit rounded-full relative"
            >
              <div
                id="profileImage"
                style={{
                  backgroundImage: `url(${formData.previewImage})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                className="w-[230px] h-[230px] rounded-full border-[1px] border-transparent hover:border-pink-400 lg:w-[250px] lg:h-[250px] absolute top-[-50px] right-[-120px]"
              ></div>

              <div
                id="profileBtn"
                className="hidden absolute top-14 right-[-25px] flex-col gap-2"
              >
                <button
                  aria-label="See the Image on Full Screen"
                  onClick={handleFullImageView}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 font-bold text-sm border-[2px] border-stone-400 hover:scale-110 transition-all duration-200 ease-in-out hover:bg-cyan-400 hover:text-white hover:border-transparent"
                >
                  VIEW
                </button>
              </div>
            </div>

            {/* this for the small screens  */}
            <label htmlFor="profile" className="inline-block lg:hidden">
              <MdOutlineMonochromePhotos
                hidden={!editable}
                size={"60px"}
                className="relative -top-14 left-14 text-cyan-400 hover:text-gray-500 transition-colors duration-300 ease-in-out"
              />
            </label>

            {/* this for the large screens */}
            <label htmlFor="profile" className="hidden lg:inline-block">
              <MdOutlineMonochromePhotos
                hidden={!editable}
                size={"50px"}
                className="relative top-32 left-24 text-cyan-400 hover:text-gray-500 transition-colors duration-300 ease-in-out cursor-pointer"
              />
            </label>

            <div>
              <input
                files={profilePhoto}
                onChange={handleImage}
                type="file"
                hidden
                id="profile"
              />
            </div>
          </div>

          {/* Full View of Profile Image */}
          <div
            id="fullView"
            className="fixed top-0 right-0 left-0 bottom-0 hidden z-50 bg-black flex-col justify-center items-center"
          >
            <RiCloseCircleFill
              onClick={handleFullViewclose}
              size={"50px"}
              className="absolute top-3 right-8 cursor-pointer text-red-600 hover:text-red-800 bg-black border-[2px] border-transparent rounded-full hover:border-white"
            />
            <img
              className="max-h-full aspect-auto"
              src={formData.previewImage}
              alt="Preview Profile Image"
            />
          </div>

          <div className="flex flex-col px-5 py-4 w-full h-[57%] lg:w-[60%] lg:h-full">
            <div className="w-full lg:h-[10%]">
              <p className="float-right font-slab font-bold text-stone-500">
                Joined On {createdAt.slice(0, 10)}
              </p>
            </div>
            <div className="w-full flex flex-col gap-5 justify-center lg:h-[90%]">
              <fieldset
                style={{
                  userSelect: "none",
                  border: editable ? "2px solid #4f46e5" : "2px solid #e5e7eb",
                }}
                className="w-[70%] border-[1.5px] px-2 lg:px-4 pb-1 lg:pb-[2px] pt-[2px] rounded-xl"
              >
                <legend className="font-Slab text-black font-bold lg:text-sm">
                  Name
                </legend>

                <input
                  spellCheck="false"
                  style={{
                    caretColor: editable ? "green" : "transparent",
                    color: editable ? "#4f46e5" : "inherit",
                    pointerEvents: editable ? "" : "none",
                  }}
                  contentEditable={editable}
                  name="fullname"
                  id="fullname"
                  onChange={handleChange}
                  value={formData.fullname}
                  className={`capitalize text-xl w-[80%] font-roboto font-semibold tracking-wide outline-none border-none focus:outline-none focus:ring-0 bg-transparent lg:text-lg`}
                />
              </fieldset>

              <fieldset className="w-[80%] border-[2px] px-4 py-2 pb-3 select-none lg:select-auto lg:pt-1 lg:pb-0 rounded-xl cursor-not-allowed">
                <legend className="font-slab text-black lg:text-sm font-bold">
                  Email
                </legend>
                <h1 className="font-roboto font-semibold tracking-wide text-lg">
                  {email}
                </h1>
              </fieldset>

              {/* Change Password Input and Button Container */}
              {/* // change password section */}
              <Drawer
                open={isPassChange}
                onClose={toggleDrawerPassword}
                direction="right"
                size={"450px"}
              >
                <div className="flex justify-center items-center w-full h-full">
                  <div
                    id="changePass"
                    className="flex flex-col justify-center w-full bg-white rounded-xl py-5 px-6"
                  >
                    <label
                      htmlFor="oldpassword"
                      className="font-Nova text-[20px] font-bold text-gray-600 mt-4 mb-2 capitalize"
                    >
                      Enter your old password
                    </label>

                    <div className="w-full px-3 bg-transparent border-[2px] border-black focus-within:before:right-0 flex items-center gap-2 relative shadow-logBtn rounded-[5px] cursor-pointer font-bold text-xs text-black focus-within:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-950 before:transition-all before:ease-in-out lg:py-[5px] lg:px-3 lg:text-base">
                      <input
                        onChange={handlePasswordChange}
                        className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full placeholder:font-semibold font-bold z-10 py-1"
                        type={viewOldPassword ? "text" : "password"}
                        name="oldPassword"
                        id="oldpassword"
                        value={passwordData.oldPassword}
                      />
                      {viewOldPassword ? (
                        <span type="button" className="z-10">
                          <FiEye
                            aria-label="eyeOn"
                            className="text-xl"
                            onClick={handleOldPassView}
                          />
                        </span>
                      ) : (
                        <span type="button" className="z-10">
                          <FiEyeOff
                            aria-label="eyeOff"
                            className="text-xl"
                            onClick={handleOldPassView}
                          />
                        </span>
                      )}
                    </div>
                    <label
                      htmlFor="newpassword"
                      className="font-Nova text-[20px] font-bold capitalize text-gray-600 mt-4 mb-2 pl-1"
                    >
                      Create new password
                    </label>

                    <div className="w-full px-3 bg-transparent border-[2px] border-black focus-within:before:right-0 flex items-center gap-2 relative shadow-logBtn rounded-[5px] cursor-pointer font-bold text-xs text-black focus-within:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-950 before:transition-all before:ease-in-out lg:py-[5px] lg:px-3 lg:text-base">
                      <input
                        onChange={handlePasswordChange}
                        className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full placeholder:font-semibold z-10 py-1 font-bold"
                        type={viewNewPassword ? "text" : "password"}
                        name="newPassword"
                        id="newpassword"
                        value={passwordData.newPassword}
                      />
                      {viewNewPassword ? (
                        <span type="button" className="z-10">
                          <FiEye
                            aria-label="eyeOn"
                            className="text-xl"
                            onClick={handleNewPassView}
                          />
                        </span>
                      ) : (
                        <span type="button" className="z-10">
                          <FiEyeOff
                            aria-label="eyeOff"
                            className="text-xl"
                            onClick={handleNewPassView}
                          />
                        </span>
                      )}
                    </div>

                    <div className="w-full pl-1 mt-2 flex justify-end">
                      <p
                        type="button"
                        onClick={ShowForgotPass}
                        className="text-[#1877f2] text-lg font-semibold cursor-pointer hover:underline"
                      >
                        Forgotten password?
                      </p>
                    </div>

                    <div
                      style={{
                        userSelect: "none",
                      }}
                      className="w-full flex items-center gap-5 mt-1"
                    >
                      <button
                        aria-label="Change the password"
                        onClick={handlePasswordSubmit}
                        className="border-2 flex items-center gap-2 relative shadow-logBtn border-black  rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gradient-to-tr before:from-sky-400 before:via-sky-600 before:to-sky-800 hover:border-white before:z-[4] before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base overflow-hidden"
                      >
                        <span className="z-[5]">SUBMIT</span>
                      </button>

                      <button
                        aria-label="Cancel Changing password"
                        onClick={() => {
                          setPasswordData({
                            oldPassword: "",
                            newPassword: "",
                          });
                          setIsPasschange(false);
                        }}
                        className="border-2 flex bg-black text-white items-center gap-2 relative shadow-logBtn border-black  rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gradient-to-tr before:from-orange-400 before:via-orange-600 before:to-orange-800 hover:border-white before:z-[4] before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base overflow-hidden"
                      >
                        <span className="z-[5]">CANCEL</span>
                      </button>
                    </div>
                  </div>

                  {/* forgot password container */}

                  <ForgotPassword hideForgotPass={hideForgotPass} toggle={toggleDrawerPassword} />
                </div>
              </Drawer>
              <button
                aria-label="Change Your password"
                style={{
                  userSelect: "none",
                }}
                onClick={toggleDrawerPassword}
                className="bg-black w-[40%] relative mt-3 flex justify-center text-[16px] font-bold font-Nova text-white hover:text-black border-[2px] border-black before:absolute before:bg-white before:left-0 before:top-0 before:bottom-0 before:transition-all before:duration-300 before:ease-in-out before:hover:right-0 before:rounded-md before:content-[''] before:right-[100%] before:z-[2]"
              >
                <span className="z-[6] border-2 border-black rounded-md w-full py-[3px] h-full">
                  Change your password
                </span>
              </button>

              {/* Profile buttons, for save, edit, cancel */}
              <div
                style={{
                  userSelect: "none",
                }}
                className="w-full flex flex-col lg:flex-row items-center gap-4 lg:gap-6 mt-4 lg:mt-1"
              >
                {editable ? (
                  <>
                    <button
                      aria-label="Cancel Editing the profile"
                      onClick={() => {
                        setEditable(false);
                        setFormdata({
                          fullname: fullname,
                          previewImage: avatar.secure_url,
                        });
                        setEnableSave(false);
                        setProfilePhoto(null);
                      }}
                      className="border-2 flex items-center gap-2 relative shadow-logBtn border-black  rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gradient-to-tr before:from-zinc-500 before:to-zinc-800 hover:border-white before:-z-10 before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base"
                    >
                      <MdFreeCancellation size={"22px"} />
                      Cancel
                    </button>

                    <button
                      aria-label="Save Profile"
                      onClick={handleSubmit}
                      disabled={!enableSave}
                      className="border-2 flex items-center gap-2 relative shadow-logBtn border-black  rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gradient-to-t before:from-green-500 before:to-green-900 hover:border-white before:-z-10 before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base disabled:bg-gradient-to-tr disabled:text-white disabled:border-white disabled:cursor-not-allowed disabled:from-red-800 disabled:to-red-500"
                    >
                      <GiSave size={"22px"} />
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      aria-label="Edit Profile"
                      onClick={() => {
                        setEditable(true);
                      }}
                      className="border-2 flex items-center gap-2 relative shadow-logBtn border-black  rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gradient-to-tr before:from-green-500 before:to-green-800 hover:border-white before:-z-10 before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base"
                    >
                      <BiEdit size={"22px"} />
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-16 flex flex-col flex-wrap my-5">
        <h1 className="mb-4 font-Slab font-bold tracking-wide text-2xl text-zinc-500">
          Registered Addresses
        </h1>

        <hr />

        <div className="w-full h-auto flex gap-10 items-center my-5">
          {address && (
            <>
              {address.map((el) => {
                return (
                  <AddressCart
                    key={nanoid(4)}
                    data={el}
                    handleChange={handleAddressChange}
                  />
                );
              })}
            </>
          )}
          <div className="w-fit flex justify-center items-center">
            <div
              onClick={() => {
                setAddressData(null);
                toggleAddressDrawer();
              }}
              title="Add Address"
              className="p-5 rounded-full bg-blue-200 flex justify-center items-center cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out hover:bg-blue-100 text-blue-500 hover:text-blue-600"
            >
              <IoAdd size={"70px"} />
            </div>
          </div>
        </div>

        <Drawer
          open={Address}
          onClose={toggleAddressDrawer}
          direction="right"
          size={"450px"}
        >
          <AddressAddUpdate
            Addressdata={addressData}
            toggle={toggleAddressDrawer}
          />
        </Drawer>
      </div>
    </UserLayout>
  );
}

export default Profile;
