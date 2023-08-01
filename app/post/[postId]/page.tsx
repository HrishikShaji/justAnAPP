"use client";
import { useGetPostQuery } from "@/redux/slices/apiSlice";
import { useParams } from "next/navigation";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image";
import userImg from "@/public/images/user1.png";
import LikeComment from "@/components/LikeComment";

const page = () => {
  const { postId } = useParams();
  console.log(postId);

  const { data, isLoading, isSuccess } = useGetPostQuery(postId as string);
  console.log(data);
  return (
    <div className="bg-neutral-900 min-h-screen w-full flex flex-col justify-center items-center">
      {isLoading && <ClipLoader color="white" size={20} />}
      {isSuccess && (
        <div className="p-10 bg-neutral-500 rounded-xl flex flex-col">
          <div className="flex items-center gap-6 w-full">
            <Image
              src={data.user.profileImage ? data.user.profileImage : userImg}
              height={100}
              width={100}
              alt="profile image"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h1>{data.user.username}</h1>
              <span>{data.createdAt}</span>
            </div>
          </div>
          <div>
            <p>{data.body}</p>
          </div>
          <LikeComment />
        </div>
      )}
    </div>
  );
};

export default page;
