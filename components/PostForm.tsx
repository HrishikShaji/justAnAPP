"use client";
import { useAddPostMutation, useGetPostsQuery } from "@/redux/slices/apiSlice";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const PostForm = () => {
  const session = useSession();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [addPost] = useAddPostMutation();

  const handleAddPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = {
        id: session?.data?.user as string,
        body: body,
      };
      setLoading(true);
      await addPost(data).unwrap();
      toast.success("Post Added");
    } catch (error: any) {
      toast.error(error.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleAddPost}
      className="w-full h-full p-2 flex flex-col gap-4">
      <textarea
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-4 rounded-3xl h-[calc(100%_-_100px)]  bg-neutral-600"
      />
      <button className="text-white">
        {loading ? <ClipLoader color="white" size={10} /> : "Post"}
      </button>
    </form>
  );
};

export default PostForm;
