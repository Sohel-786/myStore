import { isEmail, isValidPassword } from "../helpers/RegexMatcher.js";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

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
