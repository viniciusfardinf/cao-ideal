import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config'; // Adicione este import
import { DogApiService } from './dog-api.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule, // Adicione aqui para o DogApiService conseguir usar o ConfigService
  ],
  providers: [DogApiService],
  exports: [DogApiService],
})
export class DogApiModule {}