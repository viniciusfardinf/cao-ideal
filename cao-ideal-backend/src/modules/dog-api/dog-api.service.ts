import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DogApiService {
  constructor(private readonly httpService: HttpService) {}

  async fetchAllBreeds() {
    const apiKey = process.env.DOG_API_KEY;
    const apiUrl = 'https://api.thedogapi.com/v1';

    if (!apiKey) {
      throw new HttpException('API Key missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${apiUrl}/breeds`, {
          headers: { 'x-api-key': apiKey.trim() },
        }),
      );
      return data;
    } catch (error: any) {
      throw new HttpException('External API failure', HttpStatus.BAD_GATEWAY);
    }
  }
}