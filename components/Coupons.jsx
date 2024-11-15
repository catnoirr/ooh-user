"use client";
import { MyContext } from "@/context/MyContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CouponCard from "./CouponCard";
import { IoLogOut } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import BottomBar from "./BottomBar";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, fetchUser } = useContext(MyContext);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setCoupons(user?.coupons || []);
  }, [user]);

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const redeemCoupon = async (coupon) => {
    try {
      // Update user's coupon
      coupon = { ...coupon, isRedeemed: true };
      const coupons = user.coupons.filter(
        (c) => c.couponId !== coupon.couponId
      );
      await fetch("/api/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.userId,
          coupons: coupons ? [...coupons, coupon] : [coupon],
        }),
      });
      // setCoupons([...coupons, coupon]);
      toast.success("Coupon redeemed successfully.");
      fetchUser();
    } catch (error) {
      console.error("Error updating user/vendor data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#341266] w-screen max-w-[30rem] mx-auto flex flex-col items-center py-6 sm:px-4 px-1 overflow-y-scroll relative ">
      {/* <IoLogOut
        className="absolute top-6 right-4 text-4xl cursor-pointer text-white"
        onClick={() => {
          toast.success("Logged out successfully.");
          signOut(auth);
          router.push("/sign-in");
        }}
      /> */}
      <h2 className="text-2xl font-bold mb-4 text-gray-200">Coupons</h2>
      <div className="border-t border-[#646464] w-full px-5"></div>

      {coupons.length > 0 ? (
        <div className="space-y-4 flex flex-wrap justify-between w-full px-4">
          {coupons.map((coupon) => (
            <>
              <CouponCard data={coupon} redeemCoupon={redeemCoupon} />
            </>
          ))}
        </div>
      ) : (
        <>
          {" "}
          <div className="space-y-4 w-full">
            {coupons?.map((coupon) => (
              <>
                <div
                  key={coupon.couponId}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between w-full max-w-sm mx-auto space-x-4"
                >
                  <p className="text-lg font-semibold text-gray-700">
                    Coupon Value:{" "}
                    <span className="text-green-600">
                      ₹{coupon.couponAmount}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Coupon ID: {coupon.couponId}
                  </p>
                  <p className="text-sm text-gray-500">
                    Vendor ID: {coupon.vendorId}
                  </p>
                  <button
                    onClick={() => redeemCoupon(coupon)}
                    className="mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    disabled={coupon.isRedeemed}
                  >
                    {coupon.isRedeemed ? "Redeemed" : "Redeem"}
                  </button>
                </div>
              </>
            ))}
          </div>
        </>
      )}
      <div className="sm:max-w-[30rem] w-full fixed bottom-0 left-[50%] transform -translate-x-[50%]">
        <BottomBar />
      </div>
    </div>
  );
};

export default Coupons;
