import { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register'
import { authenticateController } from './controllers/authenticate'
import { profileController } from './controllers/profile'
import { verifyToken } from './middlewares/verifyToken'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  app.get('/me', { onRequest: [verifyToken] }, profileController)
}
