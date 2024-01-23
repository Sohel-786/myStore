import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import Product from "../components/Product/Product";
import { nanoid } from "nanoid";
import Loading from "../components/Loading";
import CommonDrawer from "../components/CommonDrawer";
import Filter from "../components/Filter";

function AllProducts() {
  const { Allproducts } = useSelector((s) => s?.products);

  return (
    <UserLayout>
      <div className="w-full flex">
        <div className="w-[20%] scroll overflow-y-scroll sticky h-[80vh] top-[180px] border-t-[1px] pt-2 pb-12 border-gray-200">
          <Filter data={Allproducts} />
        </div>
        <ul className="flex w-[80%] gap-5 justify-center flex-wrap gap-y-6">
          {Allproducts ? (
            <>
              {" "}
              {Allproducts.map((el) => {
                return <Product key={nanoid(4)} data={el} />;
              })}{" "}
            </>
          ) : (
            <Loading />
          )}
        </ul>
      </div>
    </UserLayout>
  );
}

export default AllProducts;
