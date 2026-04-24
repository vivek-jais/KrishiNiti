import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    netProfit: 7900,
  });
}