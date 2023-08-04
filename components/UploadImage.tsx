"use client";
import React, { use, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image, { StaticImageData } from "next/image";
import { BiSolidPlusCircle } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import {
  useGetUserQuery,
  useUpdateCoverImageMutation,
  useUpdateProfileImageMutation,
  useGetUserPostsQuery,
  useGetPostsQuery,
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
  updateField,
  handleUpdate,
}) => {
  const [updateCoverImage] = useUpdateCoverImageMutation();
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const [loading, setLoading] = useState<boolean>(false);

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

        try {
          setLoading(true);
          await handleUpdate(data).unwrap();

          toast.success(`${updateField} uploaded`);
        } catch (error) {
          toast.error("Error");
        } finally {
          setLoading(false);
        }
      };

      reader.readAsDataURL(file);
    },
    [updateCoverImage, updateProfileImage, updateField]
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
      className="h-full w-full rounded-full bg-black  flex justify-center items-center cursor-pointer "
      {...getRootProps()}>
      {loading ? (
        <ClipLoader color="white" size={22} />
      ) : (
        <div {...getInputProps}>
          <BiSolidPlusCircle className="text-white" size={22} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
