import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    fullname: {
      type: "string",
      required: ["true", "Username Is Required"],
      minLength: [5, "Fullname must be at least 5 characters"],
      maxLength: [50, "Fullname must be less than 50 charcters"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: [true, "Already registered in another account"],
      trim: true,
      lowercase: true,
    },
    address: [
      {
        address: {
          type: String,
          required: [true, "Address is Required"],
          maxlength : [117, "Specify Address in Short"],
          trim: true,
        },
        country : {
          type: String,
          required: [true, "Country Name is Required"],
        },
        state : {
          type: String,
          required: [true, "State Name is Required"],
        },
        city : {
          type: String,
          required: [true, "City Name is Required"],
        },
        postal : {
          type: String,
          required: [true, "City Name is Required"],
          trim: true,
        },
      },
    ],
    password: {
      type: String,
      required: [true, "Password is Required"],
      minLength: [6, "The password must be 6 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    avatar: {
      public_id: {
        type: String,
      },

      secure_url: {
        type: String,
      },
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    cartItems: [
      {
        productId: {
          type: String,
          required: true,
        },
      },
    ],
    wishlist: [
      {
        productId: {
          type: String,
          required: true,
        },
      },
    ],
    purchased: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        date: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  comparePassword: async function (plaintextPassword) {
    return await bcrypt.compare(plaintextPassword, this.password);
  },

  JWTtoken: function () {
    return JWT.sign(
      {
        id: this._id,
        role: this.role,
        email: this.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },

  generatePasswordToken: async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000; // 10min from current time;

    return resetToken;
  },
};

const User = model("user", userSchema);

export default User;
