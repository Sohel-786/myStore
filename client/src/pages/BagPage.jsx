import { useSelector } from "react-redux";
import CommonDrawer from "../components/CommonDrawer";
import UserLayout from "../layouts/UserLayout";

function BagPage() {
  const { bag } = useSelector((s) => s?.auth);

  return (
    <UserLayout>
      <div className="flex px-28 py-8 max-w-[1280px] relative mx-auto">
        <CommonDrawer />

        <div className="w-full flex flex-col"></div>
      </div>
    </UserLayout>
  );
}

export default BagPage;
