import { Hono } from 'hono'
import { getPrisma } from '../../db/prismaFunction'
import { sign } from 'hono/jwt'
import { hashPassword, verifyPassword } from '../../utils/hash'
import {
  signupInput,
  signinInput,
  updateUserInput,
} from '@mohdanas/common-medium/dist/user-types'

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Vairables: {
    userId: number
  }
}>()

user.post('/signup', async (c) => {
  const body = await c.req.json()

  const inputValidation = signupInput.safeParse(body)

  if (!inputValidation.success) {
    c.status(400)
    return c.json({
      message: 'Invalid inputs',
      statusCode: 400,
    })
  }

  const { username, password, firstName, lastName, email } = body

  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
        email,
      },
    })

    if (user) {
      c.status(409)
      return c.json({
        user,
        message: 'User already exists',
        statusCode: 409,
      })
    }

    console.log(user)
  } catch (error) {
    console.log(error)
  }

  const hashedPassword = await hashPassword(password)

  try {
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email,
      },
    })

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

  const inputValidation = signinInput.safeParse(body)

  if (!inputValidation.success) {
    c.status(400)
    return c.json({
      message: 'Invalid inputs',
      statusCode: 400,
    })
  }

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

user.put('/auth/update', async (c) => {
  const body = await c.req.json()

  const inputValidation = updateUserInput.safeParse(body)

  if (!inputValidation.success) {
    c.status(400)
    return c.json({
      message: 'Invalid inputs',
      statusCode: 400,
    })
  }

  const { username, firstName, lastName } = body

  const prisma = getPrisma(c.env.DATABASE_URL)

  const { sub } = c.get('jwtPayload')

  try {
    const userExist = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (userExist) {
      c.status(409)

      return c.json({
        message: 'Username is taken',
        statusCode: 409,
      })
    }
  } catch (error) {
    console.log(error)
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: sub,
    },
    data: {
      username,
      firstName,
      lastName,
    },
  })

  if (!updatedUser) {
    c.status(503)
    return c.json({
      message: 'Updation failed try again after sometime',
      statusCode: 503,
    })
  }

  c.status(200)
  return c.json({
    message: 'User updated succesfully',
    statusCode: 200,
    updatedUser,
  })
})

user.delete('/auth/delete', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)

  const payload = c.get('jwtPayload')

  const userId = payload.sub

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (user) {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: userId,
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
  }

  c.status(404)
  return c.json({
    message: 'User not found',
    statusCode: 404,
  })
})

export default user
