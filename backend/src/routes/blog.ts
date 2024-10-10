import { Hono } from "hono"

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userID: string
  }
}>()

blog.post("/", (c) => {
  return c.text("Create blog")
})

blog.get("/bulk", (c) => {
  return c.text("Get all blogs")
})

blog.get("/:id", (c) => {
  return c.text("get a specific blog")
})

blog.put("/", (c) => {
  return c.text("update blog")
})

blog.delete("/:id", (c) => {
  return c.text("Delete blog")
})

export default blog
