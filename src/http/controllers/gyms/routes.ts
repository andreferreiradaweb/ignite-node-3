import { FastifyInstance } from 'fastify'
import { verifyToken } from '@/http/middlewares/verifyToken'
import { SearchGymsController } from './search-gyms'
import { FetchNearbyGymsController } from './fetch-nearby-gyms'
import { CreateGymController } from './create-gym'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyToken)

  app.get('/gyms/search', SearchGymsController)
  app.get('/gyms/nearby', FetchNearbyGymsController)
  app.post('/gyms', CreateGymController)
}
