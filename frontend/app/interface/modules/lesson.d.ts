import { File } from "../global";

export interface ILessonDto {
  _id?: string;
  title?: string;
  status?: "pending" | "inProgress" | "complete";
  logo?: File;
  assessments?: string[] | any[];
  updatedAt?: Date;
  createdAt?: Date;
}
