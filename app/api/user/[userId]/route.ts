import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string };
  }
) => {
  const userId = params.userId;
  const page = Number(request.nextUrl.searchParams.get("page"));
  console.log("sexyyy", page, userId);
  try {
    const count = await prisma.post.count({
      where: {
        userId: userId,
      },
    });

    const posts = await prisma.post.findMany({
      skip: page === 0 ? 0 : page * 3,
      take: 3,
      where: {
        userId: userId,
      },
      select: {
        id: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(posts);
    return NextResponse.json({ posts, count });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const userId = params.userId;
  const body = await request.json();
  console.log(userId, body.username);
  try {
    if (body.username) {
      return updateUsername(userId, body.username);
    }

    if (body.profileImage) {
      return updateProfileImage(userId, body.profileImage);
    }
    if (body.coverImage) {
      return updateCoverImage(userId, body.coverImage);
    }

    if (body.newPassword && body.currentPassword) {
      return updatePassword(userId, body.newPassword, body.currentPassword);
    }

    return NextResponse.json("success");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const updateUsername = async (userId: string, username: string) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: username,
      },
    });

    return NextResponse.json("success");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export const updateProfileImage = async (
  userId: string,
  profileImage: string
) => {
  console.log("this ran", userId, profileImage);
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profileImage: profileImage,
      },
    });
    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const updateCoverImage = async (userId: string, coverImage: string) => {
  console.log("this ran", userId, coverImage);
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        coverImage: coverImage,
      },
    });
    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const updatePassword = async (
  userId: string,
  newPassword: string,
  currentPassword: string
) => {
  console.log(currentPassword, newPassword, userId);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedPassword) {
      throw new Error("Invalid id");
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.hashedPassword
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Password does not match" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json("success");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
