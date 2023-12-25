import { toast } from "react-toastify";
import axiosInstance from "../config/axiosInstance";
import { useDispatch } from "react-redux";

export async function addToBag(id) {
   const dispatch = useDispatch();

  let res = axiosInstance.post(`/user/bag/${id}`);
  toast.promise(
    res,
    {
      pending: "Wait!, Adding product to the bag",
      success: "Bag Updated",
      error: "Something Went Wrong",
    },
    {
      hideProgressBar: true,
      autoClose: 2000,
      theme: "dark",
    }
  );

  res = await res;

  if(res?.data?.success){
    dis
  }
}
