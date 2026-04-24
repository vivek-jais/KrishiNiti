import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // fake AI logic (replace later)
  return NextResponse.json({
    mandi: "Itarsi",
    days: 4,
    profit: 7900,
  });
}