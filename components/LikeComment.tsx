"use client";
import React, { FormEvent } from "react";
import Image from "next/image";
import { AiOutlineHeart, AiOutlineComment, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import {
  useAddCommentMutation,
  useAddLikeMutation,
  useGetCommentsQuery,
  useRemoveLikeMutation,
} from "@/redux/slices/apiSlice";
import { useAppSelector } from "@/redux/store";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

interface LikeCommentProps {
  postId: string;
  likedIds: string[];
}
const LikeComment: React.FC<LikeCommentProps> = ({ postId, likedIds }) => {
  const { id } = useAppSelector((state) => state.authReducer);
  const [commentMenu, setCommentMenu] = useState<boolean>(false);
  const [likePost] = useAddLikeMutation();
  const [unLikePost] = useRemoveLikeMutation();
  const [comment, setComment] = useState<string>("");
  const [addComment] = useAddCommentMutation();
  const { data, isSuccess } = useGetCommentsQuery(postId);
  const [loading, setLoading] = useState<boolean>(false);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);

  const toggleLike = async () => {
    if (likedIds.includes(id)) {
      try {
        setLikeLoading(true);
        await unLikePost({ postId: postId });
        toast.success("unliked");
      } catch (error) {
        toast.error("something went wrong");
      } finally {
        setLikeLoading(false);
      }
    } else {
      try {
        setLikeLoading(true);
        await likePost({ postId: postId });
        toast.success("liked");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLikeLoading(false);
      }
    }
  };

  const handleAddComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(comment);
    const data = {
      postId: postId,
      body: comment,
    };

    try {
      setLoading(true);
      const response = await addComment(data);
      setComment("");
      toast.success("comment added");
      console.log(response);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex gap-4 items-center">
        {likedIds.includes(id) ? (
          <AiFillHeart
            onClick={toggleLike}
            size={20}
            className="cursor-pointer"
          />
        ) : (
          <AiOutlineHeart
            onClick={toggleLike}
            size={20}
            className="cursor-pointer"
          />
        )}
        {likeLoading ? (
          <ClipLoader size={15} color="white" />
        ) : (
          likedIds?.length
        )}

        <AiOutlineComment
          size={20}
          onClick={() => setCommentMenu(!commentMenu)}
          className="cursor-pointer"
        />
        {data?.length}
      </div>
      {commentMenu && (
        <div className=" w-full flex flex-col gap-6">
          <form
            onSubmit={handleAddComment}
            className="flex justify-between  items-end gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border-b-4 bg-transparent focus:outline-none"
            />
            <button>
              {loading ? <ClipLoader size={20} /> : <MdSend size={30} />}
            </button>
          </form>
          <div className="flex flex-col gap-2">
            {isSuccess &&
              data.map((comment: any) => (
                <div key={comment.id} className="flex gap-4">
                  <Image
                    src={comment.user.profileImage}
                    className="h-12 w-12 rounded-full"
                    height={100}
                    width={100}
                    alt="Profile image"
                  />

                  <div>
                    <div className="flex gap-4 items-center">
                      <h1 className="font-semibold">{comment.user.username}</h1>
                      <span className="text-xs font-semibold">
                        {comment.createdAt}
                      </span>
                    </div>
                    <h1>{comment.body}</h1>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeComment;
