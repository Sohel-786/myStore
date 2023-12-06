import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import { useDispatch } from "react-redux";
import { checkIsLoggedIn } from "./redux/slices/authSlice";

function App(){
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(checkIsLoggedIn());
  },[]);

  return <>
      <LandingPage />
  </>
}

export default App;