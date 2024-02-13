import { useQuery } from "react-query";
import AssessmentService from "../api/assessment";

const GetDetailAssessment = (id: string) => {
  const result = useQuery("assessment", () =>
    AssessmentService.getDetailAssessment(id)
  );
  return result;
};

const AssessmentQuery = {
  GetDetailAssessment,
};

export default AssessmentQuery;
