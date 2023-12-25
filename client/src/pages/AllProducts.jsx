import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import Product from "../components/Product/Product";
import { nanoid } from "nanoid";

function AllProducts() {
  const { Allproducts } = useSelector((s) => s?.products);

  return (
    <UserLayout>
      <ul className="flex px-12">
        {Allproducts && (
          <>
            {" "}
            {Allproducts.map((el) => {
              return <Product key={nanoid(4)} data={el} />;
            })}{" "}
          </>
        )}
      </ul>
    </UserLayout>
  );
}

export default AllProducts;
