import { createMiddleware } from "hono/factory";
import { env } from "hono/adapter";
import { verify } from "hono/jwt";
import { string } from "zod";

type AuthUser = {
  id: string;
};

export const authMiddleware = createMiddleware(async (c, next) => {
  const { SERVER_SECRET } = env<{ SERVER_SECRET: string }>(c);

  const authHeader = c.req.header("authorization");

  if (!authHeader) {
    return c.json(
      {
        error:
          "Authorization header is required. Send a Bearer token in the Authorization header.",
      },
      401,
    );
  }

  try {
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return c.json(
        {
          error:
            "Invalid authorization format. Expected: Authorization: Bearer <token>.",
        },
        401,
      );
    }

    const payload = await verify(token, SERVER_SECRET, "HS256");
    // const payload = (await verify(token, SERVER_SECRET, "HS256")) as AuthUser;
    const userId = string(payload.id|| "")

    if (!payload.id) {
      return c.json(
        {
          error: "Token payload is missing required user information.",
        },
        403,
      );
    }

    c.set("user", payload);

    await next();
  } catch {
    return c.json(
      {
        error: "Access token is invalid, expired, or could not be verified.",
      },
      401,
    );
  }
});
