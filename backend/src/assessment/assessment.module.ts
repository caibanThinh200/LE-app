import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Assessment, AssessmentSchema } from 'schemas/assessment.schema';
import { Upload, UploadSchema } from 'schemas/file.schema';
import { AssessmentController } from './assessment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assessment.name, schema: AssessmentSchema },
      { name: Upload.name, schema: UploadSchema },
    ]),
  ],
  controllers: [AssessmentController],
  providers: [AssessmentService],
})
export class AssessmentModule {}
