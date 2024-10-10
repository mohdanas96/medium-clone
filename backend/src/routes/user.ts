import { Hono } from "hono"

const user = new Hono()

user.post("/signup", (c) => {
  return c.text("signup ")
})

user.post("/signin", (c) => {
  return c.text("signin")
})

user.put("/", (c) => {
  return c.text("Update user")
})

user.delete("/delete", (c) => {
  return c.text("delete")
})

export default user
