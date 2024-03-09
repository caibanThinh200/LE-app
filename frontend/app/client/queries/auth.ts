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
  const result = useQuery({
    queryKey: ["check-user"],
    queryFn: AuthService.checkUser,
    retry: false,
  });
  return result;
};

const CheckUserExist = (user: IUserDto) => {
  const result = useQuery({
    queryKey: ["check-exist"],
    queryFn: () => AuthService.checkUserExist(user),
    retry: false,
  });
  return result;
};

const AuthQuery = {
  Register,
  Login,
  CheckUser,
  CheckUserExist,
};

export default AuthQuery;
