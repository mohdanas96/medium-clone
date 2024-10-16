import { Hono } from 'hono'
import { getPrisma } from '../../db/prismaFunction'
import { decode, verify, sign } from 'hono/jwt'
import { hashPassword, verifyPassword } from '../../utils/hash'
import { getPathNoStrict } from 'hono/utils/url'

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Vairables: {
    userId: string
  }
}>()

user.post('/signup', async (c) => {
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

    console.log(typeof user, 'User')
  } catch (error) {
    console.log(error)
  }

  if (!user) {
    c.status(409)
    return c.json({
      message: 'User already exists',
      statusCode: 409,
    })
  }

  const hashedPassword = await hashPassword(password)

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email,
      },
    })

    const payload = {
      sub: user.id,
      role: 'user',
      exp: Math.floor(Date.now() / 1000) + 60 * 5,
    }

    c.status(200)

    return c.json({
      message: 'User created successfully',
      statusCode: 200,
    })
  } catch (error) {
    console.log(error)
    return c.json({
      message: 'Error while creating user',
    })
  }
})

user.post('/signin', async (c) => {
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
      message: 'User not found',
      statusCode: '404',
    })
  }

  // Not the ideal way
  if (await verifyPassword(user.password, password)) {
    const payload = {
      sub: user.id,
      role: 'user',
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }

    const token = await sign(payload, c.env.JWT_SECRET)

    c.status(200)

    return c.json({
      message: 'User signed in successfully',
      statusCode: 200,
      jwt: token,
    })
  } else {
    c.status(411)
    return c.json({
      message: 'Invalid username or password',
    })
  }
})

user.put('/update', (c) => {
  return c.text('Update user')
})

user.delete('/delete', async (c) => {
  console.log('WOrking')
  const prisma = getPrisma(c.env.DATABASE_URL)

  const payload = c.get('jwtPayload')

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        username: payload.sub,
      },
    })

    if (deletedUser) {
      c.status(200)

      return c.json({
        message: 'User removed succesfully',
        statusCode: 200,
      })
    }
  } catch (error) {
    throw console.log(error)
  }
})

export default user
