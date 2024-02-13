import { useMutation, useQuery } from "react-query";
import AuthService from "../api/auth";
import { IUserDto } from "@/app/interface/modules/user";

const Register = () => {
  const result = useMutation({
    mutationFn: (body: IUserDto) => AuthService.register(body),
  });
  return result;
};

const Login = () => {
  const result = useMutation({
    mutationFn: (body: IUserDto) => AuthService.login(body),
  });
  return result;
};

const CheckUser = () => {
  const result = useQuery("check-user", AuthService.checkUser);
  return result;
};

const AuthQuery = {
  Register,
  Login,
  CheckUser,
};

export default AuthQuery;
