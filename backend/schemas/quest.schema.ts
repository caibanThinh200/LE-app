import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Assessment } from './assessment.schema';

export type QuestDocument = mongoose.HydratedDocument<Quest>;

@Schema()
export class Quest extends mongoose.Document {
  @Prop({ required: true })
  paragraph: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' })
  assessment: Assessment;

  @Prop()
  time: string;
}

export const QuestSchema = SchemaFactory.createForClass(Quest);
