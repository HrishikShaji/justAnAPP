"use client";
import Header from "@/components/Header";
import PostItem from "@/components/PostItem";
import { useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "react-hot-toast";
import { useGetPostsQuery } from "@/redux/slices/apiSlice";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/slices/AuthSlice";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [page, setPage] = useState<number>(0);
  const { data, isLoading, isFetching } = useGetPostsQuery(page);
  const posts = data?.posts ?? [];

  const dispatch = useDispatch();
  const { ref, inView } = useInView();
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

  useEffect(() => {
    if (inView && posts?.length < data?.count) {
      setPage(page + 1);
    }
  }, [inView]);
  console.log(data, posts.length, data?.count);
  return (
    <>
      <Toaster />
      <main className="mt-10 px-10 py-5  bg-neutral-900 min-h-screen w-full flex flex-col items-center justify-center gap-2">
        {isLoading && <ClipLoader size={20} color="white" />}
        {posts?.map((post: any, i: number) => (
          <PostItem key={i} id={post.id} />
        ))}
        <div ref={ref} className="text-white">
          {!isLoading &&
            (posts?.length < data?.count ? (
              <ClipLoader size={20} color="white" />
            ) : (
              "no more to load"
            ))}
        </div>
      </main>
    </>
  );
}
