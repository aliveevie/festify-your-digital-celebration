import express from "express";
import cors from "cors";
import { env } from "./config.js";
import { createPaymentMiddleware } from "./middleware/x402.js";
import healthRouter from "./routes/health.js";
import generateRouter from "./routes/generate.js";

const app = express();

// CORS — expose x402 payment headers
const origins = env.CORS_ORIGINS.split(",").map((o) => o.trim());
app.use(
  cors({
    origin: origins,
    exposedHeaders: [
      "X-PAYMENT",
      "X-PAYMENT-RESPONSE",
      "PAYMENT-REQUIRED",
      "PAYMENT-SIGNATURE",
      "PAYMENT-RESPONSE",
    ],
  }),
);

app.use(express.json());

// Health check (free, no payment required)
app.use("/api", healthRouter);

// x402 payment gate — protects POST /api/generate
app.use(createPaymentMiddleware());

// Protected route — only reachable after x402 payment verification
app.use("/api", generateRouter);

app.listen(env.PORT, () => {
  console.log(`Festify backend running on http://localhost:${env.PORT}`);
});
