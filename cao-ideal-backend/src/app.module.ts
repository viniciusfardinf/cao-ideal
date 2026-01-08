import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <--- IMPORTANTE
import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { DogApiModule } from './modules/dog-api/dog-api.module';

@Module({
  imports: [
    // Isso aqui é o que faz a DOG_API_KEY funcionar!
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RecommendationModule,
    DogApiModule,
  ],
})
export class AppModule {}