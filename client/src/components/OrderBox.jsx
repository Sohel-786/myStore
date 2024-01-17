function OrderBox({ data }) {
  return (
    <div className="w-[50%] rounded-[10px] bg-orange-50 px-5 py-4">
      <h1 className="font-Slab font-bold text-sm mb-[10px] text-gray-700 tracking-wide">
        #Order : {data._id}
      </h1>
      <div className="w-full overflow-hidden flex ">
        {data.orderItems.map((el) => {
          return (
            <div
              className="w-[20%] h-[90px] flex justify-center items-center rounded-[5px] overflow-hidden"
              style={{
                backgroundImage: `url(${el.product.thumbnail.secure_url})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
          );
        })}
      </div>
      <div>
        <button>In Process</button>
        <button>View Details</button>
      </div>
    </div>
  );
}

export default OrderBox;
