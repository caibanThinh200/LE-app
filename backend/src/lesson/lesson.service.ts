import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload } from 'schemas/file.schema';
import { Lesson } from 'schemas/lesson.schema';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<Lesson>,
    @InjectModel(Upload.name) private uploadModel: Model<Upload>,
  ) {}

  async create(createLessonDto: Lesson): Promise<Lesson> {
    const data = {
      ...createLessonDto,
      logo: new this.uploadModel(createLessonDto.logo),
    };
    const createdLesson = new this.lessonModel(data);
    return createdLesson.save();
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonModel.find().exec();
  }

  async findByFilter(filter: object) {
    const lessons = await this.lessonModel.find({ ...filter });
    return lessons;
  }

  async findOne(params: { id: string }) {
    const lesson = (
      await this.lessonModel.findOne({ _id: params.id })
    ).populate('assessments');

    if (!lesson) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No lesson found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return lesson;
  }

  async update(updateLessonDto: Lesson, id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(id);
    if (!lesson) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No lesson found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return lesson.updateOne(updateLessonDto);
  }
}
