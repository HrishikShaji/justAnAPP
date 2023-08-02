import authenticatedUser from "@/libs/authenticatedUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

const handler = async (request: NextRequest) => {
  const { postId } = await request.json();

  const { currentUser } = await authenticatedUser(request);
  console.log(currentUser, postId);
  try {
    const post = await prisma?.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error("No post");
    }

    let updatedLikedIds = [...(post.likedIds || [])];
    if (request.method === "POST") {
      console.log("Liking");
      updatedLikedIds.push(currentUser.id);
    }
    if (request.method === "DELETE") {
      console.log("unLiking");
      updatedLikedIds = updatedLikedIds.filter(
        (likedId) => likedId !== currentUser.id
      );
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export { handler as POST, handler as DELETE };
