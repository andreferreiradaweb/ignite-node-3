import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findUserByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
