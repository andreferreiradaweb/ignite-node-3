import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@exemple.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("shouldn't be able to authenticate with wrong email", async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      passwordHash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndove@exemple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("shouldn't be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      passwordHash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@exemple.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
