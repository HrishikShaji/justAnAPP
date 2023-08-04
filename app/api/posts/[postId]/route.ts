import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async (
  request: NextRequest,
  { params }: { params: { postId: string } }
) => {
  const postId = params.postId;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: true,
      },
    });
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (
  request: NextRequest,
  { params }: { params: { postId: string } }
) => {
  const userId = params.postId;
  const { body } = await request.json();
  try {
    await prisma.post.create({
      data: {
        body,
        userId: userId as string,
      },
    });
    console.log("post added");
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
