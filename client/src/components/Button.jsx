import { useLocation } from "react-router-dom";

function Button({ text, onclick, children }) {
  const location = useLocation();

  return (
    <span
      type="button"
      onClick={onclick}
      className={`border-2 flex items-center gap-2 relative shadow-logBtn ${
        (location.pathname === "/profile" || location.pathname === "/all-products") && `border-black`
      } ${
        (location.pathname === "/profile"  || location.pathname === "/all-products") && `text-black`
      } hover:border-black rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs hover:text-white before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gray-950 before:-z-10 before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base`}
    >
      {children} {text}
    </span>
  );
}

export default Button;
