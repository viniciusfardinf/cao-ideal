import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DogApiService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

constructor(
  private readonly httpService: HttpService,
  private readonly configService: ConfigService,
) {
  

this.apiKey = this.configService.get<string>('DOG_API_KEY')!;
this.apiUrl = this.configService.get<string>('DOG_API_URL')!;
}

async fetchAllBreeds() {
  try {
    // LOG DE DEBUG: Vamos ver se a chave está chegando aqui
    console.log('Tentando conectar com a chave:', this.apiKey ? 'Chave encontrada' : 'CHAVE VAZIA!');

    const { data } = await firstValueFrom(
      this.httpService.get(`${this.apiUrl}/breeds`, {
        headers: { 'x-api-key': this.apiKey.trim() }, // O .trim() remove espaços acidentais
      }),
    );
    return data;
  } catch (error) {
    // LOG DE ERRO REAL: Isso vai dizer no seu terminal o motivo do bloqueio (401, 403, etc)
    console.error('Erro da TheDogAPI:', error.response?.data || error.message);
    
    throw new HttpException(
      'Falha ao conectar com o provedor de dados de cães.',
      HttpStatus.BAD_GATEWAY,
    );
  }
}
}