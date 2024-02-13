import { Module } from '@nestjs/common';
import { PronouceScoreService } from './pronouce-score.service';
import { PronouceScoreController } from './pronouce-score.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PronouceSchema, PronouceScore } from 'schemas/pronouceScore.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PronouceScore.name, schema: PronouceSchema },
    ]),
  ],
  controllers: [PronouceScoreController],
  providers: [PronouceScoreService],
})
export class PronouceScoreModule {}
