import { ILessonDto } from "@/app/interface/modules/lesson";
import axiosClient from "@/app/util/axiosClient";

const getLessons = async (params: object) => {
  const result = await axiosClient.get("/lesson", {
    params,
  });
  return result.data as ILessonDto[];
};

const getDetailLesson = async (id: string) => {
  const result = await axiosClient.get(`/lesson/${id}`);
  return result.data as ILessonDto;
};

const LessonService = {
  getLessons,
  getDetailLesson,
};

export default LessonService;
