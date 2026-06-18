import { createMiddleware } from 'hono/factory'
import { env } from 'hono/adapter'
import { sign, verify } from 'hono/jwt'

export const authMiddleware = createMiddleware<{
    Variables: {
        user: {
            id: string,
            email: string
        }
    }
}>(async (c, next) => {
  const { SERVER_SECRET } = env<{ SERVER_SECRET: string }>(c)

  const authHeader = c.req.header('authorization')

  if (!authHeader) {
    return c.json(
      { error: 'Authorization header is missing.' },
      401
    )
  }

  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return c.json(
      { error: 'Expected Bearer token in Authorization header.' },
      401
    )
  }

  try {
    const payload = await verify(token, SERVER_SECRET, 'HS256')

    if (!payload?.id) {
      return c.json(
        { error: 'Authenticated user identifier not found in token.' },
        403
      )
    }

    c.set('user', payload)

    await next()
  } catch {
    return c.json(
      { error: 'Invalid or expired access token.' },
      401
    )
  }
})