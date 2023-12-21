import Product from "../models/product.model.js";
import cloudinary from "cloudinary";
import AppError from "../utils/appError.js";
import fs from "fs/promises";

export const getAllProducts = async (req, res, next) => {
  const allProducts = await Product.find({});

  if (!allProducts) {
    return next(new AppError("Enable to get all product details", 400));
  }

  res.status(200).json({
    success: true,
    products: allProducts,
    message: "Successfully fetched all products",
  });
};

export const AddProduct = async (req, res, next) => {
  const {
    name,
    description,
    category,
    price,
    deliveryInfo,
    availableSizes,
    sale,
    pricedrop,
    brand,
  } = req.body;

  if (
    (!name,
    !description,
    !category,
    !brand,
    !price,
    !deliveryInfo,
    !availableSizes,
    !sale,
    !pricedrop)
  ) {
    return next(new AppError("All input fields are required", 400));
  }

  const product = await Product.create({
    name,
    description,
    category,
    brand,
    price,
    deliveryInfo,
    availableSizes: availableSizes.split(","),
    sale,
    pricedrop,
    thumbnail: {
      public_id: "dummy",
      secure_url: "dummy",
    },
  });

  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "mystore",
      });

      if (result) {
        product.thumbnail.public_id = result.public_id;
        product.thumbnail.secure_url = result.secure_url;

        // remove file from local server
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(new AppError("File not uploaded, please try again", 500));
    }
  }

  await product.save();

  res.status(201).json({
    success: true,
    product,
    message: "Product Added Successfully",
  });
};

export const updateProduct = async (req, res, next) => {
  const { productId } = req.params;

  const {
    name,
    description,
    category,
    price,
    deliveryInfo,
    availableSizes,
    sale,
    pricedrop,
    brand,
  } = req.body;

  if (
    (!name,
    !description,
    !category,
    !brand,
    !price,
    !deliveryInfo,
    !availableSizes,
    !sale,
    !pricedrop)
  ) {
    return next(new AppError("All input fields are required", 400));
  }

  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError("Product Doesn't exists", 400));
  }

  product.name = name;
  product.description = description;
  product.category = category;
  product.price = price;
  product.deliveryInfo = deliveryInfo;
  product.availableSizes = availableSizes.split(',');
  product.sale = sale;
  product.pricedrop = pricedrop;
  product.brand = brand;

  if (req.file) {
    await cloudinary.v2.uploader.destroy(product.thumbnail.public_id);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "mystore",
      });

      if (result) {
        product.thumbnail.public_id = result.public_id;
        product.thumbnail.secure_url = result.secure_url;

        // remove file from local server
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(new AppError("File not uploaded, please try again", 500));
    }
  }

  await product.save();

  res.status(201).json({
    success: true,
    product,
    message: "Product Updated Successfully",
  });
};
