import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RecommendationModule } from './recommendation/recommendation.module'
import { SignalModule } from './signal/signal.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RecommendationModule,
    SignalModule,
  ],
})
export class AppModule {}
