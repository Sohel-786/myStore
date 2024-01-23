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
        <Filter data={Allproducts} />
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
