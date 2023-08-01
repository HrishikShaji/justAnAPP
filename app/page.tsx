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

export default function Home() {
  const router = useRouter();
  const session = useSession();
  const { data, isLoading } = useGetPostsQuery();

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
    console.log(data);
    return (
      <>
        <Toaster />
        <main className="mt-10 px-10 py-5  bg-neutral-900 min-h-screen w-full flex flex-col items-center justify-center gap-2">
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
        </main>
      </>
    );
  }
}
