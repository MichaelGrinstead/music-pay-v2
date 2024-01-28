import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const filename = searchParams.get("filename");

  if (filename && req.body) {
    const blob = await put(filename, req.body, { access: "public" });
    return new NextResponse(JSON.stringify(blob), { status: 201 });
  }
  return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
    status: 401,
  });
}
