import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";

export const handler = async (request: NextRequest) => {
  const endpoint = request.nextUrl.searchParams.get("endpoint");
  const postId = request.nextUrl.searchParams.get("postId");
  const userId = request.nextUrl.searchParams.get("userId");
  console.log(userId);
  if (request.method === "POST") {
    switch (endpoint) {
      case "addPost":
        return addPost(request);

      default:
        break;
    }
  }
  if (request.method === "GET" && endpoint && !userId) {
    return getposts(request);
  } else if (request.method === "GET" && postId) {
    return getPost(request, postId);
  } else if (request.method === "GET" && userId) {
    return getUserPosts(request, userId);
  }
};

const getPost = async (request: NextRequest, postId: string) => {
  console.log("userPost ran", postId);
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

const getposts = async (request: NextRequest) => {
  console.log("allPosts ran");
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

const getUserPosts = async (request: NextRequest, userId: string) => {
  console.log("getUserPosts ran");
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

const addPost = async (request: NextRequest) => {
  const { id, body } = await request.json();
  console.log(id, body);
  try {
    await prisma.post.create({
      data: {
        body: body,
        userId: id,
      },
    });
    console.log("post added");
    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export { handler as GET, handler as POST };
