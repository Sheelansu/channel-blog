import { Hono } from "hono";
import { authMiddleware } from "./middleware/authMiddleware";
import { authAcountRouter } from "./routes/auth.account";
import { blogRouter } from "./routes/blog";



const app = new Hono();

app.route("/api/v1/user", authAcountRouter)
app.route("/api/v1/blog", blogRouter)






export default app;
