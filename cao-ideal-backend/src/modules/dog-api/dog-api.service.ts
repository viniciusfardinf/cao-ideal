import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DogApiService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // Busca a URL da API ou usa a padrão caso não exista no Env
    this.apiUrl = this.configService.get<string>('DOG_API_URL') || 'https://api.thedogapi.com/v1';
  }

  // Criamos um método para pegar a chave sempre que precisar, 
  // garantindo que ela venha da Render ou do .env
  private getApiKey(): string {
    const key = this.configService.get<string>('DOG_API_KEY') || process.env.DOG_API_KEY;
    return key ? key.trim() : '';
  }

  async fetchAllBreeds() {
    const apiKey = this.getApiKey();

    // LOG DE DEBUG MELHORADO
    console.log('--- Verificação de Conexão ---');
    console.log('API URL:', this.apiUrl);
    console.log('Status da Chave:', apiKey ? 'CHAVE CARREGADA ✅' : 'CHAVE VAZIA ❌');
    console.log('------------------------------');

    if (!apiKey) {
      throw new HttpException(
        'A chave DOG_API_KEY não foi configurada nas variáveis de ambiente.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/breeds`, {
          headers: { 'x-api-key': apiKey },
        }),
      );
      return data;
    } catch (error: any) {
      console.error('Erro na TheDogAPI:', error.response?.data || error.message);
      
      throw new HttpException(
        'Falha ao conectar com o provedor de dados de cães.',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}