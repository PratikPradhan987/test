import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: Response) => {
  const { name, email } = await req.json();
  console.log("stattus:", name, email);
  // res.json({ ok: "ok" });
  return NextResponse.json({ status: "done" });
};
