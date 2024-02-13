import { Test, TestingModule } from '@nestjs/testing';
import { PronouceScoreService } from './pronouce-score.service';

describe('PronouceScoreService', () => {
  let service: PronouceScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PronouceScoreService],
    }).compile();

    service = module.get<PronouceScoreService>(PronouceScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
