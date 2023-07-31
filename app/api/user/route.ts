import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const id = req.nextUrl.searchParams.get("id");
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
      select: {
        id: true,
        username: true,
        email: true,
        profileImage: true,
        coverImage: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  const id = req.nextUrl.searchParams.get("id");
  const data = await req.json();
  console.log("from update user", id, data?.username, data?.email);
  try {
    let updateData = {};
    if (data.username) {
      updateData = { username: data.username };
    } else if (data.profileImage) {
      console.log("profileImage updation ran");
      updateData = { profileImage: data.profileImage };
    } else if (data.coverImage) {
      console.log("coverImage updation ran");
      updateData = { coverImage: data.coverImage };
    } else if (data.email) {
      const user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (user && user.email !== id) {
        throw new Error("Email exists");
      }
      console.log(user);
      updateData = { email: data.email };
    } else if (data.currentPassword && data.newPassword) {
      console.log(
        "current password:",
        data.currentPassword,
        "New Password:",
        data.newPassword
      );

      const user = await prisma.user.findUnique({
        where: {
          id: id as string,
        },
      });

      if (!user || !user.hashedPassword) {
        throw Error("Invalid id");
      }

      const isPasswordCorrect = await bcrypt.compare(
        data.currentPassword,
        user.hashedPassword
      );
      console.log(isPasswordCorrect);
      if (!isPasswordCorrect) {
        return NextResponse.json(
          {
            message: "Please enter title",
          },
          {
            status: 401,
          }
        );
      }

      const hashedPassword = await bcrypt.hash(data.newPassword, 12);

      updateData = { hashedPassword: hashedPassword };
    } else {
      throw new Error("Error");
    }
    console.log("update data is", updateData);
    await prisma.user.update({
      where: {
        id: id as string,
      },
      data: updateData,
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    throw new Error("error");
  }
};
