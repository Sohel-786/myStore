import { useNavigate } from "react-router-dom";

function Denied() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-[200px] font-semibold">403</h1>
      <p className=" text-xl relative text-white -top-20 font-bold bg-black font-mono -rotate-12">
        Access Denied
      </p>
      <button
        aria-label="Go Back to Previous Page"
        onClick={() => {
          navigate('/');
        }}
        className="relative -top-10 border-2 border-black px-5 py-2 rounded-lg font-bold transition-all duration-300 hover:bg-purple-900 hover:scale-125 hover:text-white hover:border-sky-300"
      >
        Go Back
      </button>
    </div>
  );
}

export default Denied;
