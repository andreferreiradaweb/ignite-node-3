import { PrismaUsersRepository } from '@/repositories/prisma/prisma'
import { AuthenticateUseCase } from '../authenticate'

export function MakeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

  return authenticateUseCase
}
