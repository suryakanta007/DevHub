import "dotenv/config";
import http from "http";
import App from "./app.js";
import connectDB from "./common/config/db.js";

const server = http.createServer(App);
const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📡 API base: http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

// ── Graceful shutdown ──────────────────────────────────────────────────────────
process.on("SIGTERM", () => {
  console.log("SIGTERM received — shutting down gracefully");
  server.close(() => process.exit(0));
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err.message);
  server.close(() => process.exit(1));
});

start();