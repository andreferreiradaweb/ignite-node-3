import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeFetchNearbyGymsUseCase } from '@/use-cases/factory/make-fetch-nearby-gyms-use-case'

export async function FetchNearbyGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const nearbyGymsBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsBodySchema.parse(request.body)

  const createGymUseCase = MakeFetchNearbyGymsUseCase()

  const searchedGyms = await createGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({ searchedGyms })
}
