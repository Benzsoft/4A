import { z } from 'zod';

const envSchema = z.object({
  supabaseUrl: z.string().url(),
  supabaseAnonKey: z.string(),
  mistralApiKey: z.string().optional(),
  geminiApiKey: z.string().optional(),
  openaiApiKey: z.string().optional(),
});

const processEnv = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  mistralApiKey: import.meta.env.VITE_MISTRAL_API_KEY,
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyASzdgvm8MR12TZrfFHsU9eORC3rsxGNGY',
  openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY,
};

export const config = envSchema.parse(processEnv);

export type Config = z.infer<typeof envSchema>;