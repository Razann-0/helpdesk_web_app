import { createClient } from "@supabase/supabase-js";

// Create a Supabase client instance by passing in your project's URL and public API key
// These credentials are used to interact with your Supabase backend from the frontend
export const supabase= createClient(
    "https://kpknejxjlqnxefcqzppr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtwa25lanhqbHFueGVmY3F6cHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQzNjAsImV4cCI6MjA2NzU2MDM2MH0.WMI15FM1cegAFDPLCcy_1H4N0CWXME7-NdPD-MVgMzw"
    )