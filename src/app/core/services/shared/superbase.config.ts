import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://msxykiwwtzzayizhnbjj.supabase.co", // Supabase URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zeHlraXd3dHp6YXlpemhuYmpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NjA5MTEsImV4cCI6MjA2NjQzNjkxMX0.V4e-OSOZibvOhgn_fJkGIRZdfVkObMQ6ij9Ba2fMnD0" // Supabase anon key
);
