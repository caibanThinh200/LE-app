import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Upload, UploadSchema } from './file.schema';
import { Assessment } from './assessment.schema';

export type LessonDocument = mongoose.HydratedDocument<Lesson>;

@Schema({ timestamps: true })
export class Lesson extends mongoose.Document {
  @Prop({ required: true, default: 'pending' })
  title: string;

  @Prop()
  status: string;

  @Prop({ required: true })
  class: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Lesson.name })
  nextLesson: Lesson;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Assessment.name }])
  assessments: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: UploadSchema })
  logo: Upload;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
