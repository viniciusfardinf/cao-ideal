import { Controller, Get, Query } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { UserLifestyleDto } from './dto/user-lifestyle.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('recommendations') // Agrupa no Swagger
@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get()
  @ApiOperation({ summary: 'Obter recomendações de raças baseadas no estilo de vida' })
  @ApiResponse({ status: 200, description: 'Lista de raças recomendadas com score.' })
  async getRecommendations(@Query() query: UserLifestyleDto) {
    // O NestJS via ValidationPipe já garante que 'query' segue o DTO
    return this.recommendationService.getRecommendations(query);
  }
}