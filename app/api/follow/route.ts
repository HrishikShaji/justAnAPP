import authenticatedUser from "@/libs/authenticatedUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

const handler = async (request: NextRequest) => {
  const { userId } = await request.json();

  const { currentUser } = await authenticatedUser(request);
  console.log(currentUser, userId);
  try {
    const user = await prisma?.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("No post");
    }

    let updatedFollowIds = [...(user.favouriteIds || [])];
    if (request.method === "POST") {
      console.log("following");
      updatedFollowIds.push(currentUser.id);
    }
    if (request.method === "DELETE") {
      console.log("unfollowing");
      updatedFollowIds = updatedFollowIds.filter(
        (followId) => followId !== currentUser.id
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favouriteIds: updatedFollowIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export { handler as POST, handler as DELETE };
