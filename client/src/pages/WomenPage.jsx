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
  const [sortedProducts, setSortedProducts] = useState();

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

  useEffect(() => {
    if (womenProducts) {
      handleSorting(womenProducts);
    }
  }, [womenProducts]);

  function handleSorting(data) {
    setSortedProducts(data);
  }

  return (
    <UserLayout>
      <div className="flex w-full">
        <div className="w-[20%] scroll overflow-y-scroll sticky h-[80vh] top-[180px] border-t-[1px] border-b-[1px] pt-2 pb-12 border-gray-200">
          {womenProducts && (
            <Filter data={womenProducts} sort={handleSorting} />
          )}
        </div>
        {sortedProducts ? (
          sortedProducts.length > 0 ? (
            <ul className="flex w-[80%] gap-5 justify-center flex-wrap gap-y-6">
              {" "}
              {sortedProducts.map((el) => {
                return <Product key={nanoid(4)} data={el} />;
              })}{" "}
            </ul>
          ) : (
            <div className="h-[50vh] w-[80%] flex justify-center items-center">
              <img
                src="/assets/Sorry.jpg"
                alt="Sorry No Product Found"
                className="max-w-full max-h-full"
              />
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </UserLayout>
  );
}

export default WomenPage;
