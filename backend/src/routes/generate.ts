import { Router } from "express";
import { z } from "zod";
import { generateMessages } from "../services/ai.js";

const router = Router();

const generateSchema = z.object({
  occasion: z.string().min(1),
  tone: z.string().min(1),
  recipientName: z.string().optional(),
  senderName: z.string().optional(),
  additionalContext: z.string().max(500).optional(),
});

router.post("/generate", async (req, res) => {
  const parsed = generateSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.flatten().fieldErrors });
    return;
  }

  try {
    const messages = await generateMessages(parsed.data);
    res.json({ messages });
  } catch (err) {
    console.error("AI generation error:", err);
    res.status(500).json({ error: "Failed to generate messages" });
  }
});

export default router;
