"use client";

import { useRouter } from "next/navigation";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = localStorage.getItem("user");
  if (!user) {
    router.push("/auth/login");
  }

  return <div>{children}</div>;
};

export default AuthCheck;
