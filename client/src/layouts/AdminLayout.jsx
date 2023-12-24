import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { TiUser } from "react-icons/ti";
import { IoLogOut } from "react-icons/io5";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  return (
    <section>
      <header className="px-7 py-2 shadow-header border-b-[1px] border-gray-300 flex items-center justify-between select-none">
        <div onClick={() => {
          navigate('/')
        }} className="flex items-center cursor-pointer">
          <img
            src="/assets/MyLogo2.svg"
            alt="logo"
            className="w-44 aspect-auto rounded-md"
          />
        </div>

        <ul className="flex justify-center items-center gap-4 font-Roboto font-semibold tracking-wide text-sm">
          <li
            onClick={() => {
              navigate("/manage-products");
            }}
            className={`relative font-bold pb-1 cursor-pointer before:absolute before:h-1 ${
              pathname === "/manage-products" ? `before:w-full` : `before:w-0`
            } ${
              pathname === "/manage-products" ? `scale-110` : `hover:scale-110`
            } before:bottom-0 before:bg-black hover:before:w-full hover:before:duration-200 before:ease-in before:duration-300 transition-all duration-200`}
          >
            Manage All Products
          </li>

          <li className="h-full text-gray-400 text-2xl relative top-[-2px]">
            |
          </li>

          <li
            onClick={() => {
              navigate("/add-product");
            }}
            className={`relative font-bold pb-1 cursor-pointer before:absolute before:h-1 ${
              pathname === "/add-product" ? `before:w-full` : `before:w-0`
            } ${
              pathname === "/add-product" ? `scale-110` : `hover:scale-110`
            } before:bottom-0 before:bg-black hover:before:w-full hover:before:duration-200 before:ease-in before:duration-300  transition-all duration-200`}
          >
            Add New Product
          </li>
          <li className="h-full text-gray-400 text-2xl relative top-[-2px]">
            |
          </li>
          <li
            onClick={() => {
              navigate("/history");
            }}
            className={`relative font-bold pb-1 cursor-pointer before:absolute before:h-1 ${
              pathname === "/history" ? `before:w-full` : `before:w-0`
            } ${
              pathname === "/history" ? `scale-110` : `hover:scale-110`
            } before:bottom-0 before:bg-black hover:before:w-full hover:before:duration-200 before:ease-in before:duration-300 transition-all duration-200`}
          >
            Delivered Orders
          </li>
          <li className="h-full text-gray-400 text-2xl relative top-[-2px]">
            |
          </li>
          <li
            onClick={() => {
              navigate("/admin-view");
            }}
            className={`relative font-bold pb-1 cursor-pointer before:absolute before:h-1 ${
              pathname === "/admin-view" ? `before:w-full` : `before:w-0`
            } ${
              pathname === "/admin-view" ? `scale-110` : `hover:scale-110`
            } before:bottom-0 before:bg-black hover:before:w-full hover:before:duration-200 before:ease-in before:duration-300 transition-all duration-200`}
          >
            Dashboard
          </li>
        </ul>

        <div className="flex items-center justify-center gap-3">
          <Button
            onclick={() => {
              navigate("/");
            }}
            text={"Client View"}
          >
            <TiUser size={"18px"} />
          </Button>
          <Button
            onclick={async () => {
              const res = await dispatch(logout());

              if (res?.payload?.data) {
                scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                navigate("/");
              }
            }}
            text={"LogOut"}
          >
            <IoLogOut size={"18px"} />
          </Button>
        </div>
      </header>
      {children}
    </section>
  );
}

export default AdminLayout;
