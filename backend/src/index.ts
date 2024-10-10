import { Hono } from "hono"
import user from "./routes/user"
import blog from "./routes/blog"
import { getPrisma } from "../db/prismaFunction"

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>().basePath("/api/v1")

app.route("/user", user)
app.route("/blog", blog)

app.get("/", (c) => {
  getPrisma(c.env.DATABASE_URL)
  return c.text("WOrking")
})

export default app
