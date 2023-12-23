import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import { useDispatch, useSelector } from "react-redux";
import { checkIsLoggedIn } from "./redux/slices/authSlice";
import { Route, Routes } from "react-router-dom";
import AdminFront from "./pages/Admin/AdminFront";
import AddProduct from "./pages/Admin/AddProduct";
import { getAllProducts } from "./redux/slices/productSlice";
import ManageProducts from "./pages/Admin/ManageProducts";
import Profile from "./pages/Profile";
import Loading from "./components/Loading";
import ForgotPassword from "./components/Profile/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ForgottenPassword from "./pages/ForgottenPassword";
import AllProducts from "./pages/AllProducts";

function App() {
  const dispatch = useDispatch();
  const { networkRequest } = useSelector((s) => s?.auth);

  useEffect(() => {
    dispatch(checkIsLoggedIn());
    dispatch(getAllProducts());
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={networkRequest ? <LandingPage /> : <Loading />}
        />
        <Route
          path="/profile"
          element={networkRequest ? <Profile /> : <Loading />}
        />

        <Route path="/forgot-password" element={<ForgottenPassword />} />

        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        <Route
          path="/admin-view"
          element={networkRequest ? <AdminFront /> : <Loading />}
        />

        <Route path="/all-products" element={<AllProducts />} />
        <Route
          path="/add-product"
          element={networkRequest ? <AddProduct /> : <Loading />}
        />
        <Route
          path="/manage-products"
          element={networkRequest ? <ManageProducts /> : <Loading />}
        />
        <Route
          path="/history"
          element={networkRequest ? <AddProduct /> : <Loading />}
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
