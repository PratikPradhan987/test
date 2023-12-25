// import prisma from "@prisma/client";
import prisma from "../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().min(1),
  message: z.string().min(1),
});
export async function POST(req: NextRequest) {
  const body = await req.json();
  // console.log("hello");

  const validation = createUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newuser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      message: body.message,
    },
  });
  // console.log(newuser);
  return NextResponse.json(newuser, { status: 201 });
}

export async function GET(req: NextRequest) {
  const user = await prisma.user.findMany();

  // console.log(user);

  return NextResponse.json(user, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);

  const urlid: any = url.searchParams.get("id");

  const result = await prisma.user.delete({
    where: {
      id: urlid,
    },
  });
  return NextResponse.json(result);
  console.log("oka", req.url);
}
