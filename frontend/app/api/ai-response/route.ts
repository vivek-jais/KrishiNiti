import { PROMPT } from "@/app/constants/prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const farmerInput = body.query;

    if (!farmerInput) {
      return NextResponse.json(
        { error: "Farmer input is required" },
        { status: 400 }
      );
    }

    // 🔥 Inject user input into prompt
    const finalPrompt = PROMPT.replace(
      "{{farmer_input}}",
      farmerInput
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview", // more stable
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
      generationConfig: {
        temperature: 0.7, // lower = more realistic
        topP: 0.9,
        maxOutputTokens: 4096,
        responseMimeType: "application/json",
      },
    });

    const text = result.response.text();

    // ✅ Parse JSON safely
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("JSON parse error:", text);
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI request failed" },
      { status: 500 }
    );
  }
}