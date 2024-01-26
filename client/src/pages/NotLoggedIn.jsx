import UserLayout from "../layouts/UserLayout";

function NotLoggedIn() {
  return (
    <UserLayout>
      <div className="h-[70vh] w-full flex flex-col justify-center items-center">
        <img
          src="/assets/Unauthenticated.jpg"
          alt="Please Login"
          className="max-w-[40%] aspect-auto max-h-[50%]"
        />

        <p className="mt-2 font-Nova font-bold text-lg text-blue-500">
          Authentication Required,{" "}
          <span className="text-gray-500">
            Please <span className="capitalize text-orange-600">login</span> to
            access this page.
          </span>{" "}
        </p>
      </div>
    </UserLayout>
  );
}

export default NotLoggedIn;
