import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Upload, UploadSchema } from './file.schema';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User extends mongoose.Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ default: 'draft' })
  status: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'student' })
  type: string;

  @Prop({ type: UploadSchema })
  avatar: Upload;
}

export const UserSchema = SchemaFactory.createForClass(User);
