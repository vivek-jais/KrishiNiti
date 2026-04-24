import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    bestHarvestWindow: "3-5 days",
    risk: "Low rainfall risk",
  });
}