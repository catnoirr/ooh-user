"use client";

import React, { useState, useEffect } from "react";

const CouponCard = ({ data, redeemCoupon }) => {
  const [vendor, setVendor] = useState({});
  const formattedExpiry = new Date(data.expiry).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const isExpired = new Date(data.expiry) < new Date();

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await fetch(
          `/api/getVendor?vendorId=${data.vendorId}`
        );
        const result = await response.json();
        setVendor(result);
      } catch (error) {
        console.error("Error fetching vendor details:", error);
      }
    };

    fetchVendorDetails();
  }, [data.vendorId]);

  return (
    <div className="sm:w-[12.5rem] w-[10rem] sm:min-h-[13rem] min-h-[10rem] bg-[#F2F0F5] sm:px-5 px-2 pb-2 overflow-hidden mt-4">
      <div className="text-gray-700 text-center sm:text-[10px] text-[8px]">
        <p className="pt-[2px] text-[#9A9A9A] font-extralight">
          Coupon Id:{" "}
          <span className="font-medium text-[#9A9A9A]">{data.couponId}</span>
        </p>
      </div>

      <div className="relative text-center px-2 flex items-center">
        <img
          src="/image.png"
          alt="TradeFlex Logo"
          className="h-[24px] w-[24px]"
        />
        <h2 className="sm:text-md text-xs font-semibold mx-auto">
          {vendor.businessName}
        </h2>
        <div className="border-t-2 border-dashed sm:w-[12rem] w-[10rem] -left-[20px] absolute border-purple-900 -bottom-1"></div>
        <div className="h-10 w-10 absolute top-1/2 sm:-left-10 -left-8 bg-[#341266] rounded-full"></div>
        <div className="h-10 w-10 absolute top-1/2 sm:-right-10 -right-8 bg-[#341266] rounded-full"></div>
      </div>
      <div className="relative">
        <img
          src="/coupon.png"
          alt="TradeFlex Logo"
          className="sm:h-[4.5rem] h-[4rem] mt-2 mx-auto"
        />
        <h2 className="font-[800] text-lg absolute top-2 left-1/2 -translate-x-2">
          {data.couponAmount}
        </h2>
      </div>

      <div className="text-black text-[10px] mt-2">
        <p className="font-thin sm:text-xs text-[10px]">
          Expiry Date: <span className="ml-2">{formattedExpiry}</span>
        </p>
        <div className="flex items-start leading-tight gap-2 mt-1 sm:text-xs text-[10px]">
          <p className="font-thin">
            Vendor <br /> Address:
          </p>
          <p>{vendor.address || "Loading..."}</p>
        </div>
        {data.isRedeemed ? (
          <div className="bg-gray-300 mt-2 text-gray-700 text-xs text-center px-3 py-1 rounded">
            Redeemed
          </div>
        ) : isExpired ? (
          <div className="bg-gray-300 mt-2 text-gray-700 text-xs text-center px-3 py-1 rounded">
            Expired
          </div>
        ) : (
          <div
            onClick={() => redeemCoupon(data)}
            className="bg-gray-300 mt-2 text-gray-700 cursor-pointer text-xs text-center px-3 py-1 rounded"
          >
            Redeem
          </div>
        )}
        {/* {isExpired && !data.isRedeemed && (
          <div className="mt-2 text-center">
            <button
              onClick={() => redeemCoupon(data)}
              className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded"
            >
              Redeem
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CouponCard;
