"use client";
import Header from "@/components/Header";
import PostItem from "@/components/PostItem";
import { useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "react-hot-toast";
import { useGetPostsQuery } from "@/redux/slices/apiSlice";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/slices/AuthSlice";

export default function Home() {
  const { data, isLoading } = useGetPostsQuery();
  const dispatch = useDispatch();
  const session = useSession();
  useEffect(() => {
    dispatch(
      logIn({
        id: session?.data?.user as string,
        authenticated: true,
      })
    );
    console.log(session?.data?.user);
  }, [session]);
  console.log(data);
  return (
    <>
      <Toaster />
      <main className="mt-10 px-10 py-5  bg-neutral-900 min-h-screen w-full flex flex-col items-center justify-center gap-2">
        {isLoading && <ClipLoader size={20} color="white" />}
        {data?.map((post: any) => (
          <PostItem key={post.id} id={post.id} />
        ))}
      </main>
    </>
  );
}
