"use client";

import { useRouter } from "next/navigation";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = localStorage.getItem("user");
  console.log(user);
  if (user) {
    router.push("/dashboard");
  }

  return <div>{children}</div>;
};

export default AuthCheck;
