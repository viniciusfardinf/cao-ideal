import { Injectable } from '@nestjs/common';
import { DogApiService } from '../dog-api/dog-api.service';
import { UserLifestyleDto } from './dto/user-lifestyle.dto';
import translate from 'google-translate-api-x'; // Importa o tradutor

@Injectable()
export class RecommendationService {
  constructor(private readonly dogApiService: DogApiService) {}

  // Função para traduzir qualquer texto dinamicamente
  private async translateToBr(text: string): Promise<string> {
    try {
      const res = await translate(text, { to: 'pt' });
      return res.text;
    } catch (e) {
      return text; // Fallback para inglês se a tradução falhar
    }
  }

  async getRecommendations(user: UserLifestyleDto) {
    const breeds = await this.dogApiService.fetchAllBreeds();
    
    const scoredBreeds = breeds.map((breed, index) => {
      let score = 50 + (index * 0.02); 
      const temp = breed.temperament?.toLowerCase() || '';
      const weight = parseInt(breed.weight?.metric?.split(' - ')[1]) || 20;

      // Lógica de pesos para o Match
      if (user.housing === 'APT_SMALL' && weight > 12) score -= 60;
      if (user.activityLevel === 'LOW' && temp.includes('energetic')) score -= 45;
      if (user.hasChildren === 'true' && (temp.includes('gentle') || temp.includes('friendly'))) score += 35;

      return { breed, score };
    });

    const top3 = scoredBreeds
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // TRADUÇÃO EM TEMPO REAL
    return Promise.all(top3.map(async (item, i) => {
      const b = item.breed;
      
      // Traduz o nome e o temperamento principal
      const [nameBr, traitBr] = await Promise.all([
        this.translateToBr(b.name),
        this.translateToBr(b.temperament?.split(',')[0] || 'Amigável')
      ]);

      const phrases = [
        `Sua melhor escolha! Este cão é conhecido por ser muito ${traitBr.toLowerCase()}.`,
        `Excelente alternativa para sua rotina, famoso por ser ${traitBr.toLowerCase()}.`,
        `Uma ótima opção que combina com você por ser ${traitBr.toLowerCase()}.`
      ];

      let img = b.image?.url || `https://cdn2.thedogapi.com/images/${b.reference_image_id}.jpg`;

      return {
        name: nameBr.toUpperCase(),
        score: Math.max(5, Math.min(Math.round(item.score), 99)),
        description: phrases[i],
        image: img
      };
    }));
  }
}