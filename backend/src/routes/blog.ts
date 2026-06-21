import { Hono } from "hono";
import { authMiddleware } from "../middleware/authMiddleware";
import { createPrisma } from "../lib/prisma";
import { env } from "hono/adapter";

type AuthUser = {
  id: string;
  email: string;
};

type AppBindings = {
  Variables: {
    user: AuthUser;
  };
};

export const blogRouter = new Hono<AppBindings>();


blogRouter.use("/*", authMiddleware);

blogRouter.post("/", (c) => {
    const { DATABASE_URL, SERVER_SECRET } = env<{
    DATABASE_URL: string;
    SERVER_SECRET: string;
  }>(c);
  const user = c.get("user") as AuthUser;
  const prisma = createPrisma(DATABASE_URL);
});

blogRouter.put("/", (c) => {
  return c.text("Hello Hono!");
});

blogRouter.get("/:id", (c) => {
  return c.text("Hello Hono!");
});

blogRouter.get("/bulk", (c) => {
  return c.text("Hello Hono!");
});