import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PronouceScoreDocument = mongoose.HydratedDocument<PronouceScore>;

@Schema()
export class PronouceScore extends mongoose.Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  questId: string;

  @Prop({ required: true })
  accuracy: number;

  @Prop({ required: true })
  pronounciation: number;

  @Prop({ required: true })
  fluency: number;

  @Prop({ required: true })
  completeness: number;

  @Prop({ required: true })
  total: number;
}

export const PronouceSchema = SchemaFactory.createForClass(PronouceScore);
