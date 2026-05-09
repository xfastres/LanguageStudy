import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ContentEntity } from './content.entity'
import { CreateContentDto, FeedQueryDto, UpdateContentDto } from './content.dto'
import { recommendNext, rankCandidates } from '@linguaflow/feature-space'
import type { ContentFeatureVector, UserProfileVector } from '@linguaflow/feature-space'

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepo: Repository<ContentEntity>,
  ) {}

  async findAll(language?: string, level?: number, limit = 20, offset = 0): Promise<[ContentEntity[], number]> {
    const qb = this.contentRepo.createQueryBuilder('c')
    if (language) qb.andWhere('c.language = :language', { language })
    if (level !== undefined) qb.andWhere('c.level = :level', { level })
    qb.orderBy('c.createdAt', 'DESC').skip(offset).take(limit)
    return qb.getManyAndCount()
  }

  async findOne(id: string): Promise<ContentEntity | null> {
    return this.contentRepo.findOne({ where: { id } })
  }

  async create(dto: CreateContentDto): Promise<ContentEntity> {
    const entity = this.contentRepo.create(dto)
    return this.contentRepo.save(entity)
  }

  async getFeed(query: FeedQueryDto): Promise<ContentEntity[]> {
    const { userProfile, language, level, limit = 20 } = query

    const qb = this.contentRepo.createQueryBuilder('c')
    if (language) qb.andWhere('c.language = :language', { language })
    if (level !== undefined) qb.andWhere('c.level = :level', { level })
    const candidates = await qb.getMany()

    if (!userProfile) {
      return candidates.slice(0, limit)
    }

    const profile = userProfile as unknown as UserProfileVector
    const ranked = rankCandidates(
      profile,
      candidates.map((c) => ({
        id: c.id,
        features: c.features as unknown as ContentFeatureVector,
      })),
    )

    const rankedIds = ranked.map((r) => r.id)
    const entityMap = new Map(candidates.map((c) => [c.id, c]))
    return rankedIds
      .map((id) => entityMap.get(id))
      .filter((e): e is ContentEntity => e !== undefined)
      .slice(0, limit)
  }

  async update(id: string, dto: UpdateContentDto): Promise<ContentEntity | null> {
    await this.contentRepo.update(id, dto)
    return this.contentRepo.findOne({ where: { id } })
  }

  async remove(id: string): Promise<void> {
    await this.contentRepo.delete(id)
  }

  async submitFeedback(id: string, comprehension: number): Promise<void> {
    await this.contentRepo.update(id, {})
  }
}
