"use client";
import React, { use, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image, { StaticImageData } from "next/image";
import userImg from "@/public/images/user1.png";
import { RxAvatar } from "react-icons/rx";
import {
  useGetUserQuery,
  useUpdateCoverImageMutation,
  useUpdateProfileImageMutation,
} from "@/redux/slices/apiSlice";
import { useSession } from "next-auth/react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";

interface UploadImageProps {
  id: string;
  value?: string;
  updateField: string;
  handleUpdate: any;
}

const UploadImage: React.FC<UploadImageProps> = ({
  id,
  value,
  updateField,
  handleUpdate,
}) => {
  const { refetch, isLoading, isFetching } = useGetUserQuery(id);
  const [updateCoverImage] = useUpdateCoverImageMutation();
  const [updateProfileImage] = useUpdateProfileImageMutation();
  console.log(id, updateField);
  const handleDrop = useCallback(
    async (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = async (event: any) => {
        const data = {
          id: id,
          image: event.target.result,
        };
        await handleUpdate(data);
        await refetch();
        toast.success(`${updateField} uploaded`);
      };

      reader.readAsDataURL(file);
    },
    [refetch, updateCoverImage, updateProfileImage, updateField]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div
      className="w-full h-full cursor-pointer  relative justify-center flex items-center"
      {...getRootProps()}>
      {isLoading || isFetching ? (
        <ClipLoader color="white absolute z-20" size={20} />
      ) : (
        <Image
          src={value ? value : userImg}
          height={100}
          width={100}
          alt="avatar"
          {...getInputProps}
          className={`${"w-full h-full"}   object-cover`}
        />
      )}
    </div>
  );
};

export default UploadImage;
