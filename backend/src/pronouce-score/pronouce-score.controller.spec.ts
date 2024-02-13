import { Test, TestingModule } from '@nestjs/testing';
import { PronouceScoreController } from './pronouce-score.controller';
import { PronouceScoreService } from './pronouce-score.service';

describe('PronouceScoreController', () => {
  let controller: PronouceScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PronouceScoreController],
      providers: [PronouceScoreService],
    }).compile();

    controller = module.get<PronouceScoreController>(PronouceScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
