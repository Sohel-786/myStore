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
}

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

