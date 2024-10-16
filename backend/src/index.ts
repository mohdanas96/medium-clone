import { Hono } from 'hono'
import user from './routes/user'
import blog from './routes/blog'
import { getPrisma } from '../db/prismaFunction'
import { jwt } from 'hono/jwt'
import { auth } from 'hono/utils/basic-auth'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>().basePath('/api/v1')

app.use('/auth/*', (c, next) => {
  console.log('authenticaton working')
  const authMiddleware = jwt({
    secret: c.env.JWT_SECRET,
  })

  return authMiddleware(c, next)
})

app.route('/user', user)
app.route('/blog', blog)

export default app
