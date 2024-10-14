import { Hono } from "hono"
import { getPrisma } from "../../db/prismaFunction"
import { decode, verify, sign } from "hono/jwt"

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Vairables: {
    userId: string
  }
}>()

user.post("/signup", async (c) => {
  // create jwt token
  // zod validation
  // password hashing

  const body = await c.req.json()

  const { username, password, firstName, lastName, email } = body

  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
        email,
      },
    })

    console.log(typeof user, "User")
  } catch (error) {
    console.log(error)
  }

  if (!user) {
    c.status(409)
    return c.json({
      message: "User already exists",
      statusCode: 409,
    })
  }

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
        firstName,
        lastName,
        email,
      },
    })

    const payload = {
      sub: user.id,
      role: "user",
      exp: Math.floor(Date.now() / 1000) + 60 * 5,
    }

    const token = await sign(payload, c.env.JWT_SECRET)

    c.status(200)

    return c.json({
      message: "User created successfully",
      statusCode: 200,
      jwt: token,
    })
  } catch (error) {
    console.log(error)
    return c.json({
      message: "Error while creating user",
    })
  }
})

user.post("/signin", async (c) => {
  const body = await c.req.json()

  const { username, password } = body

  const prisma = getPrisma(c.env.DATABASE_URL)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    c.status(404)

    return c.json({
      message: "User not found",
      statusCode: "404",
    })
  }

  if (user.password === password) {
    const payload = {
      sub: user.id,
      role: "user",
      exp: Math.floor(Date.now() / 1000) + 60 * 5,
    }

    const token = await sign(payload, c.env.JWT_SECRET)

    c.status(200)

    return c.json({
      message: "User signed in successfully",
      statusCode: 200,
      jwt: token,
    })
  } else {
    c.status(411)
    return c.json({
      message: "Invalid username or password",
    })
  }
})

user.put("/", (c) => {
  return c.text("Update user")
})

user.delete("/delete", (c) => {
  return c.text("delete")
})

export default user
