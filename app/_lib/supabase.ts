import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase URL or Key. Make sure SUPABASE_URL and SUPABASE_KEY are set in your environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
