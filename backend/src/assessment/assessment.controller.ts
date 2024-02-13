import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Put,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { Assessment } from 'schemas/assessment.schema';
import { AssessmentService } from './assessment.service';

@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() lessonDto: Assessment) {
    return this.assessmentService.create(lessonDto);
  }

  @Get()
  async find(@Query() filter: object) {
    return this.assessmentService.findByFilter(filter);
  }

  @Get(':id')
  findOne(@Param() params: { id: string }) {
    return this.assessmentService.findOne(params);
  }

  @Put(':id')
  update(@Body() lessonDto: Assessment, @Param() params: { id: string }) {
    return this.assessmentService.update(lessonDto, params.id);
  }
}
