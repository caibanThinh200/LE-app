"use client";

import { useEffect } from "react";
import AuthQuery from "../client/queries/auth";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { onBoardSlug } from "../constant";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const authToken = Cookies.get("auth_token") || "";
  const { data, isFetched, ...rest } = AuthQuery.CheckUser();

  useEffect(() => {

    // if (
    //   isFetched &&
    //   !data?.data?._id &&
    //   !onBoardSlug.includes(pathname as string)
    // ) {
    //   router.push("/");
    // }
  }, [authToken, data, isFetched]);

  return <div>{props.children}</div>;
};

export default Layout;
