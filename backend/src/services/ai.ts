import OpenAI from "openai";
import { env } from "../config.js";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

interface GenerateParams {
  occasion: string;
  tone: string;
  recipientName?: string;
  senderName?: string;
  additionalContext?: string;
}

export async function generateMessages(params: GenerateParams): Promise<string[]> {
  const { occasion, tone, recipientName, senderName, additionalContext } = params;

  let prompt = `Generate 3 unique, heartfelt greeting card messages for a ${occasion} card.
Tone: ${tone}.
Each message should be 2-4 sentences long.`;

  if (recipientName) prompt += `\nRecipient's name: ${recipientName}.`;
  if (senderName) prompt += `\nSender's name: ${senderName}.`;
  if (additionalContext) prompt += `\nAdditional context: ${additionalContext}.`;

  prompt += `\n\nReturn ONLY a JSON array of 3 strings. No markdown, no explanation.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are FestifyBot, an AI that writes personalized NFT greeting card messages. Always return valid JSON arrays.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });

  const content = completion.choices[0]?.message?.content?.trim() ?? "[]";

  try {
    const messages = JSON.parse(content);
    if (Array.isArray(messages) && messages.length >= 1) {
      return messages.slice(0, 3);
    }
  } catch {
    // If parsing fails, split by newlines as fallback
    return content
      .split("\n")
      .filter((l: string) => l.trim().length > 0)
      .slice(0, 3);
  }

  return ["Happy " + occasion + "! Wishing you all the best."];
}
