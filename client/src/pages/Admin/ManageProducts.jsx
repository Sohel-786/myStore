import { useSelector } from "react-redux";
import AdminLayout from "../../layouts/AdminLayout";
import { nanoid } from "@reduxjs/toolkit";
import ProductModification from "../../components/Product/ProductModification";
import { useState } from "react";
import ProductCreateUpdate from "../../components/ProductCreateUpdate";
import { IoClose } from "react-icons/io5";

function ManageProducts() {
  const { Allproducts } = useSelector((s) => s.products);
  const [showUpdateSection, setShowUpdateSection] = useState(false);
  const [productData, setProductData] = useState(null);

  function handleUpdate(data) {
    setProductData(data);
    setShowUpdateSection(true);
  }

  function handleClose() {
    setProductData(null);
    setShowUpdateSection(false);
  }
  return (
    <AdminLayout>
      <ul className="flex px-8 py-5 gap-6">
        {Allproducts.map((el) => {
          return (
            <ProductModification
              key={nanoid(4)}
              data={el}
              handleUpdate={handleUpdate}
            />
          );
        })}
      </ul>

      {showUpdateSection && (
        <section className="bg-white absolute top-0 left-0 right-0 z-50">
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
