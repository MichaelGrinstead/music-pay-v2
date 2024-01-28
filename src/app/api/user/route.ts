import { PrismaClient, Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST() {
  const { userId } = auth();
  if (!userId)
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });

  try {
    const newUser = await prisma.user.create({
      data: {
        clerkUserId: userId as string,
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

export async function GET() {
  const { userId } = auth();
  if (!userId)
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });

  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId as string,
      },
      include: {
        artists: true,
      },
    });
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
  const { about, image } = body;

  const updateData: { about?: string; image?: string } = {};

  if (about) updateData.about = about;
  if (image) updateData.image = image;

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
