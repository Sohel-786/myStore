import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import Product from "../components/Product/Product";
import { nanoid } from "nanoid";
import Loading from "../components/Loading";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";

function AllProducts() {
  const { Allproducts } = useSelector((s) => s?.products);
  const [sortedProducts, setSortedProducts] = useState();

  useEffect(() => {
    if (Allproducts) {
      handleSorting(Allproducts);
    }
  }, [Allproducts]);

  function handleSorting(data) {
    setSortedProducts(data);
  }

  return (
    <UserLayout>
      <div className="w-full flex">
        <div className="w-[20%] scroll overflow-y-scroll sticky h-[80vh] top-[180px] border-t-[1px] border-b-[1px] pt-2 pb-12 border-gray-200">
          {Allproducts && <Filter data={Allproducts} sort={handleSorting} />}
        </div>
        <>
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
        </>
      </div>
    </UserLayout>
  );
}

export default AllProducts;
