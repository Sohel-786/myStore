import { useDispatch } from "react-redux";
import { removeFromBag } from "../../redux/slices/productSlice";
import { getUserDetails } from "../../redux/slices/authSlice";

function BagProduct({ data }) {
  const dispatch = useDispatch();
  let {
    _id,
    name,
    description,
    brand,
    category,
    price,
    deliveryInfo,
    availableSizes,
    sale,
    pricedrop,
    thumbnail,
  } = data;

  async function handleRemove() {
    const res = await dispatch(removeFromBag(_id));
    if (res?.payload?.data?.success) {
      dispatch(getUserDetails());
    }
  }

  return (
    <div className="w-full flex h-[105px] select-none shadow-product pl-2">
      <div className="w-[25%] h-full">
        <img
          src={thumbnail.secure_url}
          alt={name}
          className="h-full aspect-auto max-w-full rounded-md"
        />
      </div>

      <div className="w-[75%] h-full px-2 py-1 relative">
        <h1 className="capitalize font-semibold font-Roboto text-sm text-gray-500">
          {name.slice(0, 33)}..
        </h1>
        <h2 className="capitalize font-Nova text-base font-bold">{brand}</h2>
        {sale === "YES" && (
          <p className="px-2 rounded-lg absolute right-3 bottom-1 bg-black text-white font-Mukta w-fit text-[10px]">
            On Sale
          </p>
        )}

        <div className="text-[#282c3f]">
          {sale === "YES" ? (
            <span>
              <span className="text-[14px] font-bold leading-[15px] ">
                Rs. {Math.floor(price - (pricedrop / 100) * price)}
              </span>
              <span className="ml-[5px] text-[#7e818c] text-[11px] leading-[12px] line-through">
                Rs. {price}
              </span>{" "}
              <span className="text-[red] text-[11px] ml-[5px]">
                ({pricedrop}% OFF)
              </span>{" "}
            </span>
          ) : (
            <span className="text-[14px] font-bold leading-[15px] ">
              Rs. {price}
            </span>
          )}
        </div>

        <button
          onClick={handleRemove}
          className="w-fit text-sm px-4 flex bg-red-100 rounded-md font-Mukta mt-2 text-[#db4040] relative before:absolute before:top-0 before:right-full before:left-0 before:bottom-0 hover:before:right-0 before:transition-all before:ease-in-out overflow-hidden hover:text-white before:z-[5] before:bg-[#d53c3c]"
        >
          <span className="z-10">- Remove</span>
        </button>
      </div>
    </div>
  );
}

export default BagProduct;
