import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { request } from "http";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "./prismadb";

const authenticatedUser = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("not signed in");
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      id: session.user as string,
    },
  });
  if (!currentUser) {
    throw new Error("not signed in");
  }

  return { currentUser };
};

export default authenticatedUser;
