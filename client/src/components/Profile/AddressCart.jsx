import { toast } from "react-toastify";
import Button from "../Button";
import { GoCopy } from "react-icons/go";

function AddressCart({ data, handleChange, handleDelete }) {
  const { address, country, state, city, postal } = data;

  return (
    <div className="w-[40%] rounded-md p-3 shadow-logBtn relative">
      <div className="py-3 px-2 rounded-md bg-blue-100 flex flex-col items-center">
        <h1 className="font-Nova font-black capitalize pr-2">
          {address}.
          <br/>
          <span>{state}</span>, {" "}
          <span className="capitalize">{city}</span>-<span>{postal}.</span><br/>
          <span className="capitalize">{country}</span>
        </h1>


        <div
          onClick={() => {
            navigator.clipboard.writeText( (address +" "+ state +" "+ city +" "+ postal +" "+ country));
            toast.success(`Address`,{
              position: 'bottom-right',
              autoClose: 500,
              theme : "dark",
              hideProgressBar: true,
            });
          }}
          title="Copy"
          className="cursor-pointer bg-white absolute right-0 top-0 w-8 h-8 rounded-full flex justify-center items-center hover:bg-cyan-200"
        >
          <GoCopy />
        </div>
      </div>
      <div className="flex items-center mt-3 gap-3">
        <button
          onClick={() => {
            handleChange(data);
          }}
          className={`border-2 flex items-center gap-2 relative shadow-logBtn overflow-hidden bg-black text-white hover:border-black rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-black before:content-[''] before:left-full before:absolute before:top-0 before:bottom-0 before:right-0 before:bg-white before:z-[3] before:transition-all before:ease-in-out hover:before:left-0 lg:py-[5px] lg:px-6 lg:text-base`}
        >
          <span className="z-[5]">Change</span>
        </button>
        <button
          onClick={handleDelete}
          className={`border-2 flex items-center gap-2 relative shadow-logBtn overflow-hidden bg-white text-black border-black rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:left-full before:absolute before:top-0 before:bottom-0 before:right-0 before:bg-black before:z-[3] before:transition-all before:ease-in-out hover:before:left-0 lg:py-[5px] lg:px-6 lg:text-base`}
        >
          <span className="z-[5]">Delete</span>
        </button>
      </div>
    </div>
  );
}

export default AddressCart;
