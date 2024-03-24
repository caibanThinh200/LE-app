"use client";

import ListFriend from "./ListFriend";
import PersonalInfo from "./PersonalInfo";
import ScoreStatistic from "./ScroreStatistic";
import AuthQuery from "../../../client/queries/auth";
import { IStudentDto } from "@/app/interface/modules/student";

interface IProfileProps {}

const Profile: React.FC<IProfileProps> = (props) => {
  const { data } = AuthQuery.GetUserProfile();
  if (!data) {
    return null;
  }
  return (
    <div className="flex gap-6 h-[83vh]">
      <div className="w-4/12">
        <PersonalInfo result={data?.data as IStudentDto} />
      </div>
      <div className="w-8/12 flex flex-col gap-6">
        <ScoreStatistic />
        <ListFriend />
      </div>
    </div>
  );
};

export default Profile;
