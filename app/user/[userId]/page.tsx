"use client";
import PostItem from "@/components/PostItem";
import UserBio from "@/components/UserBio";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "react-hot-toast";
import { useGetUserPostsQuery } from "@/redux/slices/apiSlice";

const page = () => {
  const { userId } = useParams();
  const { data, isSuccess, isLoading } = useGetUserPostsQuery(userId as string);

  return (
    <>
      <Toaster />
      <div className="mt-10 px-10 py-5 flex flex-col gap-2 bg-neutral-900">
        <UserBio userId={userId as string} />
        {isLoading && <ClipLoader size={20} color="white" />}
        {data?.map((post: any) => (
          <PostItem
            userId={post.user.id}
            key={post.id}
            id={post.id}
            username={post.user.username}
            createdAt={post.createdAt}
            body={post.body}
            profileImage={post.user.profileImage}
          />
        ))}
      </div>
    </>
  );
};

export default page;
