import { isEmail, isValidPassword } from "../helpers/RegexMatcher.js";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../utils/sendMail.js";
import crypto from "crypto";
import Product from "../models/product.model.js";

const cookieOptions = {
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
  httpOnly: true,
  sameSite: "none",
};

export const register = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  if ((!fullname, !email, !password)) {
    return next(new AppError("All input fields are required", 400));
  }

  if (!isValidPassword(password)) {
    return next(
      new AppError(
        "Password must be 6 to 16 characters long with at least a number and symbol",
        400
      )
    );
  }

  if (!isEmail(email)) {
    return next(new AppError("Invalid Email, Please provide valid email", 400));
  }

  const userExits = await User.findOne({ email });

  if (userExits) {
    return next(new AppError("User Already Registered", 400));
  }

  const user = await User.create({
    fullname,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url: "secure_url",
    },
  });

  if (!user) {
    return next(
      new AppError("User Registeration failed, please try again later", 400)
    );
  }

  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "mystore",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // remove file from local server
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(new AppError("File not uploaded, please try again", 500));
    }
  }

  await user.save();

  const token = await user.JWTtoken();

  res.cookie("token", token, cookieOptions);

  user.password = undefined; // so the password don't get returned in res

  res.status(201).json({
    success: true,
    user,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return next(new AppError("All input fields are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Email or Password do not match", 400));
  }

  const token = await user.JWTtoken();
  user.password = undefined;

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    message: "User Logged In Successfully",
    user,
  });
};

export const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    msg: "Successfully Logged Out",
  });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new AppError("Unauthenticated, please login", 400));
    }

    return res.status(200).json({
      success: true,
      user,
      message: "User Details Fetched Successfully",
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { fullname } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("User does not exist", 400));
    }

    if (fullname) {
      user.fullname = fullname;
      console.log(user.fullname);
    }

    if (req.file) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // remove file from local server
        fs.rm(`uploads/${req.file.filename}`);
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User details updated successfully",
    });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

export const changePassword = async function (req, res, next) {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  if (!oldPassword || !newPassword) {
    return next(new AppError("All fields are required", 400));
  }

  const user = await User.findById(id).select("+password");

  if (!user) {
    return next(new AppError("User does not exist", 400));
  }

  const isPasswordvalid = await user.comparePassword(oldPassword);

  if (!isPasswordvalid) {
    return next(new AppError("Invalid Old Password", 400));
  }

  if (!isValidPassword(newPassword)) {
    return next(
      new AppError(
        "Password must be 6 to 16 characters long with at least a number and symbol",
        400
      )
    );
  }

  user.password = newPassword;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Your Password is changed",
    user,
  });
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Email is not registered", 400));
  }

  const resetToken = await user.generatePasswordToken();

  await user.save();

  const resetPasswordurl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const subject = "Reset Password";
  // const name = (user.fullname).toUpperCase()
  const message = `
  <div
  style="
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
    background-color: #0f1729;
    border-radius: 20px;
  "
>
  <div style="width: 100%; height:250px">
    <img
      style="width: 100%; height: 100%"
      src="https://res.cloudinary.com/da3zef4f0/image/upload/v1703326607/mystore/LogoEmail_jvnnrk.png"
      alt="classroom"
    />
  </div>
  <h1
  style="
    font-size: 30px;
    font-weight: 800;
    font-family: Arial, Helvetica, sans-serif;
    color: white;
    text-align: center;
  "
  >
  Hello, ${user.fullname.toUpperCase()}
  </h1>
  <h1
    style="
      font-size: 25px;
      font-weight: 500;
      font-family: Arial, Helvetica, sans-serif;
      color: #d2d2d2da;
      text-align: center;
    "
  >
    Reset Your Password
  </h1>
  <div style="width: fit-content; padding: 10px; margin: auto">
    <a href=${resetPasswordurl}
        style="
          padding: 15px 50px;
          border-radius: 10px;
          background: linear-gradient(
            to right,
            rgb(56, 0, 146),
            rgb(0, 119, 198)
          );
          color: white;
          font-weight: bold;
          font-size: 23px;
          border: 1px solid white;
          cursor: pointer;
          letter-spacing: 3px;
          font-family: 'Roboto Condensed', sans-serif;
          text-decoration : none
        "
      >
        Reset
    </a>
  </div>

  <div style="width: 80px; height: 80px; margin: auto">
    <img
      style="width: 100%; height: 100%"
      src="https://res.cloudinary.com/da3zef4f0/image/upload/v1696838585/lms/giphy_lrbsuy.gif"
      alt="arrowGif"
    />
  </div>

    <div style="width:95%;margin:auto;background-color:white;border-radius:10px">
      <p style="color: black; text-align: center;font-size: 14px;font-family:Verdana, Geneva, Tahoma, sans-serif;font-weight: 700;letter-spacing: 1.5px;padding:20px 15px">
      If the above link doesn't work for some reason then copy paste this
      link in new tab
    </p>
       <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;text-decoration: underline;font-size: 13px;text-align: center;padding-bottom:15px">${resetPasswordurl}</p>
    </div>
   

    <div style="width: 80%; border-left:5px solid rgb(255, 0, 255);margin:20px 80px; padding:5px 30px;border-radius: 10px;">
      <p style="font-size: 18px; color: rgb(255, 143, 143);font-weight:bold;font-family:monospace;letter-spacing: 1.5px;">If you have not requested this, kindly ignore it.</p>
    </div>
</div>`;

  try {
    await sendEmail(email, subject, message);

    res.status(200).json({
      success: true,
      message: `Reset password mail has been sent to registered email successfully!`,
    });
  } catch (e) {
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
    await user.save();

    return next(new AppError(e.message, 500));
  }
};

