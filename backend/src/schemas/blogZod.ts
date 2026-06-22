import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title cannot be empty."),
  content: z.string().min(1, "Content cannot be empty."),
});

export type AuthInputPost = z.infer<typeof blogPostSchema>;

export const blogPutSchema = z.object({
  id: z.string().min(1, "Blog id cannot be empty."),
  title: z.string().min(1, "Title cannot be empty."),
  content: z.string().min(1, "Content cannot be empty."),
});

export type AuthInputPut = z.infer<typeof blogPostSchema>;