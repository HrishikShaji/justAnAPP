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

export default function Home() {
  const router = useRouter();
  const session = useSession();

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
        <main className="mt-10 px-10 py-5  bg-neutral-900 h-full w-full flex flex-col gap-2">
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </main>
      </>
    );
  }
}
