import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ContentEntity } from '../content/content.entity'
import { seedData } from './seed-data'

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepo: Repository<ContentEntity>,
  ) {}

  async seedContent(): Promise<{ seeded: number; skipped: boolean }> {
    const count = await this.contentRepo.count()
    if (count > 0) {
      return { seeded: 0, skipped: true }
    }

    const entities = seedData.map((item) =>
      this.contentRepo.create({
        ...item,
        features: item.features as unknown as Record<string, number>,
      }),
    )
    await this.contentRepo.save(entities)
    return { seeded: entities.length, skipped: false }
  }
}
