import { IAssessmentDto } from "@/app/interface/modules/aessment";
import axiosClient from "@/app/util/axiosClient";

const getDetailAssessment = async (id: string) => {
  const result = await axiosClient.get(`/assessment/${id}`);
  return result.data as IAssessmentDto;
};

const AssessmentService = {
  getDetailAssessment,
};

export default AssessmentService;
