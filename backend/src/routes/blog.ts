import { Hono } from "hono";
import { authMiddleware } from "../middleware/authMiddleware";
import { createPrisma } from "../lib/prisma";
import { env } from "hono/adapter";
import { blogPostSchema, blogPutSchema } from "@sheelansu/channel-common";

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
      authorId: user.id,
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
  const user = c.get("user");

  const userName = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        name: true
      }
    });


  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 10;

  const [blogs, totalBlogs] = await Promise.all([
    prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        }

      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.post.count(),
  ]);

  return c.json({
    userName,
    page,
    limit,
    totalBlogs,
    totalPages: Math.ceil(totalBlogs / limit),
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const { DATABASE_URL } = env<{
    DATABASE_URL: string;
  }>(c);

  const prisma = createPrisma(DATABASE_URL);
  const id = c.req.param("id");

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    return c.json({
      blog,
    });
  } catch {
    return c.json({
      message: "Something went wrong in fetching blog post.",
    });
  }
});
