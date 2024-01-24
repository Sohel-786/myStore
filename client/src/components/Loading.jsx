import { useLocation } from "react-router-dom";

function Loading() {
  const location = useLocation();
  return (
    <div
      className={`${
        (location.pathname !== "/women" ||
        location.pathname !== "/men" ||
        location.pathname !== "/kids" ||
        location.pathname !== '/all-products')
          ? `w-[100vw] h-[100vh]`
          : `w-[full] h-[2000px]`
      } bg-white flex justify-center items-center`}
    >
      <img src="/assets/loadingGif.gif" className="w-12" alt="Loading..." />
    </div>
  );
}

export default Loading;
