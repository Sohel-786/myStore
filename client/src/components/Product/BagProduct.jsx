function BagProduct({ data }) {
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
  return (
    <div className="w-full flex h-[100px]">
      <div className="w-[25%] h-full">
        <img
          src={thumbnail.secure_url}
          alt={name}
          className="h-full aspect-auto max-w-full"
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
      </div>
    </div>
  );
}

export default BagProduct;
