import { HiOutlinePhoto } from "react-icons/hi2";
import { RiCloseCircleFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import {
  addProduct,
  getAllProducts,
  updateProduct,
} from "../redux/slices/productSlice";

function ProductCreateUpdate({ ProductData, closeProductUpdate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [dragActive, setDragActive] = useState(false);
  const [productDetails, setProductDetails] = useState(
    location.pathname === "/manage-products"
      ? {
          ...ProductData,
          previewImage: ProductData?.thumbnail?.secure_url,
          pricedrop: ProductData.pricedrop === 0 ? "0" : ProductData.pricedrop,
        }
      : {
          name: "",
          description: "",
          brand: "",
          category: "men",
          price: "0",
          deliveryInfo: "",
          availableSizes: [],
          sale: "NO",
          pricedrop: "0",
          thumbnail: null,
          previewImage: null,
        }
  );

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();

    const container = document.getElementById("container");
    container.style.borderColor = "red";

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    }
    if (e.type === "dragleave") {
      container.style.borderColor = "transparent";
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const container = document.getElementById("container");
    container.style.borderColor = "transparent";

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedImage = e.dataTransfer.files[0];
      setProductDetails(function (state) {
        return { ...state, thumbnail: uploadedImage };
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        let result = this.result;
        setProductDetails(function (state) {
          return { ...state, previewImage: result };
        });
      });
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  }

  function handleImage(e) {
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;
    setProductDetails(function (s) {
      return {
        ...s,
        thumbnail: uploadedImage,
      };
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      let result = this.result;
      setProductDetails(function (s) {
        return {
          ...s,
          previewImage: result,
        };
      });
    });
  }

  function handleBlur() {
    const thumbnailBtn = document.querySelector("#thumbnailBtn");
    const thumbnail = document.querySelector("#thumbnail");
    thumbnail.style.filter = "blur(3px)";
    thumbnailBtn.style.display = "flex";
  }

  function handleBlurRemove() {
    const thumbnailBtn = document.querySelector("#thumbnailBtn");
    const thumbnail = document.querySelector("#thumbnail");
    thumbnail.style.filter = "blur(0)";
    thumbnailBtn.style.display = "none";
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !productDetails.name ||
      !productDetails.description ||
      !productDetails.category ||
      !productDetails.price ||
      !productDetails.deliveryInfo ||
      !productDetails.availableSizes ||
      !productDetails.sale ||
      !productDetails.pricedrop ||
      !productDetails.thumbnail ||
      !productDetails.brand
    ) {
      toast.error("All fields are Required");
      return;
    }

    const formData = new FormData();

    formData.append("name", productDetails.name);
    formData.append(
      "description",
      productDetails.description.replaceAll("\n", "$")
    );
    formData.append("brand", productDetails.brand);
    formData.append("category", productDetails.category);
    formData.append("price", productDetails.price);
    formData.append("deliveryInfo", productDetails.deliveryInfo);
    formData.append("availableSizes", productDetails.availableSizes);
    formData.append("sale", productDetails.sale);
    formData.append("pricedrop", productDetails.pricedrop);
    formData.append("thumbnail", productDetails.thumbnail);

    if (location.pathname === "/manage-products") {
      if (!productDetails._id) {
        toast.error("Something Went Wrong");
        return;
      }

      const res = await dispatch(
        updateProduct({ data: formData, id: productDetails._id })
      );
      if (res?.payload?.data?.success) {
        dispatch(getAllProducts());
        setProductDetails({
          name: "",
          description: "",
          brand: "",
          category: "men",
          price: "0",
          deliveryInfo: "",
          availableSizes: [],
          sale: "NO",
          pricedrop: "0",
          thumbnail: null,
          previewImage: null,
        });
        closeProductUpdate();
      }
    } else {
      const res = await dispatch(addProduct(formData));
      if (res?.payload?.data?.success) {
        setProductDetails({
          name: "",
          description: "",
          brand: "",
          category: "men",
          price: "0",
          deliveryInfo: "",
          availableSizes: [],
          sale: "no",
          pricedrop: 0,
          thumbnail: null,
          previewImage: null,
        });
        await dispatch(getAllProducts());
        scrollTo({
          top: 0,
          behavior: "smooth",
        });
        navigate("/manage-products");
      }
    }
  }
  return (
    <section
      className={`flex flex-col items-center ${
        location.pathname === "/add-product" ? "py-0" : "py-20"
      } pt-8 pb-10`}
    >
      <h1 className="mb-4 lg:mb-8 text-4xl font-bold font-Nova text-gray-700">
        {location.pathname === "/manage-products"
          ? "Update Product"
          : "ADD PRODUCT"}
      </h1>

      {/* To View Image on Full Screen */}
      <div
        id="fullView"
        className="fixed top-0 h-[100vh] w-[100vw] hidden z-50 bg-black flex-col justify-center items-center"
      >
        <RiCloseCircleFill
          onClick={handleFullViewclose}
          size={"50px"}
          className="absolute top-3 right-2 md:right-3 sm:right-8 cursor-pointer text-red-600 hover:text-red-800 bg-black border-[2px] border-transparent rounded-full hover:border-white"
        />
        <img
          className="w-auto h-auto"
          src={productDetails.previewImage ? productDetails.previewImage : ""}
          alt="Preview Image"
        />
      </div>

      <div className="sm:flex w-full px-12">
        <div
          id="container"
          style={{
            userSelect: "none",
          }}
          onDragEnter={handleDrag}
          className="w-[95%] md:w-[70%] lg:w-[50%] h-[200px] sm:min-h-[350px] flex flex-col items-center justify-center mb-6 border-[2px] border-transparent border-dashed"
        >
          {productDetails.previewImage ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onMouseOver={handleBlur}
              onMouseOut={handleBlurRemove}
              className="w-full h-full flex justify-center items-center"
            >
              <div
                id="thumbnailBtn"
                className="lg:hidden z-10 absolute flex-col gap-2"
              >
                <button
                  aria-label="View Image On Full Screen"
                  onClick={() => {
                    handleFullImageView();
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 font-bold text-sm border-[2px] border-stone-400 hover:scale-110 transition-all duration-200 ease-in-out hover:bg-cyan-400 hover:text-white hover:border-transparent"
                >
                  VIEW
                </button>
                <button
                  aria-label="Cancel selected Image"
                  onClick={() => {
                    setProductDetails({
                      ...productDetails,
                      previewImage: "",
                      thumbnail: "",
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 font-bold text-sm border-[2px] border-stone-400 hover:scale-110 transition-all duration-200 ease-in-out hover:bg-red-500 hover:text-white hover:border-transparent"
                >
                  CANCEL
                </button>
              </div>

              <img
                id="thumbnail"
                src={
                  productDetails.previewImage ? productDetails.previewImage : ""
                }
                alt="Course Thumbnail"
                className="max-w-full h-full"
              />
            </div>
          ) : dragActive ? (
            <div
              className="w-full h-full bg-gray-200 border-gray-300 transition-all duration-200 ease-in-out flex justify-center items-center border-[2px] border-dashed "
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          ) : (
            <div className="border-[2px] border-dashed flex flex-col justify-center items-center w-full h-full">
              <HiOutlinePhoto size={"70px"} className="text-gray-300" />
              <p className="text-gray-500 text-sm font-semibold text-center">
                <label htmlFor="courseImage">
                  <span
                    type="button"
                    className="text-black text-base font-bold cursor-pointer p-1 px-[5px] hover:bg-black hover:text-white rounded-lg hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    Upload a file
                  </span>{" "}
                </label>
                or drag and drop <br /> PNG, JPG, JPEG, WEBP
              </p>
            </div>
          )}
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="bg-white text-black px-4 sm:px-5 rounded-xl w-[95%] lg:w-[50%] flex flex-col items-center"
        >
          <input
            type="file"
            hidden
            id="courseImage"
            onChange={handleImage}
            accept=".jpg, .jpeg, .png, .webp, .svg"
          />

          <div className="my-2 w-full">
            <label
              className="block text-black font-semibold tracking-wide mb-3 font-sans"
              htmlFor="name"
            >
              Name
            </label>
            <input
              name="name"
              onChange={handleChange}
              className="rounded-lg border-gray-300 border-[1.2px] w-full px-2 py-2"
              type="text"
              id="name"
              value={productDetails?.name}
            />
          </div>

          <div className="grid grid-cols-2 w-full gap-3 my-2">
            <div className="my-2 w-full">
              <label
                className="block text-black font-semibold tracking-wide mb-3 font-sans "
                htmlFor="category"
              >
                Category
              </label>
              <select
                name="category"
                onChange={handleChange}
                className="rounded-lg border-gray-300 border-[1.2px] w-full px-2 py-2"
                type="text"
                id="category"
                value={productDetails?.category}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>
            <div className="my-2 w-full">
              <label
                className="block text-black font-semibold tracking-wide mb-3 font-sans"
                htmlFor="price"
              >
                Price
              </label>
              <input
                name="price"
                onChange={handleChange}
                className="rounded-lg border-gray-300 border-[1.2px] w-full px-2 py-2"
                type="number"
                id="price"
                value={productDetails?.price}
              />
            </div>
          </div>

          <div className="w-full my-2">
            <div className="my-0 w-full">
              <label
                className="block text-black font-semibold tracking-wide mb-3 font-sans "
                htmlFor="brand"
              >
                Brand
              </label>
              <input
                name="brand"
                onChange={handleChange}
                className="rounded-lg border-gray-300 border-[1.2px] w-full px-2 py-2"
                type="text"
                id="brand"
                value={productDetails?.brand}
              />
            </div>
          </div>

          <div className="my-2 w-full flex">
            <div className="w-[50%] flex flex-col">
              <h1 className="text-black font-semibold tracking-wide mb-3 font-sans">
                Available Sizes
              </h1>
              <ul className="w-full flex flex-wrap gap-4 pl-1 items-center h-full">
                {[
                  "s",
                  "m",
                  "l",
                  "xl",
                  "2-3Y",
                  "3-4Y",
                  "4-5Y",
                  "5-6Y",
                  "6-7Y",
                  "7-8Y",
                  "8-9Y",
                  "9-10Y",
                  "10-11Y",
                  "11-12Y",
                  "12-13Y",
                  "13-14Y",
                ].map((el) => {
                  return (
                    <li
                      key={nanoid(4)}
                      onClick={() => {
                        if (productDetails.availableSizes.includes(el)) {
                          const temp = productDetails.availableSizes.filter(
                            (ele) => {
                              if (ele !== el) {
                                return ele;
                              }
                            }
                          );
                          setProductDetails({
                            ...productDetails,
                            availableSizes: temp,
                          });
                        } else {
                          setProductDetails({
                            ...productDetails,
                            availableSizes: [
                              ...productDetails.availableSizes,
                              el,
                            ],
                          });
                        }
                      }}
                      className="border-[1px] flex items-center relative shadow-logBtn hover:border-black rounded-md overflow-hidden cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-950 before:transition-all before:ease-in-out hover:before:right-0 before:z-[2] lg:py-[5px] lg:px-3 lg:text-base capitalize"
                      style={{
                        backgroundColor: productDetails.availableSizes.includes(
                          el
                        )
                          ? "#5f29cc"
                          : "",
                        color: productDetails.availableSizes.includes(el)
                          ? "white"
                          : "",
                      }}
                    >
                      <span className="z-10 block">{el}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="w-[50%] flex flex-col">
              <h1 className="text-black font-semibold tracking-wide mb-3 font-sans">
                Delivery Info
              </h1>
              <input
                name="deliveryInfo"
                onChange={handleChange}
                className="rounded-lg border-gray-300 border-[1.2px] w-full px-2 py-2"
                type="text"
                id="deliveryInfo"
                value={productDetails?.deliveryInfo}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 w-full gap-3 my-2">
            <div className="my-2 w-full">
              <label
                className="block text-black font-semibold tracking-wide mb-3 font-sans "
                htmlFor="sale"
              >
                On Sale
              </label>
              <select
                name="sale"
                onChange={handleChange}
                className="rounded-lg border-gray-300 border-[1.2px] w-full px-2 py-2"
                id="sale"
                value={productDetails?.sale}
              >
                <option value="NO">No</option>
                <option value="YES">Yes</option>
              </select>
            </div>
            <div className="my-2 w-full">
              <label
                className="block text-black font-semibold tracking-wide mb-3 font-sans"
                htmlFor="pricedrop"
              >
                Price Drop (%)
              </label>
              <input
                name="pricedrop"
                onChange={handleChange}
                className="rounded-lg border-gray-300 border-[1.2px] w-full px-2 py-2"
                type="number"
                id="pricedrop"
                value={productDetails?.pricedrop}
              />
            </div>
          </div>

          <div className="my-2 w-full">
            <label
              className="block text-black font-semibold tracking-wide mb-3 font-sans"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              rows={"8"}
              className="rounded-lg border-gray-300 border-[1.2px] w-full resize-y px-2 py-1"
              type="text"
              id="description"
              value={(productDetails?.description).replaceAll("$", "\n")}
            />
          </div>

          <div className="mt-6 flex items-center justify-end w-full border-t-[2px] border-gray-100 pt-3">
            {location.pathname === "/manage-products" ? (
              <button
                aria-label="Update the Course"
                type="submit"
                className="border-2 flex items-center gap-1 relative shadow-logBtn hover:border-black rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-950 before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base"
              >
                <span className="z-[3]">Update</span>
              </button>
            ) : (
              <button
                aria-label="Create Course"
                type="submit"
                className="border-2 flex items-center gap-1 relative shadow-logBtn hover:border-black rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-950 before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base"
              >
                <span className="z-[3]">Add Product</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProductCreateUpdate;
