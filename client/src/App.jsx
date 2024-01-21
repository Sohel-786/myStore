import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import { useDispatch, useSelector } from "react-redux";
import { checkIsLoggedIn } from "./redux/slices/authSlice";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./pages/Admin/AddProduct";
import { getAllProducts } from "./redux/slices/productSlice";
import ManageProducts from "./pages/Admin/ManageProducts";
import Profile from "./pages/Profile";
import Loading from "./components/Loading";
import ForgotPassword from "./components/Profile/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ForgottenPassword from "./pages/ForgottenPassword";
import AllProducts from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetail";
import WishlistPage from "./pages/WishlistPage";
import BagPage from "./pages/BagPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import Result from "./pages/Checkout/Result";
import Orders from "./pages/OrdersPage";
import { getAllOrders } from "./redux/slices/orderSlice";
import Dashboard from "./pages/Admin/Dashboard";
import History from "./pages/Admin/History";
import Purchased from "./pages/Purchased";

function App() {
  const dispatch = useDispatch();
  const { networkRequest } = useSelector((s) => s?.auth);

  useEffect(() => {
    runOnce();
  }, []);

  async function runOnce() {
    await dispatch(checkIsLoggedIn());
    await dispatch(getAllProducts());
    dispatch(getAllOrders());
  }

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
          element={networkRequest ? <Dashboard /> : <Loading />}
        />

        <Route
          path="/all-products"
          element={networkRequest ? <AllProducts /> : <Loading />}
        />
        <Route
          path="/men"
          element={networkRequest ? <AllProducts /> : <Loading />}
        />
        <Route
          path="/women"
          element={networkRequest ? <AllProducts /> : <Loading />}
        />
        <Route
          path="/kids"
          element={networkRequest ? <AllProducts /> : <Loading />}
        />

        <Route
          path="/user/wishlist"
          element={networkRequest ? <WishlistPage /> : <Loading />}
        />

        <Route
          path="/user/bag"
          element={networkRequest ? <BagPage /> : <Loading />}
        />

        <Route
          path="/user/orders"
          element={networkRequest ? <Orders /> : <Loading />}
        />

        <Route
          path="/user/purchased"
          element={networkRequest ? <Purchased /> : <Loading />}
        />

        <Route
          path="/user/bag/checkout"
          element={networkRequest ? <CheckoutPage /> : <Loading />}
        />

        <Route
          path="/checkout/:orderId"
          element={networkRequest ? <Result /> : <Loading />}
        />

        <Route
          path="/product-details/:id"
          element={networkRequest ? <ProductDetail /> : <Loading />}
        />

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
          element={networkRequest ? <History /> : <Loading />}
        />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
