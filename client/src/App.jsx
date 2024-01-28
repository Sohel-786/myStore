import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkIsLoggedIn } from "./redux/slices/authSlice";
import { Route, Routes } from "react-router-dom";
import { getAllProducts } from "./redux/slices/productSlice";
import { getAllOrders } from "./redux/slices/orderSlice";
import Loading from "./components/Loading";
import LandingPage from "./pages/LandingPage";
const AddProduct = lazy(() => import("./pages/Admin/AddProduct"));
const ManageProducts = lazy(() => import("./pages/Admin/ManageProducts"));
const Profile = lazy(() => import("./pages/Profile"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ForgottenPassword = lazy(() => import("./pages/ForgottenPassword"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const BagPage = lazy(() => import("./pages/BagPage"));
const CheckoutPage = lazy(() => import("./pages/Checkout/CheckoutPage"));
const Result = lazy(() => import("./pages/Checkout/Result"));
const Orders = lazy(() => import("./pages/OrdersPage"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const History = lazy(() => import("./pages/Admin/History"));
const Purchased = lazy(() => import("./pages/Purchased"));
const MenPage = lazy(() => import("./pages/MenPage"));
const WomenPage = lazy(() => import("./pages/WomenPage"));
const KidsPage = lazy(() => import("./pages/KidsPage"));

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
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<Loading />}>
                <ForgottenPassword />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/reset-password/:resetToken"
          element={
            <Suspense fallback={<Loading />}>
              <ResetPassword />
            </Suspense>
          }
        />

        <Route
          path="/all-products"
          element={
            networkRequest ? (
              <Suspense fallback={<Loading />}>
                <AllProducts />
              </Suspense>
            ) : (
              <Loading />
            )
          }
        />

        <Route
          path="/men"
          element={
            networkRequest ? (
              <Suspense fallback={<Loading />}>
                <MenPage />
              </Suspense>
            ) : (
              <Loading />
            )
          }
        />

        <Route
          path="/women"
          element={
            networkRequest ? (
              <Suspense fallback={<Loading />}>
                <WomenPage />
              </Suspense>
            ) : (
              <Loading />
            )
          }
        />

        <Route
          path="/kids"
          element={
            networkRequest ? (
              <Suspense fallback={<Loading />}>
                <KidsPage />
              </Suspense>
            ) : (
              <Loading />
            )
          }
        />

        <Route
          path="/product-details/:id"
          element={
            networkRequest ? (
              <Suspense fallback={<Loading />}>
                <ProductDetail />
              </Suspense>
            ) : (
              <Loading />
            )
          }
        />

        <Route
          element={
            networkRequest ? (
              <AuthRoute allowedRoles={["ADMIN"]} />
            ) : (
              <Loading />
            )
          }
        >
          <Route
            path="/add-product"
            element={
              networkRequest ? (
                <Suspense fallback={<Loading />}>
                  <AddProduct />
                </Suspense>
              ) : (
                <Loading />
              )
            }
          />

          <Route
            path="/manage-products"
            element={
              networkRequest ? (
                <Suspense fallback={<Loading />}>
                  <ManageProducts />
                </Suspense>
              ) : (
                <Loading />
              )
            }
          />

          <Route
            path="/history"
            element={
              networkRequest ? (
                <Suspense fallback={<Loading />}>
                  <History />
                </Suspense>
              ) : (
                <Loading />
              )
            }
          />

          <Route
            path="/admin-view"
            element={
              networkRequest ? (
                <Suspense fallback={<Loading />}>
                  <Dashboard />
                </Suspense>
              ) : (
                <Loading />
              )
            }
          />
        </Route>

        <Route
          element={
            networkRequest ? (
              <AuthRoute allowedRoles={["ADMIN", "USER"]} />
            ) : (
              <Loading />
            )
          }
        >
          <Route
            path="/profile"
            element={
              networkRequest ? (
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              ) : (
                <Loading />
              )
            }
          />

          <Route
            path="/checkout/:orderId"
            element={
              networkRequest ? (
                <Suspense fallback={<Loading />}>
                  <Result />
                </Suspense>
              ) : (
                <Loading />
              )
            }
          />

          <Route
            path="/user/orders"
            element={
              networkRequest ? (
                <Suspense fallback={<Loading />}>
                  <Orders />
                </Suspense>
              ) : (
                <Loading />
              )
            }
          />

          <Route
            path="/user/purchased"
            element={
              networkRequest ? (
                <Suspense fallback={<Loading />}>
                  <Purchased />
                </Suspense>
              ) : (
                <Loading />
              )
            }
          />

          <Route
            path="/user/bag/checkout"
            element={
              networkRequest ? (
                <Suspense fallback={<Loading />}>
                  <CheckoutPage />
                </Suspense>
              ) : (
                <Loading />
              )
            }
          />

          <Route
            path="/user/wishlist"
            element={
              networkRequest ? (
                <Suspense fallback={<Loading />}>
                  <WishlistPage />
                </Suspense>
              ) : (
                <Loading />
              )
            }
          />

          <Route
            path="/user/bag"
            element={
              networkRequest ? (
                <Suspense fallback={<Loading />}>
                  <BagPage />
                </Suspense>
              ) : (
                <Loading />
              )
            }
          />
        </Route>

        <Route
          path="/not-loggedIn"
          element={networkRequest ? <NotLoggedIn /> : <Loading />}
        />
        <Route path="/denied" element={<Denied />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
