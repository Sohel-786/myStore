import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import Product from "../components/Product/Product";
import { nanoid } from "nanoid";
import Loading from "../components/Loading";
import CommonDrawer from '../components/CommonDrawer';

function AllProducts() {
  const { Allproducts } = useSelector((s) => s?.products);

  return (
    <UserLayout>
      <ul className="flex px-12  gap-5 justify-center flex-wrap gap-y-6">
        {Allproducts ? (
          <>
            {" "}
            {Allproducts.map((el) => {
              return <Product key={nanoid(4)} data={el} />;
            })}{" "}
          </>
        ) : <Loading />}
      </ul>
    </UserLayout>
  );
}

export default AllProducts;
