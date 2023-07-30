"use client";
import React from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";

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
      <div className="h-screen w-full flex justify-center items-center bg-gray-500"></div>
    );
  }
};
export default page;
