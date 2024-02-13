import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UploadDocument = mongoose.HydratedDocument<Upload>;

@Schema()
export class Upload extends mongoose.Document {
  @Prop({ required: true })
  fileName: string;

  @Prop()
  type: string;

  @Prop()
  size: number;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
