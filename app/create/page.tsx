"use client";
import React from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <>
      <Toaster />
      <div className=" px-10 pt-20 pb-5 h-screen  bg-neutral-900">
        <PostForm />
      </div>
    </>
  );
};

export default page;
