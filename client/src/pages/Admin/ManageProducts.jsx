import { useSelector } from "react-redux";
import AdminLayout from "../../layouts/AdminLayout";
import { nanoid } from "@reduxjs/toolkit";
import ProductModification from "../../components/Product/ProductModification";
import { useEffect, useState } from "react";
import ProductCreateUpdate from "../../components/ProductCreateUpdate";
import { IoClose } from "react-icons/io5";
import { enableBodyScroll } from "body-scroll-lock";

function ManageProducts() {
  const { Allproducts } = useSelector((s) => s.products);
  const [showUpdateSection, setShowUpdateSection] = useState(false);
  const [productData, setProductData] = useState(null);
  const [products, setProducts] = useState();

  function handleUpdate(data) {
    setProductData(data);
    setShowUpdateSection(true);
  }

  function handleClose() {
    enableBodyScroll(document);
    setProductData(null);
    setShowUpdateSection(false);
  }

  useEffect(() => {
    if (Allproducts) {
      setProducts([...Allproducts]);
    }
  }, [Allproducts]);

  return (
    <AdminLayout>
      <div className="flex">
        <ul className="flex py-5 px-6 gap-4 justify-center mx-auto flex-wrap gap-y-6">
          {products &&
            products.reverse().map((el) => {
              return (
                <ProductModification
                  key={nanoid(4)}
                  data={el}
                  handleUpdate={handleUpdate}
                />
              );
            })}
        </ul>{" "}
      </div>

      {showUpdateSection && (
        <section className="bg-white fixed top-0 left-0 right-0 bottom-0 overflow-x-scroll z-50">
          <IoClose
            className="absolute right-4 top-2 cursor-pointer"
            size={"38px"}
            onClick={handleClose}
          />
          <ProductCreateUpdate
            ProductData={productData}
            closeProductUpdate={handleClose}
          />
        </section>
      )}
    </AdminLayout>
  );
}

export default ManageProducts;
