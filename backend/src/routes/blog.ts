import { Hono } from "hono";
import { authMiddleware } from "../middleware/authMiddleware";
import { createPrisma } from "../lib/prisma";
import { env } from "hono/adapter";
import {  blogPostSchema, blogPutSchema } from "../schemas/blogZod";

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

//Middleware
blogRouter.use("/*", authMiddleware);

//Blog post
blogRouter.post("/", async (c) => {
  const { DATABASE_URL } = env<{
    DATABASE_URL: string;
  }>(c);

  const user = c.get("user");
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

//Blog put|update
blogRouter.put("/", async (c) => {
  const { DATABASE_URL } = env<{
    DATABASE_URL: string;
  }>(c);

  const prisma = createPrisma(DATABASE_URL);
  const body = blogPutSchema.parse(await c.req.json());
  const user = c.get("user");

  const blog = await prisma.post.update({
    where: {
        id: body.id,
        authorId: user.id
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

//Pagination to be added after testing routes
blogRouter.get("/bulk", async (c) => {
  const { DATABASE_URL } = env<{
    DATABASE_URL: string;
  }>(c);

  const prisma = createPrisma(DATABASE_URL);

  const blogs = await prisma.post.findMany()

  return c.json({
    blogs
  })
});

blogRouter.get("/:id", async(c) => {
  const { DATABASE_URL } = env<{
    DATABASE_URL: string;
  }>(c);

  const prisma = createPrisma(DATABASE_URL);
  const id = c.req.param("id");

  try{
    const blog = await prisma.post.findFirst({
    where: {
        id
    },
  });

  return c.json({
    blog
  });
  } catch {
    return c.json({
      message: "Something went wrong in fetching blog post."
    })
  }
});

