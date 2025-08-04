import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// More detailed error handling with better debugging info
if (!supabaseUrl) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL is missing from environment variables"
  );
  throw new Error(
    "Missing Supabase URL. Please set NEXT_PUBLIC_SUPABASE_URL in your environment variables."
  );
}

if (!supabaseKey) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing from environment variables"
  );
  throw new Error(
    "Missing Supabase Key. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables."
  );
}

// Log successful configuration (without exposing sensitive data)
console.log("Supabase client configured successfully");
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key length:", supabaseKey.length);

export const supabase = createClient(supabaseUrl, supabaseKey);
