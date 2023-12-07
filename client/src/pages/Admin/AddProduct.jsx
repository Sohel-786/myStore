import ProductCreateUpdate from "../../components/CourseCreateUpdate";
import AdminLayout from "../../layouts/AdminLayout";

function AddProduct(){
    return (
        <AdminLayout>
            <ProductCreateUpdate />
        </AdminLayout>
    )
}

export default AddProduct;