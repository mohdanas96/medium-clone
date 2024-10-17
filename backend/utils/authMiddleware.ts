import { Context } from 'hono'
import { jwt } from 'hono/jwt'

const jwtAuthenticaton = (c: Context, next: () => Promise<void>) => {
  const authMiddleware = jwt({
    secret: c.env.JWT_SECRET,
  })

  return authMiddleware(c, next)
}

export default jwtAuthenticaton
