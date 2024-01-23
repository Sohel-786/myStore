import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import Product from "../components/Product/Product";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Filter from "../components/Filter";

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
      <div className="flex w-full">
        <div className="w-[20%] scroll overflow-y-scroll sticky h-[80vh] top-[180px] border-t-[1px] border-b-[1px] pt-2 pb-12 border-gray-200">
          {womenProducts && <Filter data={womenProducts} />}
        </div>
        <ul className="flex w-[80%] gap-5 justify-center flex-wrap gap-y-6">
          {womenProducts ? (
            <>
              {womenProducts.map((el) => {
                return <Product key={nanoid(4)} data={el} />;
              })}
            </>
          ) : (
            <Loading />
          )}
        </ul>
      </div>
    </UserLayout>
  );
}

export default WomenPage;
