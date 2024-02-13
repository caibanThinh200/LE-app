import { useQuery } from "react-query";
import LessonService from "../api/lesson";

const GetLessons = (filter: any) => {
  const result = useQuery("lessons", () => LessonService.getLessons(filter));
  return result;
};

const GetDetailLesson = (id: string) => {
  const result = useQuery("lesson", () => LessonService.getDetailLesson(id));
  return result;
};

const LessonQuery = {
  GetLessons,
  GetDetailLesson,
};

export default LessonQuery;
