import { Hono } from "hono";
import { env } from "hono/adapter";
import { verify } from "hono/jwt";
import { authMiddleware } from "./middleware/authMiddleware";
import { createPrisma } from "./lib/prisma";
import { hash, compare } from "bcryptjs";
import { authSchema } from "./schemas/signinAuth";
import { createAccessToken, createRefreshToken } from "./lib/jwt";
import { signupAuthSchema } from "./schemas/signupAuth";
import { authAcountRouter } from "./routes/auth.account";
import { blogRouter } from "./routes/blog";



const app = new Hono();

app.route("/api/v1/user", authAcountRouter)
app.use("/api/v1/blog/*", authMiddleware);
app.route("/api/v1/blog", blogRouter)






export default app;
