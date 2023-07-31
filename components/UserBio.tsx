"use client";
import React from "react";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { onOpen } from "@/redux/slices/ModalSlice";
import {
  useGetUserQuery,
  useUpdateCoverImageMutation,
  useUpdateProfileImageMutation,
} from "@/redux/slices/apiSlice";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import ClipLoader from "react-spinners/ClipLoader";
import UploadImage from "./UploadImage";

const UserBio = () => {
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();
  const { data, isLoading, isSuccess, refetch, isFetching } = useGetUserQuery(
    session.data?.user as string
  );

  const [updateProfileImage] = useUpdateProfileImageMutation();
  const [updateCoverImage] = useUpdateCoverImageMutation();
  const handleSettingsModal = () => {
    dispatch(onOpen("Settings"));
  };

  const handleBioModal = () => {
    dispatch(onOpen("Bio"));
  };
  return (
    <div className="w-full p-5 bg-neutral-700 rounded-3xl flex flex-col justify-center relative items-center">
      <div className="w-full rounded-3xl bg-neutral-600 overflow-hidden  flex justify-center h-[200px]">
        <UploadImage
          value={data?.coverImage}
          updateField="coverImage"
          id={session.data?.user as string}
          handleUpdate={updateCoverImage}
        />
      </div>
      <div className="absolute top-[100px] z-20 bg-neutral-500 w-40 h-40 rounded-full flex justify-center overflow-hidden items-center ">
        <UploadImage
          value={data?.profileImage}
          updateField="profileImage"
          id={session.data?.user as string}
          handleUpdate={updateProfileImage}
        />
      </div>
      <div className="w-full text-white mt-[50px] gap-4 flex flex-col justify-center items-center  ">
        <div className="flex flex-col items-center">
          {(isLoading && <ClipLoader size={20} color="white" />) ||
            (isSuccess && <h1>{data.username}</h1>)}
          {(isLoading && <ClipLoader size={20} color="white" />) ||
            (isSuccess && <h1>{data.email}</h1>)}
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
