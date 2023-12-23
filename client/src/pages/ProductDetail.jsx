import { useLocation } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

function ProductDetail(){
    const { state } = useLocation();

    return (
        <UserLayout>
        </UserLayout>
    )
}

export default ProductDetail;