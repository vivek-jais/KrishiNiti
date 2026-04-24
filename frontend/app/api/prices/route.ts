import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { mandi: "Local", price: 1980 },
    { mandi: "Itarsi", price: 2310 },
  ]);
}