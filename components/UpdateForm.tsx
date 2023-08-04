"use client";
import {
  useGetUserQuery,
  useUpdatePasswordMutation,
  useUpdateUsernameMutation,
} from "@/redux/slices/apiSlice";
import { useAppSelector } from "@/redux/store";
import { error } from "console";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BiSolidDownArrow } from "react-icons/bi";
import ClipLoader from "react-spinners/ClipLoader";

const UpdateForm = () => {
  const { id } = useAppSelector((state) => state.authReducer);
  const [updateUsername] = useUpdateUsernameMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const { data } = useGetUserQuery(id);
  const [username, setUsername] = useState<string>(
    data?.user.username as string
  );
  const [usernameMenu, setUsernameMenu] = useState<boolean>(false);
  const [passwordMenu, setPasswordMenu] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleUsernameUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      id: id,
      username: username,
    };

    try {
      setLoading(true);
      await updateUsername(data).unwrap();

      toast.success("username updated");
    } catch (error: any) {
      toast.error(error.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      id: id,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    try {
      setLoading(true);
      await updatePassword(data).unwrap();
      toast.success("Password updated");
    } catch (err: any) {
      toast.error(err.data.error);
      console.error(err);
    } finally {
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <div className="flex justify-between items-center ">
          <h1 className="text-lg font-semibold">Change Username</h1>
          <BiSolidDownArrow
            className={`text-white cursor-pointer duration-500 transition ${
              usernameMenu ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setUsernameMenu(!usernameMenu)}
          />
        </div>
        {usernameMenu && (
          <form
            onSubmit={handleUsernameUpdate}
            className="flex flex-col gap-2 ">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
              className="p-2 border-b-4 focus:outline-none border-white bg-transparent"
            />

            <button className="px-3 py-2 mt-4 bg-black text-white rounded-md">
              {loading ? <ClipLoader size={15} color="white" /> : "Update"}
            </button>
          </form>
        )}
      </div>

      <div className="flex gap-4  flex-col">
        <div className="flex justify-between items-center ">
          <h1 className="text-lg font-semibold">Change Password</h1>
          <BiSolidDownArrow
            className={`text-white cursor-pointer duration-500 transition ${
              passwordMenu ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setPasswordMenu(!passwordMenu)}
          />
        </div>
        {passwordMenu && (
          <form
            onSubmit={handlePasswordUpdate}
            className="flex flex-col gap-2 ">
            <input
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type="text"
              placeholder="Current Password"
              className="p-2 border-b-4 focus:outline-none border-white bg-transparent"
            />
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="text"
              placeholder="New Password"
              className="p-2 border-b-4 focus:outline-none border-white bg-transparent"
            />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="text"
              placeholder="Confirm Password"
              className="p-2 border-b-4 focus:outline-none border-white bg-transparent"
            />
            <button className="px-3 py-2 mt-4 bg-black text-white rounded-md">
              {loading ? <ClipLoader size={15} color="white" /> : "Update"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateForm;
