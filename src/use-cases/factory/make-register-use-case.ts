import { PrismaUsersRepository } from '@/repositories/prisma/prisma'
import { RegisterUseCase } from '../register'

export function MakeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  return registerUseCase
}
