import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DogApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async fetchAllBreeds() {
    // 1. Tenta pegar a chave de dois lugares diferentes para garantir
    const rawKey = this.configService.get<string>('DOG_API_KEY') || process.env.DOG_API_KEY;
    const apiUrl = this.configService.get<string>('DOG_API_URL') || 'https://api.thedogapi.com/v1';

    // 2. Só faz o trim SE a chave existir. Se não, vira string vazia.
    const apiKey = rawKey ? String(rawKey).trim() : '';

    console.log('--- DEBUG RENDER ---');
    console.log('Chave encontrada?', apiKey ? 'SIM ✅' : 'NÃO ❌');
    console.log('URL alvo:', apiUrl);

    if (!apiKey) {
      throw new HttpException(
        'A chave DOG_API_KEY não foi encontrada nas variáveis da Render.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${apiUrl}/breeds`, {
          headers: { 'x-api-key': apiKey },
        }),
      );
      return data;
    } catch (error: any) {
      console.error('Erro na TheDogAPI:', error.response?.data || error.message);
      throw new HttpException('Erro ao conectar com a API externa', HttpStatus.BAD_GATEWAY);
    }
  }
}