export const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  if (!password) {
    return next(new AppError("Password is Required", 400));
  }

  if (!isValidPassword(password)) {
    return next(
      new AppError(
        "Password must be 6 to 16 characters long with at least a number and symbol",
        400
      )
    );
  }

  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError("Token in invalid or expired, please try again", 400)
    );
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};

export const addAddress = async (req, res, next) => {
  try {
    const { address, country, state, city, postal } = req.body;

    if ((!address, !country, !state, !city, !postal)) {
      return next(new AppError("All input fields are required", 400));
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError("Unauthenticated, please login", 400));
    }
    console.log(city, address, country, state, postal);
    user.address.push({
      address,
      country,
      state,
      city,
      postal,
    });

    user.save();

    return res.status(201).json({
      success: true,
      message: "Address Added Successfully",
    });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const { address, country, state, city, postal, _id } = req.body;

    if ((!address, !country, !state, !city, !postal)) {
      return next(new AppError("All input fields are required", 400));
    }

    const userCheck = await User.findById(req.user.id);
    if (!userCheck) {
      return next(new AppError("Unauthenticated, please login", 400));
    }
    const user = await User.updateOne(
      {
        _id: req.user.id,
        address: {
          $elemMatch: {
            _id: _id,
          },
        },
      },
      {
        $set: {
          "address.$[inner].address": address,
          "address.$[inner].country": country,
          "address.$[inner].state": state,
          "address.$[inner].city": city,
          "address.$[inner].postal": postal,
        },
      },
      {
        arrayFilters: [{ "inner._id": _id }], //new mongoose.Types.ObjectId()
      }
    );

    if (user?.matchedCount === 0) {
      return next(new AppError("Such Address Doesn't Exist", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
    });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;

    if (!addressId) {
      return next(
        new AppError("Please provide the correct ID of the address", 400)
      );
    }

    const userCheck = await User.findById(req.user.id);
    if (!userCheck) {
      return next(new AppError("Unauthenticated, please login", 400));
    }
    const user = await User.updateOne(
      {
        _id: req.user.id,
      },
      {
        $pull: {
          address: { _id: addressId },
        },
      }
    );

    if (user?.matchedCount === 0) {
      return next(new AppError("Such Address Doesn't Exist", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Address Deleted Successfully",
      user,
    });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

export const addToBag = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return next(AppError("The ProductId is required", 400));
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError("Unauthenticated, please login", 400));
    }

    for(let i = 0 ; i < user.cartItems.length ; i++){
      if(user.cartItems[i].productId === productId){
        return next(new AppError('The Bag already have this product'), 400);
      }
    }

    user.cartItems.push({ productId });

    user.save();

    res.status(201).json({
      success: true,
      message: "Successfully Added Product to the Bag",
    });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

export const removeFromBag = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return next(AppError("The ProductId is required", 400));
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          cartItems: { productId: productId },
        },
      },
      { new: true }
    );

    console.log(user);

    if(!user) {
      return next(new AppError("Unauthenticated, please login", 400));
    }

    res.status(201).json({
      success: true,
      message: "Successfully removed product from the Bag",
    });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

export const getBagProducts = async (req, res, next) => {
  try {
    const { data } = req.body;

    if (!data) {
      return next(
        AppError("Provide required Data to get the bag products"),
        400
      );
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError("Unauthenticated, please login", 400));
    }

    const products = await Product.find({ _id: { $in: data } });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
