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
  const router = useRouter();
  const session = useSession();
  const { data, isSuccess, isLoading } = useGetUserPostsQuery(
    session?.data?.user as string
  );

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
      <>
        <Toaster />
        <div className="mt-10 px-10 py-5 flex flex-col gap-2 bg-neutral-900">
          <UserBio />
          {isLoading && <ClipLoader size={20} color="white" />}
          {data?.map((post: any) => (
            <PostItem
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
  }
};
export default page;
