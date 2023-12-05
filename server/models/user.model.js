import { Schema, model } from "mongoose";

const userSchema = new Schema({
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

  password : {
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
  cartItems: [{
    productId : {
        type : String,
        required : true,
    }
  }],
  purchased : [
    {
        productId : {
            type : String,
            required : true,
        },
        quantity : {
            type : Number,
            required : true
        },
        date : Date
    }
  ]
});
