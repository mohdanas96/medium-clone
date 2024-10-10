import { Hono } from "hono"

const blog = new Hono()

blog.post("/", (c) => {
  console.log("WOrking")
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
