import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quest } from 'schemas/quest.schema';

@Injectable()
export class QuestService {
  constructor(@InjectModel(Quest.name) private quest: Model<Quest>) {}
  async create(createQuestDto: Quest): Promise<Quest> {
    const data = {
      ...createQuestDto,
    };
    const createdQuest = new this.quest(data);
    return createdQuest.save();
  }

  async findAll(): Promise<Quest[]> {
    return this.quest.find().exec();
  }

  async findByFilter(filter: object) {
    const quests = await this.quest.find({ ...filter });
    return quests;
  }

  async findOne(id) {
    const quest = await this.quest.findById(id);
    if (!quest) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No quest found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return quest;
  }

  async update(updateQuest: Quest, id: string): Promise<Quest> {
    const quest = await this.quest.findById(id);
    if (!quest) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No quest found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return quest.updateOne(updateQuest);
  }
}
