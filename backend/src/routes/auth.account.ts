import { Hono } from "hono";
import { env } from "hono/adapter";
import { verify } from "hono/jwt";
import { createPrisma } from "../lib/prisma";
import { hash, compare } from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../lib/jwt";
import { signinAuthSchema, signupAuthSchema } from "@sheelansu/channel-common";

export const authAcountRouter = new Hono()

const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

//signup
authAcountRouter.post("/signup", async (c) => {
  const { DATABASE_URL, SERVER_SECRET } = env<{
    DATABASE_URL: string;
    SERVER_SECRET: string;
  }>(c);

  const prisma = createPrisma(DATABASE_URL);

  try {
    const body = signupAuthSchema.parse(await c.req.json());

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return c.json(
        {
          error: "An account already exists with this email address.",
        },
        409,
      );
    }

    const hashedPassword = await hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });

    const accessToken = await createAccessToken(user.id, SERVER_SECRET);

    const refreshToken = await createRefreshToken(user.id, SERVER_SECRET);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
      },
    });

    return c.json(
      {
        accessToken,
        refreshToken,
      },
      201,
    );
  } catch (error) {
    return c.json(
      {
        error: "Invalid request payload.",
      },
      400,
    );
  }
});

//signin
authAcountRouter.post("/signin", async (c) => {
  const { DATABASE_URL, SERVER_SECRET } = env<{
    DATABASE_URL: string;
    SERVER_SECRET: string;
  }>(c);

  const prisma = createPrisma(DATABASE_URL);

  try {
    const body = signinAuthSchema.parse(await c.req.json());

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return c.json(
        {
          error: "Invalid email or password.",
        },
        401,
      );
    }

    const validPassword = await compare(body.password, user.password);

    if (!validPassword) {
      return c.json(
        {
          error: "Invalid password or email.",
        },
        401,
      );
    }

    const accessToken = await createAccessToken(user.id, SERVER_SECRET);

    const refreshToken = await createRefreshToken(user.id, SERVER_SECRET);

    await prisma.$transaction([
      prisma.refreshToken.deleteMany({
        where: {
          userId: user.id,
        },
      }),

      prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
        },
      }),
    ]);

    return c.json({
      accessToken,
      refreshToken,
    });
  } catch {
    return c.json(
      {
        error: "Invalid request payload.",
      },
      400,
    );
  }
});

//refresh
authAcountRouter.post("/refresh", async (c) => {
  const { SERVER_SECRET } = env<{
    SERVER_SECRET: string;
  }>(c);

  const { refreshToken } = await c.req.json();

  if (!refreshToken) {
    return c.json(
      {
        error: "Refresh token is required.",
      },
      400,
    );
  }

  try {
    const payload = await verify(refreshToken, SERVER_SECRET, "HS256");

    if (payload.type !== "refresh") {
      return c.json(
        {
          error: "Invalid refresh token.",
        },
        401,
      );
    }

    const accessToken = await createAccessToken(
      payload.id as string,
      SERVER_SECRET,
    );

    return c.json({
      accessToken,
    });
  } catch {
    return c.json(
      {
        error: "Refresh token is invalid or expired.",
      },
      401,
    );
  }
});