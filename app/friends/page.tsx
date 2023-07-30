"use client";
import UserCard from "@/components/UserCard";
import UserListItem from "@/components/UserListItem";
import { FiSearch } from "react-icons/fi";
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
      <div className="mt-10 px-10 py-5 bg-neutral-900 gap-2 flex flex-col ">
        <h1 className="text-white text-xl font-semibold">
          You want to find Someone Special
        </h1>
        <form className="flex relative justify-between items-center mb-10 mt-5 text-white">
          <input
            className=" bg-transparent w-full focus:outline-none border-b-2 border-white py-2 "
            placeholder="Search..."
          />
          <FiSearch className="absolute right-1 cursor-pointer" />
        </form>
        <h1 className="text-white text-xl font-semibold">
          You may know these People
        </h1>
        <div className="grid grid-cols-5 gap-2 ">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
        <h1 className="text-white text-xl font-semibold">
          Your Friends are here
        </h1>
        <div className="flex flex-col gap-2">
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
        </div>
      </div>
    );
  }
};

export default page;
