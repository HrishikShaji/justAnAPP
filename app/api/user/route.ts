import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const id = req.nextUrl.searchParams.get("id");
  try {
    console.log("this ran", id);
    const user = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
      select: {
        id: true,
        email: true,
        image: true,
      },
    });
    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  const id = req.nextUrl.searchParams.get("id");
  const { email } = await req.json();
  console.log("from update user", id, email);
  try {
    await prisma.user.update({
      where: {
        id: id as string,
      },
      data: {
        email: email,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json(error);
  }
};
