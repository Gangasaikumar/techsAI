import express from "express";
import cors, { type CorsOptions } from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.ts";
import mongoose from "mongoose";

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 3000;

// Security headers
app.use(helmet());

// Disable etag caching
app.set("etag", false);

// CORS setup for cookies
const allowedOrigins = new Set<string>([
  "https://techsai.in",
  "https://www.techsai.in",
  "http://localhost:5173",
]);
const methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (typeof origin === "undefined") return callback(null, true);
    if (allowedOrigins.has(origin)) return callback(null, true);
  },
  methods: methods,
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // allow cookies
};

// Apply middlewares
app.use(cors(corsOptions));
app.use(
  express.json({
    limit: "50mb",
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/", routes);

// Health check
app.get("/health", (_req, res) => {
  res.send("<h1>Server is running!</h1>");
});

app.get("/db-health", async (_req, res) => {
  const state = mongoose.connection.readyState;
  res.json({ mongoState: state });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
