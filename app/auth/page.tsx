"use client";
import { onOpen } from "@/redux/slices/ModalSlice";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logIn } from "@/redux/slices/AuthSlice";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";

const page = () => {
  const session = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session.status, session.data]);

  const handleModal = () => {
    dispatch(onOpen("Auth"));
  };

  if (session.status === "loading") {
    return (
      <div className=" px-10 py-5  bg-neutral-900 h-screen w-full flex flex-col justify-center items-center">
        <ClipLoader color="white" size={50} />
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    return (
      <div className="bg-neutral-900 h-screen w-full flex flex-col gap-4 justify-center items-center">
        <div className="gap-4 flex flex-col">
          <div>
            <h1 className="text-gray-500 text-xl font-bold">Hi,</h1>
            <h1 className="text-gray-400 text-2xl font-bold">My Friends.</h1>
            <h1 className="text-gray-300 font-bold text-3xl">This Is </h1>
            <span className="text-6xl font-bold text-white">justAnAPP</span>
          </div>
          <div className="w-full flex flex-col gap-2">
            <h2 className="text-teal-500 text-md font-semibold">
              Everything You Want is Here.
            </h2>
            <button
              onClick={handleModal}
              className="bg-white px-3 py-2 rounded-md font-semibold">
              See for YourSelf
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default page;
