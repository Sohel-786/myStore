import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import { useDispatch } from "react-redux";
import { checkIsLoggedIn } from "./redux/slices/authSlice";
import { Route, Routes } from "react-router-dom";
import AdminFront from "./pages/Admin/AdminFront";
import AddProduct from "./pages/Admin/AddProduct";
import { getAllProducts } from "./redux/slices/productSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
    dispatch(getAllProducts());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-view" element={<AdminFront />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/manage-products" element={<AddProduct />} />
        <Route path="/history" element={<AddProduct />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
