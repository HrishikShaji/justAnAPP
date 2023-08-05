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
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/slices/AuthSlice";

const page = () => {
  const session = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      logIn({
        id: session?.data?.user as string,
        authenticated: true,
      })
    );
    console.log(session?.data?.user);
  }, [session]);

  const { id } = useAppSelector((state) => state.authReducer);
  const { data, isSuccess, isLoading } = useGetUserPostsQuery({
    id: id,
    page: 2,
  });
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

{
  /**
"use client";
import PostItem from "@/components/PostItem";
import UserBio from "@/components/UserBio";
import { useAppSelector } from "@/redux/store";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "react-hot-toast";
import { useGetUserPostsQuery } from "@/redux/slices/apiSlice";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/slices/AuthSlice";
import { useInView } from "react-intersection-observer";

const page = () => {
  const [page, setPage] = useState<number>(0);

  const dispatch = useDispatch();
  const session = useSession();
  const { data, isSuccess, isLoading } = useGetUserPostsQuery({
    id: session?.data?.user as string,
    page: page,
  });

  const posts = data?.posts ?? [];
  const { ref, inView } = useInView();

  useEffect(() => {
    dispatch(
      logIn({
        id: session?.data?.user as string,
        authenticated: true,
      })
    );
    console.log(session?.data?.user);
  }, [session]);

  useEffect(() => {
    if (inView && posts?.length < data?.count) {
      setPage(page + 1);
      console.log("in view ");
    }
  }, [inView]);

  const { id } = useAppSelector((state) => state.authReducer);

  console.log(posts, data?.count);
  return (
    <>
      <Toaster />
      <div className="mt-10 px-10 py-5 flex flex-col gap-2 bg-neutral-900">
        <UserBio userId={id} />

        {isLoading && <ClipLoader size={20} color="white" />}
        {posts?.map((post: any) => (
          <PostItem key={post.id} id={post.id} />
        ))}
        <div ref={ref} className="text-white">
          {!isLoading &&
            (posts?.length < data?.count ? (
              <ClipLoader size={20} color="white" />
            ) : (
              "no more to load"
            ))}
        </div>
      </div>
    </>
  );
};

export default page;

*/
}
