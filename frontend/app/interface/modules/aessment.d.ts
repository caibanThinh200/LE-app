import { File } from "../global";

export interface IAssessmentDto {
  _id?: string;
  title?: string;
  status?: "pending" | "inProgress" | "complete";
  poster?: File;
  nextAssessment?: IAssessmentDto;
  assessmentVideo?: File;
  videoDuration?: number
  quests?: any[];
  content?: string;
  updatedAt?: Date;
  createdAt?: Date;
}
