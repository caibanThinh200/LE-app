import { useQuery } from "react-query";
import StudentService from "../api/student";

const GetSuggestFriend = () => {
  const result = useQuery("suggest-friend", () =>
    StudentService.getSuggestFriend()
  );
  return result;
};

const StudentQuery = {
  GetSuggestFriend,
};

export default StudentQuery;
