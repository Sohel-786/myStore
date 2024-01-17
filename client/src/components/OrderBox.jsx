function OrderBox({ data }) {
  return (
    <div className="w-[50%]">
      <h1>#Order : {data._id}</h1>
      <div className="w-full overflow-hidden flex ">
        {data.orderItems.map((el) => {
          return (
            <div className="w-[20%] h-[150px] flex justify-center items-center">
              <img src={el.product.thumbnail.secure_url} alt="Product Image" className="w-full h-full" />
            </div>
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
