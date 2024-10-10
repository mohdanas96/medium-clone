import { Hono } from "hono"
import { getPrisma } from "../../db/prismaFunction"

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Vairables: {
    userId: string
  }
}>()

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
