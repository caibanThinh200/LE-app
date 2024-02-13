import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Upload, UploadSchema } from './file.schema';
import { Quest } from './quest.schema';

export type AssessmentDocument = mongoose.HydratedDocument<Assessment>;

@Schema({ timestamps: true })
export class Assessment extends mongoose.Document {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ type: UploadSchema })
  poster: Upload;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Assessment.name })
  nextAssessment: Assessment;

  @Prop({ type: UploadSchema })
  assessmentVideo: Upload;

  @Prop({ required: true })
  videoDuration: number;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Quest.name }])
  quests: Quest[];

  @Prop({ required: true })
  content: string;
}

export const AssessmentSchema = SchemaFactory.createForClass(Assessment);
