import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { DogApiModule } from '../dog-api/dog-api.module'; // Importante!

@Module({
  imports: [DogApiModule], // Importa aqui para ter acesso ao serviço externo
  providers: [RecommendationService],
  controllers: [RecommendationController],
})
export class RecommendationModule {}