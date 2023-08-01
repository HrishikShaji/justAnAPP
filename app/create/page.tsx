"use client";
import React from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth");
    }
  }, [session.status, session.data]);

  if (session.status === "loading") {
    return (
      <div className=" px-10 py-5  bg-neutral-900 h-screen w-full flex flex-col justify-center items-center">
        <ClipLoader color="white" size={50} />
      </div>
    );
  }
  if (session.status === "authenticated") {
    return (
      <>
        <Toaster />
        <div className=" px-10 pt-20 pb-5 h-screen  bg-neutral-900">
          <PostForm />
        </div>
      </>
    );
  }
};

export default page;
