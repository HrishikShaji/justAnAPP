"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import userImg from "@/public/images/user1.png";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import LikeComment from "./LikeComment";

interface PostItemProps {
  id: string;
  username: string;
  createdAt: string;
  body: string;
  profileImage: string;
  userId: string;
}

const PostItem: React.FC<PostItemProps> = ({
  id,
  username,
  createdAt,
  body,
  profileImage,
  userId,
}) => {
  const router = useRouter();
  return (
    <div className="w-full text-white  rounded-3xl bg-neutral-700 p-5 flex flex-col gap-4">
      <div className="flex gap-2 items-end">
        <div
          onClick={() => router.push(`/user/${userId}`)}
          className="h-14 w-14 rounded-full cursor-pointer bg-neutral-500">
          <Image
            src={profileImage ? profileImage : userImg}
            height={100}
            width={100}
            className="w-full h-full object-cover rounded-full"
            alt="profile image"
          />
        </div>
        <div className="flex flex-col ">
          <h1 className="font-semibold">{username}</h1>
          <span className="text-xs font-semibold text-gray-500">
            {createdAt}
          </span>
        </div>
      </div>
      <div
        onClick={() => router.push(`/post/${id}`)}
        className="cursor-pointer">
        <p>{body}</p>
      </div>
      <LikeComment postId={id} />
    </div>
  );
};

export default PostItem;
