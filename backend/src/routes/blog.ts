import { Hono } from 'hono'
import { getPrisma } from '../../db/prismaFunction'

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userID: string
  }
}>()

blog.post('/', async (c) => {
  const { title, content, published } = await c.req.json()

  const prisma = getPrisma(c.env.DATABASE_URL)

  const payload = c.get('jwtPayload')

  try {
    const blog = await prisma.blogs.create({
      data: {
        title,
        content,
        published,
        authorId: payload.sub,
      },
    })

    c.status(200)

    return c.json({
      message: 'Blog created',
      statusCode: 200,
      blogId: blog.id,
    })
  } catch (error) {
    console.log(error)
  }
})

blog.get('/bulk', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const blogs = await prisma.blogs.findMany()

    c.status(200)

    return c.json({
      blogs,
      statusCode: 200,
    })
  } catch (error) {
    console.log(error)
  }
})

blog.get('/:id', async (c) => {
  const id = c.req.param('id')

  if (!id) {
    c.status(411)
    return c.json({
      message: 'id is required as a parameter',
      statusCode: 411,
    })
  }

  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const blog = await prisma.blogs.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!blog) {
      c.status(404)
      return c.json({
        message: 'Blog not found',
        statusCode: 404,
      })
    }

    c.status(200)
    return c.json({
      blog,
      statusCode: 200,
    })
  } catch (error) {
    console.log(error)
    return c.json({
      message: 'Internal server error',
    })
  }
})

blog.put('/:id', async (c) => {
  const data = await c.req.json()
  const id = parseInt(c.req.param('id'))
  const { sub } = c.get('jwtPayload')

  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const updatedBlog = await prisma.blogs.update({
      where: {
        id,
        authorId: sub,
      },
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
      },
    })

    if (!updatedBlog) {
      c.status(400)
      return c.json({
        message: "Couldn't update blog",
        statusCode: 400,
      })
    }

    c.status(200)
    return c.json({
      message: 'Blog updated',
      statusCode: 200,
      updatedBlog,
    })
  } catch (error) {
    console.log(error)
    c.status(400)
    return c.json({
      message: "Couldn't update blog",
      statusCode: 400,
    })
  }
})

blog.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const { sub } = c.get('jwtPayload')

  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const deletedBlog = await prisma.blogs.delete({
      where: {
        id,
        authorId: sub,
      },
    })

    if (!deletedBlog) {
      c.status(400)
      c.json({
        message: 'Could not delete the user',
        statusCode: 400,
      })
    }

    c.status(200)

    return c.json({
      message: 'User deleted successfully',
      statusCode: 200,
      deletedBlog,
    })
  } catch (error) {
    console.log(error)
    c.status(500)
    return c.json({
      message: 'Unauthorized',
      statusCode: 400,
    })
  }
})

export default blog
