import { Hono } from "hono";
import { authMiddleware } from "../middleware/authMiddleware";
import { createPrisma } from "../lib/prisma";
import { env } from "hono/adapter";
import { blogPostSchema } from "../schemas/blogPost";

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

blogRouter.post("/", async (c) => {
  const { DATABASE_URL } = env<{
    DATABASE_URL: string;
  }>(c);

  const user = c.get("user") as AuthUser;
  const prisma = createPrisma(DATABASE_URL);
  const body = blogPostSchema.parse(await c.req.json());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: user.id,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {
  const { DATABASE_URL } = env<{
    DATABASE_URL: string;
  }>(c);

  const user = c.get("user") as AuthUser;
  const prisma = createPrisma(DATABASE_URL);
  const body = blogPostSchema.parse(await c.req.json());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: user.id,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.get("/:id", (c) => {
  return c.text("Hello Hono!");
});

blogRouter.get("/bulk", (c) => {
  return c.text("Hello Hono!");
});
