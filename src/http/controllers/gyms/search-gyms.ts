import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeSearchGymsUseCase } from '@/use-cases/factory/make-search-gyms-use-case'

export async function SearchGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymBodySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymBodySchema.parse(request.body)

  const createGymUseCase = MakeSearchGymsUseCase()

  const searchedGyms = await createGymUseCase.execute({
    query,
    page,
  })

  return reply.status(201).send({ searchedGyms })
}
