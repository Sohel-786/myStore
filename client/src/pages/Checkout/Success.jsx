import { useLocation, useSearchParams } from "react-router-dom";

function Success(){
    const location = useLocation();
    const search = useSearchParams();

    console.log(location, search);
    return(<>
    
    </>)
}

export default Success;