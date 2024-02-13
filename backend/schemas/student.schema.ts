import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type StudentDocument = mongoose.HydratedDocument<Student>;

@Schema()
export class Student extends mongoose.Document {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  info: User;

  @Prop({ type: Number, required: true })
  level: number;

  @Prop({ type: Number, required: true })
  class: number;

  @Prop({ type: String })
  classCode: string;

  @Prop({ type: Number })
  code: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
