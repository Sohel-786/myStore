import { toast } from "react-toastify";
import Button from "../Button";
import { GoCopy } from "react-icons/go";

function AddressCart({ data }) {
  return (
    <div className=" w-full rounded-md p-3 shadow-logBtn">
      <div className="py-3 px-2 rounded-md bg-blue-100 flex items-center">
        <h1 className="font-mono font-black capitalize w-[98%] pr-2">
          This is the first address i am having so just show it as a demo. This
          is the first address i am having so just show it as a demo. This is
          the first address i am having so just show it as a demo.
        </h1>
        <div
          onClick={() => {
            navigator.clipboard.writeText(data);
            toast.success(`Address`);
          }}
          title="Copy"
          className="cursor-pointer w-8 h-8 rounded-full flex justify-center items-center hover:bg-cyan-200"
        >
          <GoCopy />
        </div>
      </div>
      <div className="flex items-center mt-3 gap-3">
        <button
          onClick={onclick}
          className={`border-2 flex items-center gap-2 relative shadow-logBtn overflow-hidden bg-black text-white hover:border-black rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-black before:content-[''] before:left-full before:absolute before:top-0 before:bottom-0 before:right-0 before:bg-white before:z-[3] before:transition-all before:ease-in-out hover:before:left-0 lg:py-[5px] lg:px-6 lg:text-base`}
        >
          <span className="z-[5]">Change</span>
        </button>
        <button
          onClick={onclick}
          className={`border-2 flex items-center gap-2 relative shadow-logBtn overflow-hidden bg-white text-black border-black rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:left-full before:absolute before:top-0 before:bottom-0 before:right-0 before:bg-black before:z-[3] before:transition-all before:ease-in-out hover:before:left-0 lg:py-[5px] lg:px-6 lg:text-base`}
        >
          <span className="z-[5]">Delete</span>
        </button>
      </div>
    </div>
  );
}

export default AddressCart;
