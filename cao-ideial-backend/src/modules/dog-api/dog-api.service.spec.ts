import { Test, TestingModule } from '@nestjs/testing';
import { DogApiService } from './dog-api.service';

describe('DogApiService', () => {
  let service: DogApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogApiService],
    }).compile();

    service = module.get<DogApiService>(DogApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
