import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import Product from "../components/Product/Product";

function AllProducts() {
  const { Allproducts } = useSelector((s) => s?.products);

  return (
    <UserLayout>
      <ul className="flex px-12 py-7">
        {Allproducts && (
          <>
            {" "}
            {Allproducts.map((el) => {
              return <Product data={el} />;
            })}{" "}
          </>
        )}
      </ul>
    </UserLayout>
  );
}

export default AllProducts;
