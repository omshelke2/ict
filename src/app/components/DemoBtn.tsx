'use client';

import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import axios from "axios";

const DemoBtn = () => {
  const router = useRouter();

  const onLogout = async () => {
    try {
      const response = await axios.post("/api/users/logout");
      
      // Log the response data
      console.log(response.data); // You can still log it if needed
      
      // Redirect to login
      router.push("/login");
    } catch (error) {
      // Check if the error is an instance of Error
      if (axios.isAxiosError(error)) {
        console.error(error.message); // Axios error message
      } else {
        console.error("An unexpected error occurred"); // General error message
      }
    }
  };

  return (
    <button
      onClick={onLogout}
      type="button"
      className="hover:bg-gray-100 ring-1 ring-black text-black duration-200 transition-all px-2 py-1 rounded text-sm flex items-center justify-center gap-2 max-sm:text-lg"
    >
      Logout{" "}
      <span>
        <FaArrowRightLong className="h-3 w-3" />
      </span>
    </button>
  );
};

export default DemoBtn;
