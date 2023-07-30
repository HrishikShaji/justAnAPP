"use client";
import React, { useState } from "react";
import { logIn, logOut, toggleModerator } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";

const page = () => {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const isModerator = useAppSelector(
    (state) => state.authReducer.value.isModerator
  );
  const handleLogin = () => {
    dispatch(logIn(username));
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const toggle = () => {
    dispatch(toggleModerator());
  };
  return (
    <div className="h-screen w-full bg-neutral-200 flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <input onChange={(e) => setUsername(e.target.value)} />
        <button onClick={handleLogin}>Log in</button>
        <button onClick={handleLogout}>Log Out</button>
        <button onClick={toggle}>Toggle Moderator status</button>
        <h1>{isModerator ? "moderator" : "not"}</h1>
      </div>
    </div>
  );
};

export default page;
