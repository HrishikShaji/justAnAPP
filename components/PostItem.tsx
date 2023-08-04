"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import userImg from "@/public/images/user1.png";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import LikeComment from "./LikeComment";
import { useGetPostQuery } from "@/redux/slices/apiSlice";
import ClipLoader from "react-spinners/ClipLoader";

interface PostItemProps {
  id: string;
}

const PostItem: React.FC<PostItemProps> = ({ id }) => {
  const router = useRouter();

  const { data, isSuccess, isLoading } = useGetPostQuery(id);
  return (
    <div className="w-full text-white  rounded-3xl bg-neutral-700 p-5 flex flex-col gap-4">
      {isLoading && <ClipLoader color="white" size={20} />}
      {isSuccess && (
        <>
          <div className="flex gap-2 items-end">
            <div
              onClick={() => router.push(`/user/${data.user.id}`)}
              className="h-14 w-14 rounded-full cursor-pointer bg-neutral-500">
              <Image
                src={
                  data?.user?.profileImage ? data.user.profileImage : userImg
                }
                height={100}
                width={100}
                className="w-full h-full object-cover rounded-full"
                alt="profile image"
              />
            </div>
            <div className="flex flex-col ">
              <h1 className="font-semibold">{data?.user?.username}</h1>
              <span className="text-xs font-semibold text-gray-500">
                {data.createdAt}
              </span>
            </div>
          </div>
          <div
            onClick={() => router.push(`/post/${id}`)}
            className="cursor-pointer">
            <p>{data.body}</p>
          </div>
          <LikeComment likedIds={data?.likedIds} postId={id} />
        </>
      )}
    </div>
  );
};

export default PostItem;
