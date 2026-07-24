import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const text = formData.get("text") as string | null;
    const image = formData.get("image") as File | null;

    // Build the request body to send to Python server
    const pythonFormData = new FormData();
    if (text) {
      pythonFormData.append("text", text);
    }
    if (image) {
      pythonFormData.append("image", image);
    }

    try {
      // Forward the request to the FastAPI moderation backend
      const backendUrl = process.env.MODERATION_API_URL || "http://127.0.0.1:8000/moderate";
      const response = await fetch(backendUrl, {
        method: "POST",
        body: pythonFormData,
      });

      if (!response.ok) {
        throw new Error(`Python moderation server returned ${response.status}`);
      }

      const result = await response.json();
      return NextResponse.json(result);
    } catch (apiError) {
      console.error("Failed to connect to Python moderation backend:", apiError);

      // Fallback local moderation logic when backend server is offline
      const reasons: string[] = [];
      let blocked = false;
      let textSafe = true;

      if (text) {
        const toxicWords = ["nsfw", "toxic", "hate", "abuse", "violence", "kill", "fuck", "shit", "bitch", "asshole"];
        const words = text.toLowerCase().split(/\s+/);
        const flagged = words.filter(word => {
          // Check for exact matches or words starting/ending with toxic words
          return toxicWords.some(toxic => word.includes(toxic));
        });
        if (flagged.length > 0) {
          blocked = true;
          textSafe = false;
          reasons.push(`Flagged by local fallback text filter (contains inappropriate terms)`);
        }
      }

      // If there is an image and python server is down, we show a notice
      if (image) {
        // We cannot classify the image locally in JS easily without TFJS,
        // so to keep it safe, we block or warn that verification is offline.
        blocked = true;
        reasons.push("Moderation service offline. Image verification unavailable.");
      }

      return NextResponse.json({
        text_safe: textSafe,
        text_score: textSafe ? 0.0 : 1.0,
        image_safe: !image,
        image_score: image ? 1.0 : 0.0,
        blocked: blocked,
        reason: reasons,
        warning: "Running in offline fallback mode. Please start the Python moderation server."
      });
    }
  } catch (error: any) {
    console.error("Moderation API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
