function AdminLayout() {
  return (
    <section>
      <header className="px-8 py-2 shadow-header border-b-[1px] border-gray-300 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/assets/MyLogo2.svg"
            alt="logo"
            className="w-44 aspect-auto rounded-md"
          />
        </div>

        <ul className="flex justify-center items-center gap-8 font-Roboto font-semibold tracking-wide">
          <li className="relative font-bold pb-1 cursor-pointer before:absolute before:h-1 before:w-0 before:bottom-0 before:bg-black hover:before:w-full focus:before:w-full hover:before:duration-200 before:ease-in before:duration-300 hover:scale-110 transition-all duration-200">
            Manage All Products
          </li>

          <li className="h-full text-gray-400 text-2xl relative top-[-2px]">
            |
          </li>

          <li className="relative font-bold pb-1 cursor-pointer before:absolute before:h-1 before:w-0 before:bottom-0 before:bg-black hover:before:w-full focus:before:w-full hover:before:duration-200 before:ease-in before:duration-300 hover:scale-110 transition-all duration-200">
            Add New Product
          </li>
          <li className="h-full text-gray-400 text-2xl relative top-[-2px]">
            |
          </li>
          <li className="relative font-bold pb-1 cursor-pointer before:absolute before:h-1 before:w-0 before:bottom-0 before:bg-black hover:before:w-full focus:before:w-full hover:before:duration-200 before:ease-in before:duration-300 hover:scale-110 transition-all duration-200">
            Delivered Orders
          </li>
        </ul>
      </header>
    </section>
  );
}

export default AdminLayout;
