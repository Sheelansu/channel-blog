import { sign } from "hono/jwt";

export const createAccessToken = (userId: string, secret: string) => {
  return sign(
    {
      id: userId,
      type: "access",
      //   exp: Math.floor(Date.now() / 1000) + 60 * 15, // 15 mins
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    },
    secret,
    "HS256",
  );
};

export const createRefreshToken = (userId: string, secret: string) => {
  return sign(
    {
      id: userId,
      type: "refresh",
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
    },
    secret,
    "HS256",
  );
};
