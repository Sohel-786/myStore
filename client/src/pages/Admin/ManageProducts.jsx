import { useSelector } from "react-redux";
import AdminLayout from "../../layouts/AdminLayout";
import Product from "../../components/Product/Product";

function ManageProducts(){

    const { Allproducts } = useSelector((s) => s.products);

    return (
        <AdminLayout>
            {
                Allproducts.map((el) => {
                    return <Product data={el} />
                })
            }
        </AdminLayout>
    )
}

export default ManageProducts;