function SummaryProduct({ el }) {
  return (
    <li className="flex rounded-md overflow-hidden w-full">
      <div className="w-[18%] h-[120px]">
        <img
          src={el.product.thumbnail.secure_url}
          alt={el.product.name}
          className="w-full aspect-auto max-h-full"
        />
      </div>

      <div className="w-[84%] flex flex-col pl-5 pr-2">
        <h1 className="capitalize font-semibold text-blue-600">
          {el.product.name}
        </h1>
        <p className="capitalize font-bold font-Nova tracking-wide">
          {el.product.brand}
        </p>
        <div className="w-full flex gap-6 mt-1 font-Roboto font-semibold ">
          <h1>
            Pieces :{" "}
            <span className="font-Slab text-gray-500">{el.quantity}</span>
          </h1>

          <h1>
            Size :{" "}
            <span className="capitalize font-Slab text-gray-500">
              {el.size}
            </span>
          </h1>

          <h1>
            Price/1pc :{" "}
            <span className="capitalize font-Slab text-gray-500">
              Rs.
              {el.product.sale === "YES"
                ? Math.floor(
                    el.product.price -
                      (el.product.pricedrop / 100) * el.product.price
                  )
                : el.product.price}
            </span>
          </h1>
        </div>

        <h1 className="font-Roboto font-semibold mt-1">
          Total :{" "}
          <span className="capitalize font-Slab text-[#2d922d]">
            Rs.{" "}
            {(el.product.sale === "YES"
              ? Math.floor(
                  el.product.price -
                    (el.product.pricedrop / 100) * el.product.price
                )
              : el.product.price) * el.quantity}
          </span>
        </h1>
      </div>
    </li>
  );
}

export default SummaryProduct;
