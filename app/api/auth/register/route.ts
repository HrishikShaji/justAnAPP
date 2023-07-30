import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

const handler = async (req: NextRequest, res: NextResponse) => {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new Error("User Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json("Account created");
  } catch (error) {
    return NextResponse.json(error);
  }
};

export { handler as POST };
