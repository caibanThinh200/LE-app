import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

export const useCustomQuery = (
  key: string,
  fn: (...rest: any[]) => Promise<AxiosResponse<any, any>> | Promise<any>
) => {
  const query = useQuery(key, fn);
  return query;
};
