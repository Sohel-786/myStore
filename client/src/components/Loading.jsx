import { useLocation } from "react-router-dom";

function Loading() {
  const location = useLocation();
  return (
    <div
      className={`bg-white flex w-[100vw] h-[100vh] justify-center items-center`}
    >
      <img src="/assets/loadingGif.gif" className="w-12" alt="Loading..." />
    </div>
  );
}

export default Loading;
