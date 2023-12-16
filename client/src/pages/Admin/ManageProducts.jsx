import { useSelector } from "react-redux";
import AdminLayout from "../../layouts/AdminLayout";
import { nanoid } from "@reduxjs/toolkit";
import ProductModification from "../../components/Product/ProductModification";

function ManageProducts(){

    const { Allproducts } = useSelector((s) => s.products);

    return (
        <AdminLayout>
            {
                Allproducts.map((el) => {
                    return <ProductModification key={nanoid(4)} data={el} />
                })
            }
        </AdminLayout>
    )
}

export default ManageProducts;