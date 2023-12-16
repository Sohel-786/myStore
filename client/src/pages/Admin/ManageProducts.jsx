import { useSelector } from "react-redux";
import AdminLayout from "../../layouts/AdminLayout";
import Product from "../../components/Product/Product";
import { nanoid } from "@reduxjs/toolkit";

function ManageProducts(){

    const { Allproducts } = useSelector((s) => s.products);

    return (
        <AdminLayout>
            {
                Allproducts.map((el) => {
                    return <Product key={nanoid(4)} data={el} />
                })
            }
        </AdminLayout>
    )
}

export default ManageProducts;