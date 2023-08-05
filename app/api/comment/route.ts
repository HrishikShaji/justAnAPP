import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import authenticatedUser from "@/libs/authenticatedUser";

export const POST = async (request: NextRequest) => {
  const { postId, body } = await request.json();
  const { currentUser } = await authenticatedUser(request);

  try {
    console.log(postId, body);
    await prisma.comment.create({
      data: {
        body: body,
        postId: postId,
        userId: currentUser.id,
      },
    });
    return NextResponse.json("success creating");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
