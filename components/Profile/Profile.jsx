"use client";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import {
  AiOutlineHeart,
  AiOutlineQuestionCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { RiEdit2Line } from "react-icons/ri";
import { BsPencil } from "react-icons/bs";
import { MdDashboard, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";

export default function Profile() {
  const router = useRouter();
  return (
    <div className=" sm:w-[30rem] w-full bg-[#fff] text-white">
      {/* Header */}
      <div className="relative flex items-center bg-[#341266] justify -between px-4 py-4 pb-10">
        {/* <FaArrowLeft className="text-2xl absolute top-8 left-3" /> */}
        <h1 className="text-xl font-semibold mx-auto transform pt-5  -translate-x-1">
          Profile
        </h1>
      </div>

      {/* Profile Section */}
      <div className="relative flex flex-col -mb-5 items-center bg-[#341266] pt-8">
        <div className="relative -mb-5">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          {/* <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
            <MdEdit className="text-black" />
          </div> */}
        </div>
      </div>

      {/* Notification Box */}
      {/* <div className="bg-white mx-4 mt-[-1rem] rounded-lg py-4 px-6 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="bg-[#4B37BC] p-2 rounded-full">
            <AiOutlineQuestionCircle className="text-white text-2xl" />
          </div>
          <div>
            <p className="text-sm font-bold">Complete Your Profile To Discover New Campaigns</p>
            <p className="text-sm text-gray-600">And Get Instant Discounts!</p>
            <button className="text-purple-700 font-semibold mt-1">Finish Setting Up</button>
          </div>
        </div>
      </div> */}

      {/* Menu Items */}
      <div className="mt-16 w-full bg-white">
        {/* Menu Item */}
        <div
          onClick={() => router.push("/analytics")}
          className="flex items-center cursor-pointer justify-between gap-2 px-6 py-5 border-y border-[#ccc] mx-5"
        >
          <MdDashboard className="text-2xl text-black" />
          <span className="flex-grow ml-4 text-black">Analytics</span>
        </div>
        {/* <div className="flex items-center justify-between gap-2 px-6 py-5 border-y border-[#ccc] mx-5">
          <AiOutlineHeart className="text-2xl text-black" />
          <span className="flex-grow ml-4 text-black">Interests</span>
        </div> */}

        <div
          onClick={() => router.push("/helpdesk")}
          className="flex cursor-pointer items-center justify-between gap-2 px-6 py-5 border-b border-[#ccc] mx-5"
        >
          <AiOutlineQuestionCircle className="text-2xl text-black" />
          <span className="flex-grow ml-4 text-black">Help Desk</span>
        </div>

        {/* <div className="flex items-center justify-between gap-2 px-6 py-5 border-b border-[#ccc] mx-5">
          <RiEdit2Line className="text-2xl text-black" />
          <span className="flex-grow ml-4 text-black">Blogs Desk</span>
        </div> */}

        {/* <div className="flex items-center justify-between gap-2 px-6 py-5 border-b border-[#ccc] mx-5">
          <BsPencil className="text-2xl text-black" />
          <span className="flex-grow ml-4 text-black">Edit Profile</span>
        </div> */}

        <div
          onClick={() => auth.signOut()}
          className="flex items-center justify-between gap-2 px-6 py-5 border-b border-[#ccc] mx-5"
        >
          <AiOutlineLogout className="text-2xl text-black" />
          <span className="flex-grow ml-4 text-black">Log out</span>
        </div>
      </div>
    </div>
  );
}
