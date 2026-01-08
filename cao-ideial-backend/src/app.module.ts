import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DogApiModule } from './modules/dog-api/dog-api.module';
import { RecommendationModule } from './modules/recommendation/recommendation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,      // Garante que o .env seja visto em todo lugar
      envFilePath: '.env', // Força o Nest a olhar para o arquivo na raiz
    }),
    DogApiModule,
    RecommendationModule,
  ],
})
export class AppModule {}