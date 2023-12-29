import { useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import CommonDrawer from "../components/CommonDrawer";

function WishlistPage() {
  const navigate = useNavigate();
  return (
    <UserLayout>
      <div className="flex px-28 py-8 max-w-[1280px] relative">
        <CommonDrawer />
      </div>
    </UserLayout>
  );
}

export default WishlistPage;
