import { PrismaClient, Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId } = auth();

  if (!userId)
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  const body = await req.json();

  const { name, about, image } = body;

  const artistData: {
    userId?: string;
    name?: string;
    about?: string;
    image?: string;
  } = {};

  if (name) artistData.name = name;
  if (about) artistData.about = about;
  if (image) artistData.image = image;

  if (Object.keys(artistData).length === 0)
    return new NextResponse(JSON.stringify({ message: "Bad Request" }));

  try {
    const artist = await prisma.artist.create({
      data: {
        userId: userId as string,
        name: name,
        about: about,
        image: image,
      },
    });

    return new NextResponse(JSON.stringify(artist), { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse(JSON.stringify(e.message), { status: 500 });
    }
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}
