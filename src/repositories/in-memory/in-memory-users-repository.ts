import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../users'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []
  async findUserByEmail(email: string) {
    const user = this.users.find((item: User) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
    }

    this.users.push(user)

    return user
  }
}
