import { Hono } from 'hono'
import user from './routes/user'
import blog from './routes/blog'
import { getPrisma } from '../db/prismaFunction'
import { jwt } from 'hono/jwt'
import { auth } from 'hono/utils/basic-auth'
import jwtAuthenticaton from '../utils/authMiddleware'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>().basePath('/api/v1')

app.use('/*', cors())

app.use('user/auth/*', jwtAuthenticaton)
app.use('blog/*', jwtAuthenticaton)

app.route('/user', user)
app.route('/blog', blog)

export default app
