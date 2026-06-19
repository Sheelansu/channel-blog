import { z } from "zod";

export const signupAuthSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(8, "Name must be at least 3 characters"),
});

export type AuthInput = z.infer<typeof signupAuthSchema>;
