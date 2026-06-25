import { z } from "zod";

export const signupAuthSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(8, "Name must be at least 3 characters"),
});

export const signinAuthSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title cannot be empty."),
  content: z.string().min(1, "Content cannot be empty."),
});

export const blogPutSchema = z.object({
  id: z.string().min(1, "Blog id cannot be empty."),
  title: z.string().min(1, "Title cannot be empty."),
  content: z.string().min(1, "Content cannot be empty."),
});

export type AuthInputSignup = z.infer<typeof signupAuthSchema>;
export type AuthInputSignin = z.infer<typeof signinAuthSchema>;
export type AuthInputPost = z.infer<typeof blogPostSchema>;
export type AuthInputPut = z.infer<typeof blogPostSchema>;