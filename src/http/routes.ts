import { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register'
import { authenticateController } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)
}
