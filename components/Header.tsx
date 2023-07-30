"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "@/redux/slices/apiSlice";
import { useAppSelector } from "@/redux/store";

const Header = () => {
  const session = useSession();

  if (session.status !== "unauthenticated") {
    return (
      <div className="p-2 bg-neutral-900 justify-center items-center flex text-black fixed w-full z-40 top-0 left-0">
        <div className="flex gap-4">
          <Link href="/" className="font-semibold text-white ">
            Home
          </Link>
          <Link href="/create" className="font-semibold text-white ">
            Create
          </Link>
          <Link href="/friends" className="font-semibold text-white ">
            Friends
          </Link>
          <Link href="apps" className="font-semibold text-white ">
            Apps
          </Link>
          <Link href="profile" className="font-semibold text-white ">
            Profile
          </Link>
        </div>
      </div>
    );
  }
};
export default Header;
