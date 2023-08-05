import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async (request: NextRequest) => {
  console.log("allPosts ran");
  const page = Number(request.nextUrl.searchParams.get("page"));

  try {
    const count = await prisma.post.count({});
    const posts = await prisma.post.findMany({
      skip: page === 0 ? 0 : page * 3,
      take: 3,
      select: {
        id: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ posts, count });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
