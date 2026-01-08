import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DogApiService {
  constructor(private readonly httpService: HttpService) {}

  async fetchAllBreeds() {
    // LER DIRETO DO SISTEMA (Ignora o ConfigService que está dando "vazio")
    const apiKey = process.env.DOG_API_KEY;
    const apiUrl = 'https://api.thedogapi.com/v1';

    console.log('--- TESTE DE CHAVE ---');
    console.log('Valor bruto da chave:', apiKey ? 'ENCONTRADA' : 'VAZIA');
    
    // Proteção total contra o erro de .trim()
    if (!apiKey || apiKey === '') {
      console.error('ERRO: A variável DOG_API_KEY não chegou no servidor!');
      throw new HttpException('Configuração de API ausente', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${apiUrl}/breeds`, {
          headers: { 'x-api-key': apiKey.trim() },
        }),
      );
      return data;
    } catch (error: any) {
      console.error('Erro na chamada da TheDogAPI:', error.message);
      throw new HttpException('Falha na API externa', HttpStatus.BAD_GATEWAY);
    }
  }
}