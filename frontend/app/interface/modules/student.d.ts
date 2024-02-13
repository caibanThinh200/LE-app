import { IUserDto } from "./user";

export interface IStudentDto {
  _id?: string
  info?: IUserDto;
  class?: number;
  classCode?: string;
  code?: number;
  level?: number;
}
