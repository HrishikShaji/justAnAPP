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

    const sender = await prisma.user.findUnique({
      where: { id: currentUser.id },
    });

    if (!user) {
      throw new Error("No post");
    }

    let updatedFollowIds = [...(user.followerIds || [])];
    let updatedFollowingIds = [...(sender?.followingIds || [])];
    if (request.method === "POST") {
      console.log("following");
      updatedFollowIds.push(currentUser.id);
      updatedFollowingIds.push(userId);
    }
    if (request.method === "DELETE") {
      console.log("unfollowing");
      updatedFollowIds = updatedFollowIds.filter(
        (followId) => followId !== currentUser.id
      );
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }
    console.log(updatedFollowingIds);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followerIds: updatedFollowIds,
      },
    });

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json("success");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export { handler as POST, handler as DELETE };
