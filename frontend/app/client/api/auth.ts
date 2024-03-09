// import { ILessonDto } from "@/app/interface/modules/lesson";
import { IUserDto } from "@/app/interface/modules/user";
import axiosClient from "@/app/util/axiosClient";

const register = async (body: IUserDto) => {
  const result = await axiosClient.post("/auth/register", {
    ...body,
  });
  return result.data;
};

const login = async (body: IUserDto) => {
  const result = await axiosClient.post(`/auth/login`, { ...body });
  return result.data;
};

const checkUser = async () => {
  const user = await axiosClient.get("/auth/check-user");
  return user;
};

const checkUserExist = async (user: IUserDto) => {
  const result = await axiosClient.get("/auth/check-exist", {
    params: { ...user },
  });
  return result;
};

const AuthService = {
  register,
  login,
  checkUser,
  checkUserExist,
};

export default AuthService;
