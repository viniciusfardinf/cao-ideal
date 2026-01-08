import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { DogApiModule } from './modules/dog-api/dog-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RecommendationModule,
    DogApiModule,
  ],
})
export class AppModule {}