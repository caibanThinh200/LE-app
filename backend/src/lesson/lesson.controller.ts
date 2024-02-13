import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { Lesson } from 'schemas/lesson.schema';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() lessonDto: Lesson) {
    return this.lessonService.create(lessonDto);
  }

  @Get()
  async find(@Query() filter: object) {
    return this.lessonService.findByFilter(filter);
  }

  @Get(':id')
  findOne(@Param() params: { id: string }) {
    return this.lessonService.findOne(params);
  }

  @Put(':id')
  update(@Body() lessonDto: Lesson, @Param() params: { id: string }) {
    return this.lessonService.update(lessonDto, params.id);
  }
}
