import { FastifyInstance } from 'fastify'
import { registerController } from './register'
import { authenticateController } from './authenticate'
import { profileController } from './profile'
import { verifyToken } from '@/http/middlewares/verifyToken'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  app.get('/me', { onRequest: [verifyToken] }, profileController)
}
