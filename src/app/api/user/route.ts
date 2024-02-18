import { PrismaClient, Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const username = searchParams.get("username");
  const usernameLowercase = username?.toLowerCase();
  const { userId } = auth();
  if (!userId || !username)
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });

  try {
    const newUser = await prisma.user.create({
      data: {
        clerkUserId: userId as string,
        username: username as string,
        usernameLowercase: usernameLowercase as string,
      },
    });

    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (e) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse(JSON.stringify(e.message), { status: 500 });
    }
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { userId } = auth();
  const { searchParams } = new URL(req.nextUrl);
  const username = searchParams.get("username");

  try {
    let user;
    if (username) {
      user = await prisma.user.findUnique({
        where: {
          usernameLowercase: username.toLowerCase(),
        },
      });
    } else if (userId) {
      user = await prisma.user.findUnique({
        where: {
          clerkUserId: userId as string,
        },
      });
    }

    console.log("returned user", user);
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse(JSON.stringify(e.message), { status: 500 });
    }
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { userId } = auth();
  if (!userId)
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  const body = await req.json();
  console.log("PUT body", body);
  const { about, avatar, banner } = body;

  const updateData: {
    about?: string;
    avatarImage?: string;
    bannerImage?: string;
  } = {};

  if (about) updateData.about = about;
  if (avatar) updateData.avatarImage = avatar;
  if (banner) updateData.bannerImage = banner;

  if (Object.keys(updateData).length === 0)
    return new NextResponse(JSON.stringify({ message: "Bad Request" }));

  try {
    const updatedUser = await prisma.user.update({
      where: {
        clerkUserId: userId as string,
      },
      data: updateData,
    });

    return new NextResponse(JSON.stringify(updatedUser), { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse(JSON.stringify(e.message), { status: 500 });
    }
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

export async function DELETE() {
  const { userId } = auth();
  if (!userId)
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        clerkUserId: userId as string,
      },
    });

    return new NextResponse(JSON.stringify(deletedUser), { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse(JSON.stringify(e.message), { status: 500 });
    }
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}
