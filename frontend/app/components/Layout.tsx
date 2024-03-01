"use client";

import { motion } from "framer-motion";
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
    if (
      isFetched &&
      !data?.data?._id &&
      !onBoardSlug.includes(pathname as string)
    ) {
      // router.push("/");
    }
  }, [authToken, data, isFetched]);

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      transition={{
        duration: 2,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {props.children}
    </motion.div>
  );
};

export default Layout;
