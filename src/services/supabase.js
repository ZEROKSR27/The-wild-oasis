import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kcnecazqiibjxxydpefd.supabase.co";
const gg =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbmVjYXpxaWlianh4eWRwZWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MDExODYsImV4cCI6MjA0MTM3NzE4Nn0.hPdCqsCyfA6jg87x9lEGPnqgVapjOtWIitGbSNPYN40";

const supabase = createClient(supabaseUrl, gg);
export default supabase;

// const supabasekey =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbmVjYXpxaWlianh4eWRwZWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MDExODYsImV4cCI6MjA0MTM3NzE4Nn0.hPdCqsCyfA6jg87x9lEGPnqgVapjOtWIitGbSNPYN40";
