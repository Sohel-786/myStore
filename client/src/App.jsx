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
import MenPage from "./pages/MenPage";
import WomenPage from "./pages/WomenPage";
import KidsPage from "./pages/KidsPage";
import Notfound from "./pages/Notfound";
import Denied from "./pages/Denied";
import AuthRoute from "./Auth/AuthRoute";
import CurrentActiveRoute from "./Auth/CurrentActiveRoute";
import NotLoggedIn from "./pages/NotLoggedIn";

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

        <Route element={<CurrentActiveRoute />}>
          <Route path="/forgot-password" element={<ForgottenPassword />} />
        </Route>

        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        <Route
          path="/all-products"
          element={networkRequest ? <AllProducts /> : <Loading />}
        />

        <Route
          path="/men"
          element={networkRequest ? <MenPage /> : <Loading />}
        />

        <Route
          path="/women"
          element={networkRequest ? <WomenPage /> : <Loading />}
        />

        <Route
          path="/kids"
          element={networkRequest ? <KidsPage /> : <Loading />}
        />

        <Route
          path="/product-details/:id"
          element={networkRequest ? <ProductDetail /> : <Loading />}
        />

        <Route element={<AuthRoute allowedRoles={["ADMIN"]} />}>
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

          <Route
            path="/admin-view"
            element={networkRequest ? <Dashboard /> : <Loading />}
          />
        </Route>

        <Route element={<AuthRoute allowedRoles={["ADMIN", "USER"]} />}>
          <Route
            path="/profile"
            element={networkRequest ? <Profile /> : <Loading />}
          />

          <Route
            path="/checkout/:orderId"
            element={networkRequest ? <Result /> : <Loading />}
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
            path="/user/wishlist"
            element={networkRequest ? <WishlistPage /> : <Loading />}
          />

          <Route
            path="/user/bag"
            element={networkRequest ? <BagPage /> : <Loading />}
          />
        </Route>

        <Route path="/not-loggedIn" element={<NotLoggedIn />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
