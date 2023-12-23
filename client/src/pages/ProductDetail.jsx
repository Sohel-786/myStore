import { useLocation } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

function ProductDetail(){
    const { state } = useLocation();

    return (
        <UserLayout>
                <div className="grid grid-cols-2 px-20 py-8 w-full">
                    <div className="">
                        <img src={state.thumbnail.secure_url} alt="Product Image" />
                    </div>
                </div>
        </UserLayout>
    )
}

export default ProductDetail;