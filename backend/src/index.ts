import { Hono } from "hono";
import { authAcountRouter } from "./routes/auth.account";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";



const app = new Hono();

app.use('/api/*', cors())

app.route("/api/v1/user", authAcountRouter)
app.route("/api/v1/blog", blogRouter)






export default app;
