import { IAssessmentDto } from "@/app/interface/modules/aessment";
import { IStudentDto } from "@/app/interface/modules/student";
import axiosClient from "@/app/util/axiosClient";

const getSuggestFriend = async () => {
  const result = await axiosClient.get(`/student/suggest-friend`);
  return result.data as IStudentDto[];
};

const StudentService = {
  getSuggestFriend,
};

export default StudentService;
