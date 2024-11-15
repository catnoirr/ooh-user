"use client";

import { FaBullhorn, FaGift, FaUser, FaRegUser } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Html5Qrcode } from "html5-qrcode";
import { IoMdQrScanner } from "react-icons/io";

export default function BottomNavBar() {
  const [isScanning, setIsScanning] = useState(false);
  const [qrScanner, setQrScanner] = useState(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const redirectFlag = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isScanning && !qrScanner) {
      const scannerInstance = new Html5Qrcode("qr-reader");

      scannerInstance
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            if (!redirectFlag.current) {
              console.log(decodedText);
              stopScanning(decodedText);
            }
          },
          (error) => {
            console.warn("QR Code scan error:", error);
          }
        )
        .then(() => {
          setQrScanner(scannerInstance);
        })
        .catch((err) => {
          console.error("Unable to start scanning", err);
          setShowPermissionModal(true); // Show modal if scanner fails to start
        });
    }

    return () => {
      if (qrScanner) {
        qrScanner.stop().then(() => {
          qrScanner.clear();
        });
      }
    };
  }, [isScanning, qrScanner]);

  const startScanning = () => {
    setIsScanning(true);
  };

  const stopScanning = (decodedText) => {
    if (qrScanner) {
      qrScanner.stop().then(() => {
        qrScanner.clear();
        setQrScanner(null);
      });
    }
    setIsScanning(false);

    if (!redirectFlag.current && typeof decodedText === "string") {
      redirectFlag.current = true;
      window.location.href = decodedText;
    }
  };

  const handleNavigation = (path) => {
    if (isScanning) {
      stopScanning();
    }
    router.push(path);
  };

  return (
    <div className="relative sm:max-w-[30rem] w-full bg-white mx-auto">
      <div className="fixed sm:max-w-[30rem] mx-auto bottom-0 inset-x-0 z-10 sm:h-24 h-20 flex justify-between bg-white rounded-t-3xl">
        <div className="relative flex justify-around w-full shadow-top-lg rounded-t-[1.5rem]">
          <div
            className="flex items-center justify-center w-1/5 mb-3"
            onClick={() => handleNavigation("/")}
          >
            <GoHome className="h-8 w-8 text-black" />
          </div>

          <div
            className="flex items-center justify-center w-1/5 mb-3"
            onClick={() => handleNavigation("/campaigns")}
          >
            <FaBullhorn className="h-8 w-8 text-black" />
          </div>

          <div className="flex items-center justify-center w-1/5 mb-3">
            <button onClick={isScanning ? stopScanning : startScanning}>
              <IoMdQrScanner className="text-[#B77DC4] h-8 w-8" />
            </button>
          </div>

          <div
            className="flex items-center justify-center w-1/5 mb-3"
            onClick={() => handleNavigation("/coupons")}
          >
            <FaGift className="h-8 w-8 text-black" />
          </div>

          <div
            className="flex items-center justify-center w-1/5 mb-3"
            onClick={() => handleNavigation("/profile")}
          >
            <FaRegUser className="h-8 w-8 text-black" />
          </div>
          <div className="h-[8px] w-[5rem] bg-[#B94BD2] rounded-b-full left-1/2 transform -translate-x-1/2 absolute top-0 mx-auto"></div>
        </div>
        <div className="sm:h-[6px] h-[4px] sm:w-[15rem] w-[9rem] bg-black rounded-full left-1/2 transform -translate-x-1/2 absolute bottom-3 mx-auto"></div>
      </div>

      {isScanning && (
        <div id="qr-reader" className="fixed top-[0] w-full h-[90vh]"></div>
      )}

      {/* Modal for Camera Permission */}
      {showPermissionModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[20rem] text-center">
            <h2 className="text-lg font-semibold mb-4">
              Camera Permission Needed
            </h2>
            <p className="mb-4">
              Please enable camera permissions in your device settings to use
              the QR scanner.
            </p>
            <button
              onClick={() => {
                setShowPermissionModal(false);
                router.push("/");
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
