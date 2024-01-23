import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import Product from "../components/Product/Product";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

function WomenPage() {
  const { Allproducts } = useSelector((s) => s?.products);
  const [womenProducts, setWomenProducts] = useState();

  useEffect(() => {
    if (Allproducts) {
      let temp = Allproducts.filter((el) => {
        if (el.category === "women") {
          return el;
        }
      });

      setWomenProducts(temp);
    }
  }, [Allproducts]);

  return (
    <UserLayout>
      <ul className="flex px-12  gap-5 justify-center flex-wrap gap-y-6">
        {womenProducts ? (
          <>
            {womenProducts.map((el) => {
              return <Product key={nanoid(4)} data={el} />;
            })}
          </>
        ) : <Loading />}
      </ul>
    </UserLayout>
  );
}

export default WomenPage;