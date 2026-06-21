import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title cannot be empty."),
  content: z.string().min(8, "Content cannot be empty."),
});

export type AuthInput = z.infer<typeof blogPostSchema>;