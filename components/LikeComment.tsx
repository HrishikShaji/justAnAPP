"use client";
import React from "react";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import {
  useAddLikeMutation,
  useGetPostQuery,
  useRemoveLikeMutation,
} from "@/redux/slices/apiSlice";
import { useAppSelector } from "@/redux/store";

interface LikeCommentProps {
  postId: string;
}
const LikeComment: React.FC<LikeCommentProps> = ({ postId }) => {
  const { id } = useAppSelector((state) => state.authReducer);
  const { data, refetch } = useGetPostQuery(postId);
  const [commentMenu, setCommentMenu] = useState<boolean>(false);
  const [likePost] = useAddLikeMutation();
  const [unLikePost] = useRemoveLikeMutation();
  const toggleLike = async () => {
    if (data.likedIds.includes(id)) {
      await unLikePost({ postId: postId });
      await refetch();
    } else {
      await likePost({ postId: postId });
      await refetch();
    }
  };
  return (
    <div>
      <div className="flex gap-4 items-center">
        <AiOutlineHeart
          onClick={toggleLike}
          size={20}
          className="cursor-pointer"
        />
        {data?.likedIds.length}

        <AiOutlineComment
          size={20}
          onClick={() => setCommentMenu(!commentMenu)}
          className="cursor-pointer"
        />
      </div>
      {commentMenu && (
        <div className=" w-full flex flex-col gap-6">
          <form className="flex justify-between  items-end gap-4">
            <input className="w-full border-b-4 bg-transparent focus:outline-none" />
            <MdSend size={30} />
          </form>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-white" />
              <div>
                <div className="flex gap-4 items-center">
                  <h1 className="font-semibold">Username</h1>
                  <span className="text-xs font-semibold">Time posted</span>
                </div>
                <h1>Comment posted</h1>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-white" />
              <div>
                <div className="flex gap-4 items-center">
                  <h1 className="font-semibold">Username</h1>
                  <span className="text-xs font-semibold">Time posted</span>
                </div>
                <h1>Comment posted</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeComment;
