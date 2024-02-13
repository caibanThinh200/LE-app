import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from 'schemas/lesson.schema';
import { Upload, UploadSchema } from 'schemas/file.schema';
import { Assessment, AssessmentSchema } from 'schemas/assessment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lesson.name, schema: LessonSchema },
      { name: Upload.name, schema: UploadSchema },
      { name: Assessment.name, schema: AssessmentSchema },
    ]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
