"use client";
import PostItem from "@/components/PostItem";
import UserBio from "@/components/UserBio";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "react-hot-toast";
import { useGetUserPostsQuery } from "@/redux/slices/apiSlice";

const page = () => {
  const { id } = useAppSelector((state) => state.authReducer);
  const { data, isSuccess, isLoading } = useGetUserPostsQuery(id);
  console.log(id);
  return (
    <>
      <Toaster />
      <div className="mt-10 px-10 py-5 flex flex-col gap-2 bg-neutral-900">
        <UserBio userId={id} />
        {isLoading && <ClipLoader size={20} color="white" />}
        {data?.posts.map((post: any) => (
          <PostItem key={post.id} id={post.id} />
        ))}
      </div>
    </>
  );
};

export default page;
