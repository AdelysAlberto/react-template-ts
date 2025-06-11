import { z } from "zod";

const envSchema = z.object({
  VITE_APP_TITLE: z.string(),
  VITE_FACEBOOK_URL: z.string().optional(),
  VITE_INSTAGRAM_URL: z.string().optional(),
  VITE_TWITTER_URL: z.string().optional(),
  VITE_TIKTOK_URL: z.string().optional(),
  VITE_EMAIL: z.string(),
});

envSchema.parse(import.meta.env);
