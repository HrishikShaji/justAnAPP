"use client";
import React from "react";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { onOpen } from "@/redux/slices/ModalSlice";
import { useGetUserQuery } from "@/redux/slices/apiSlice";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const UserBio = () => {
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();
  const { data, isLoading, isSuccess } = useGetUserQuery(
    session.data?.user as string
  );
  const handleSettingsModal = () => {
    dispatch(onOpen("Settings"));
  };

  const handleBioModal = () => {
    dispatch(onOpen("Bio"));
  };
  return (
    <div className="w-full p-5 bg-neutral-700 rounded-3xl flex flex-col justify-center items-center">
      <div className="w-full rounded-3xl bg-neutral-600 flex justify-center relative h-[200px]">
        <div className="relative -bottom-[40%] bg-neutral-500 w-40 h-40 rounded-full" />
      </div>
      <div className="w-full text-white mt-[50px] gap-4 flex flex-col justify-center items-center  ">
        <div className="flex flex-col items-center">
          <h1>Username</h1>
          {isLoading && <h1>Loading...</h1>}
          {isSuccess && <h1>{data.email}</h1>}
        </div>
        <div className="w-full flex gap-4 justify-center">
          <h1>Followers</h1>
          <h1>Following</h1>
          <h1>Posts</h1>
        </div>
        <div className="w-full flex gap-4 justify-end">
          <AiOutlineUser
            className="cursor-pointer"
            size={25}
            onClick={handleBioModal}
          />
          <IoMdSettings
            className="cursor-pointer"
            size={25}
            onClick={handleSettingsModal}
          />
          <IoMdLogOut
            size={25}
            className=" cursor-pointer"
            onClick={() => signOut()}
          />
        </div>
      </div>
    </div>
  );
};

export default UserBio;
