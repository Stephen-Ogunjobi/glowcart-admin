const { execSync } = require("child_process");
const fs = require("fs");

console.log("Starting deployment process...");

// Check if required environment variables are set
const requiredVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

const missingVars = requiredVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error("❌ Missing environment variables:", missingVars);
  console.log("Please set these variables in your deployment platform");
  process.exit(1);
}

console.log("✅ All environment variables are present");

try {
  console.log("Building application...");
  execSync("npm run build", { stdio: "inherit" });
  console.log("✅ Build completed successfully");
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}
