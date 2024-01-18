import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

function Dashboard(){
    const [ orders, setOrders ] = useState(null);

    useEffect(() => {

    }, []);


    return(
        <AdminLayout>
            <div className="w-full flex flex-col px-7 py-5">
                {
                    
                }
            </div>
        </AdminLayout>
    )
}

export default Dashboard;