import { PROMPT } from "@/app/constants/prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const farmerInput = body.query;

    // 🌍 Optional location (works whether frontend sends or not)
    const city = body.city || null;
    const state = body.state || null;

    if (!farmerInput) {
      return NextResponse.json(
        { error: "Farmer input is required" },
        { status: 400 }
      );
    }

    // 🔥 Base prompt
    let finalPrompt = PROMPT.replace(
      "{{farmer_input}}",
      farmerInput
    );

    // 📍 Only inject location if available
    if (city || state) {
      finalPrompt += `

[SYSTEM CONTEXT]
Farmer location:
City: ${city ?? "Unknown"}
State: ${state ?? "Unknown"}

Use this ONLY for:
- weather estimation
- crop suitability
- mandi suggestions
If user explicitly mentions another location, override this.
`;
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: finalPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 4096,
        responseMimeType: "application/json",
      },
    });

    const text = result.response.text();

    // ✅ Safe JSON parsing
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