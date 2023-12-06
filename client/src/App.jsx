import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import { useDispatch } from "react-redux";
import { checkIsLoggedIn } from "./redux/slices/authSlice";
import { Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
