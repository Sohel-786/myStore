import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import Product from "../components/Product/Product";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

function MenPage() {
  const { Allproducts } = useSelector((s) => s?.products);
  const [menProducts, setMenProducts] = useState();

  useEffect(() => {
    if (Allproducts) {
      let temp = Allproducts.filter((el) => {
        if (el.category === "men") {
          return el;
        }
      });

      setMenProducts(temp);
    }
  }, [Allproducts]);

  return (
    <UserLayout>
      {menProducts ? (
        <ul className="flex px-12  gap-5 justify-center flex-wrap gap-y-6">
          <>
            {menProducts.map((el) => {
              return <Product key={nanoid(4)} data={el} />;
            })}
          </>
        </ul>
      ) : <Loading />}
    </UserLayout>
  );
}

export default MenPage;
