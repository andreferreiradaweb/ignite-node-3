import { MakeGetUserProfileUseCase } from '@/use-cases/factory/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = MakeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      passwordHash: undefined,
    },
  })
}
