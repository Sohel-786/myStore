import ProductCreateUpdate from "../../components/ProductCreateUpdate";
import AdminLayout from "../../layouts/AdminLayout";

function AddProduct(){
    return (
        <AdminLayout>
            <ProductCreateUpdate />
        </AdminLayout>
    )
}

export default AddProduct;