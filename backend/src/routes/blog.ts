import { Hono } from "hono";
import { authMiddleware } from "../middleware/authMiddleware";

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
  const user = c.get("user") as AuthUser;
  return c.text("Hello Hono!");
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