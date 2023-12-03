import { IoIosSearch } from "react-icons/io";

function UserLayout({ children }) {
  return (
    <section>
      <header className="flex justify-center items-center">
        <div className="">
          <img
            src="https://classroom-react.netlify.app/assets/classroom.svg"
            alt="logo"
            className="w-36 aspect-auto"
          />
        </div>

        <div className="bg-black rounded-lg flex justify-center items-center">
          <IoIosSearch />
          <input
            className="bg-transparent"
            type="text"
            placeholder="Search for Products, Brands and More"
          />
        </div>
      </header>
    </section>
  );
}

export default UserLayout;
