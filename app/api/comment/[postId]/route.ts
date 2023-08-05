import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: { postId: string };
  }
) => {
  const postId = params.postId;

  try {
    console.log("thisran", postId);
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json(comments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
