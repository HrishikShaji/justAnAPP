"use client";
import React from "react";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { onOpen } from "@/redux/slices/ModalSlice";
import {
  useFollowMutation,
  useGetUserPostsQuery,
  useGetUserQuery,
  useUnFollowMutation,
  useUpdateCoverImageMutation,
  useUpdateProfileImageMutation,
} from "@/redux/slices/apiSlice";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import ClipLoader from "react-spinners/ClipLoader";
import UploadImage from "./UploadImage";
import Image from "next/image";
import userImg from "@/public/images/user1.png";
import { toast } from "react-hot-toast";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useAppSelector((state) => state.authReducer);
  const { data, isLoading, isSuccess, refetch, isFetching } = useGetUserQuery(
    userId as string
  );
  console.log("user is ", userId, "me is ", id);
  console.log(data);
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const [updateCoverImage] = useUpdateCoverImageMutation();
  const [follow] = useFollowMutation();
  const [unFollow] = useUnFollowMutation();

  const handleSettingsModal = () => {
    dispatch(onOpen("Settings"));
  };

  const handleFollow = async () => {
    if (data?.followerIds?.includes(id)) {
      await unFollow({ userId: userId });
      toast.success(`unfollowed ${data.username} `);
    } else {
      await follow({ userId: userId });
      toast.success(`following ${data?.username} `);
    }
  };

  const handleBioModal = () => {
    dispatch(onOpen("Bio"));
  };
  return (
    <div className="w-full p-5 bg-neutral-700 rounded-3xl flex flex-col justify-center relative items-center">
      <div className="w-full rounded-3xl bg-neutral-600 overflow-hidden  flex justify-center h-[200px]">
        {isSuccess && (
          <Image
            src={data.user.coverImage ? data.user.coverImage : userImg}
            height={100}
            width={100}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute top-8 right-8">
          {id === userId && (
            <UploadImage
              value={data?.user?.coverImage}
              updateField="coverImage"
              id={userId}
              handleUpdate={updateCoverImage}
            />
          )}
        </div>
      </div>
      <div className="absolute top-[100px] z-20 bg-neutral-500 w-40 h-40 rounded-full flex justify-center  items-center ">
        {isSuccess && (
          <Image
            src={data?.user?.profileImage ? data?.user?.profileImage : userImg}
            height={100}
            width={100}
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
          />
        )}

        <div className="absolute top-3 right-3">
          {id === userId && (
            <UploadImage
              value={data?.user?.profileImage}
              updateField="profileImage"
              id={userId}
              handleUpdate={updateProfileImage}
            />
          )}
        </div>
      </div>
      <div className="w-full text-white mt-[50px] gap-4 flex flex-col justify-center items-center  ">
        <div className="flex flex-col items-center">
          {(isLoading && <ClipLoader size={20} color="white" />) ||
            (isSuccess && <h1>{data.user.username}</h1>)}
          {(isLoading && <ClipLoader size={20} color="white" />) ||
            (isSuccess && <h1>{data.user.email}</h1>)}
        </div>
        <div className="w-full flex gap-4 justify-center">
          <h1>Followers : {data?.user?.followerIds.length}</h1>
          <h1>Following : {data?.user?.followingIds.length}</h1>
          <h1>Posts</h1>
        </div>
        {userId === id ? (
          <div className="w-full flex gap-4 justify-end">
            <AiOutlineUser
              className="cursor-pointer"
              size={25}
              onClick={handleBioModal}
            />
            <IoMdSettings
              className="cursor-pointer"
              size={25}
              onClick={handleSettingsModal}
            />
            <IoMdLogOut
              size={25}
              className=" cursor-pointer"
              onClick={() => signOut()}
            />
          </div>
        ) : (
          <div className="w-full flex justify-end">
            <button onClick={handleFollow}>
              {data?.user?.followerIds?.includes(id) ? "unFollow" : "Follow"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBio;
