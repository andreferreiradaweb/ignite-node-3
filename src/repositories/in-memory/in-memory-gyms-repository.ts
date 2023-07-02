import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const findedGym = this.items.find((item: Gym) => item.id === id)

    if (!findedGym) {
      return null
    }

    return findedGym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      createdAt: new Date(),
    }

    this.items.push(gym)

    return gym
  }
}
