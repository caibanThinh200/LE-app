import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PronouceScore } from 'schemas/pronouceScore.schema';

@Injectable()
export class PronouceScoreService {
  constructor(
    @InjectModel(PronouceScore.name)
    private pronouceScore: Model<PronouceScore>,
  ) {}
  async create(createPronouceScoreDto: PronouceScore): Promise<PronouceScore> {
    const data = {
      ...createPronouceScoreDto,
    };
    const createdQuest = new this.pronouceScore(data);
    return createdQuest.save();
  }

  async findAll(): Promise<PronouceScore[]> {
    return this.pronouceScore.find().exec();
  }

  async findByFilter(filter: object) {
    const quests = await this.pronouceScore.find({ ...filter });
    return quests;
  }

  async findOne(id) {
    const pronouceScore = await this.pronouceScore.findById(id);
    if (!pronouceScore) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No PronouceScore found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return PronouceScore;
  }

  async update(updateQuest: PronouceScore, id: string): Promise<PronouceScore> {
    const pronouceScore = await this.pronouceScore.findById(id);
    if (!pronouceScore) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No pronouce scrore found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return pronouceScore.updateOne(updateQuest);
  }
}
