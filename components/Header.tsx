import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "@/redux/slices/apiSlice";
import { useAppSelector } from "@/redux/store";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Header = async () => {
  const session = await getServerSession(authOptions);
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Create",
      path: "/create",
    },
    {
      name: "Friends",
      path: "/friends",
    },
    {
      name: "Apps",
      path: "/apps",
    },
    {
      name: "Profile",
      path: "/profile",
    },
  ];
  console.log(session);
  if (session) {
    return (
      <div className="p-2 bg-neutral-900 justify-center items-center flex text-black fixed w-full z-40 top-0 left-0">
        <div className="flex gap-4">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              className="font-semibold text-white ">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }
};
export default Header;
