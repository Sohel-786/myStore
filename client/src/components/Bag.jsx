import { useState } from "react";
import { useSelector } from "react-redux";

function Bag() {
  const [bagItems, setBagItems] = useState(null);
  const { cartItems } = useSelector((s) => s?.auth?.data);

  useState(() => {
    
  }, []);

  return (
    <div className="w-full h-full flex mt-5">
      <ul>{}</ul>
    </div>
  );
}

export default Bag;
