import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContentEntity } from '../content/content.entity'
import { SeedService } from './seed.service'
import { SeedController } from './seed.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ContentEntity])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
