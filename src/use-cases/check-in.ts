import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins'
import { GymsRepository } from '@/repositories/gyms'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}
interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const findedGym = await this.gymsRepository.findById(gymId)

    if (!findedGym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: findedGym.latitude.toNumber(),
        longitude: findedGym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE = 0.1

    if (distance > MAX_DISTANCE) {
      throw new MaxDistanceError()
    }

    const checkInsOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInsOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({ gymId, userId })

    return {
      checkIn,
    }
  }
}
