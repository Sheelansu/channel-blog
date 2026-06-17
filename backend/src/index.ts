import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'
import { sign, verify } from 'hono/jwt'

const app = new Hono()

app.post('/api/v1/signup', async (c) => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
  const { SERVER_SECRET } = env<{ SERVER_SECRET: string }>(c)
  
  const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  })

  const token = await sign({id: user.id, email: body.email}, SERVER_SECRET)

  return c.json({
    jwt: token 
  })
})


app.post('/api/v1/signin', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

export default app
