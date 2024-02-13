import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assessment } from 'schemas/assessment.schema';
import { Upload } from 'schemas/file.schema';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectModel(Assessment.name) private assessment: Model<Assessment>,
    @InjectModel(Upload.name) private uploadModel: Model<Upload>,
  ) {}

  async create(createAssessmentDto: Assessment): Promise<Assessment> {
    const data = {
      ...createAssessmentDto,
    };
    const createdAssessment = new this.assessment(data);
    return createdAssessment.save();
  }

  async findAll(): Promise<Assessment[]> {
    return this.assessment.find().exec();
  }

  async findByFilter(filter: object) {
    const assessments = await this.assessment.find({ ...filter });
    return assessments;
  }

  async findOne(params: { id: string }) {
    const assessment = await this.assessment.findById(params.id);
    if (!assessment) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No assessment found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return assessment;
  }

  async update(
    updateAssessmentDto: Assessment,
    id: string,
  ): Promise<Assessment> {
    const assessment = await this.assessment.findById(id);
    if (!assessment) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No assessment found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return assessment.updateOne(updateAssessmentDto);
  }
}
