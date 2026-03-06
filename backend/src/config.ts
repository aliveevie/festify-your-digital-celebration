import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
  PAY_TO_ADDRESS: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "PAY_TO_ADDRESS must be a valid EVM address"),
  FACILITATOR_URL: z
    .string()
    .url()
    .default("https://facilitator.payai.network"),
  NETWORK: z.string().default("eip155:43114"), // Avalanche C-Chain mainnet
  GENERATION_PRICE: z.string().default("$0.01"),
  PORT: z.coerce.number().default(3001),
  CORS_ORIGINS: z.string().default("http://localhost:8080,https://festify.club"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
