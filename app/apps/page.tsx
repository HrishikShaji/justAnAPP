"use client";
import React from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";

const page = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-500"></div>
  );
};

export default page;
