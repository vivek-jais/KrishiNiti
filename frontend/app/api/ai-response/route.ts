import { PROMPT } from "@/app/constants/prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const farmerInput = body.query;
    
    // Accept city and state from the frontend. Fallback to "Not provided" if the user types it manually instead.
    const city = body.city || "Not provided";
    const state = body.state || "Not provided";

    if (!farmerInput) {
      return NextResponse.json(
        { error: "Farmer input is required" },
        { status: 400 }
      );
    }

    // 🔥 Inject user input into prompt
    let finalPrompt = PROMPT.replace(
      "{{farmer_input}}",
      farmerInput
    );

    // 📍 Add the location context to the prompt so Gemini knows where the farmer is!
    const locationContext = `\n\n[SYSTEM CONTEXT: The farmer's detected device location is City: ${city}, State: ${state}. Use this context for weather, soil, or crop recommendations if they don't manually specify a different location in their query.]`;
    finalPrompt += locationContext;

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview", // Note: Adjust model name to your specific version if needed
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
      generationConfig: {
        temperature: 0.7, 
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