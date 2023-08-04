import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import { request } from "http";

const handler = async (request: NextRequest) => {
  const endpoint = request.nextUrl.searchParams.get("endpoint");

  if (request.method === "PUT") {
    switch (endpoint) {
      case "updateUsername":
        return updateUsername(request);
      case "updateProfileImage":
        return updateProfileImage(request);
      case "updateCoverImage":
        return updateCoverImage(request);
      case "updatePassword":
        return updatePassword(request);
      default:
        break;
    }
  }
};

export const updateUsername = async (request: NextRequest) => {
  const { id, username } = await request.json();
  console.log("this ran", id, username);
  try {
    await prisma.user.update({
      where: {
        id: id as string,
      },
      data: {
        username: username,
      },
    });
    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const updateProfileImage = async (request: NextRequest) => {
  const { id, profileImage } = await request.json();
  console.log("this ran", id, profileImage);
  try {
    await prisma.user.update({
      where: {
        id: id as string,
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

export const updateCoverImage = async (request: NextRequest) => {
  const { id, coverImage } = await request.json();
  console.log("this ran", id, coverImage);
  try {
    await prisma.user.update({
      where: {
        id: id as string,
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

export const updatePassword = async (req: NextRequest) => {
  const { currentPassword, newPassword, id } = await req.json();
  console.log(currentPassword, newPassword, id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id as string,
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
        id: id as string,
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

export { handler as POST, handler as PUT };
